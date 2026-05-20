from rest_framework import viewsets
from rest_framework.decorators import action

from rest_framework.response import Response

from .models import (
    Customer,
    Order,
    OrderItem,
    CustomerPayment,
)

from .serializers import (
    CustomerSerializer,
    OrderSerializer,
    OrderItemSerializer,
    CustomerPaymentSerializer,
)


class CustomerViewSet(viewsets.ModelViewSet):

    queryset = Customer.objects.all()

    serializer_class = CustomerSerializer

    permission_classes = []


class OrderViewSet(viewsets.ModelViewSet):

    queryset = Order.objects.select_related(
        'customer',
        'created_by'
    ).prefetch_related(
        'items'
    )

    serializer_class = OrderSerializer

    permission_classes = []


    def perform_create(
        self,
        serializer
    ):

        serializer.save(
            created_by=self.request.user
        )


    @action(
        detail=True,
        methods=['post']
    )
    def cancel(self, request, pk=None):

        order = self.get_object()

        if (
            order.status ==
            Order.Status.CANCELLED
        ):

            return Response({

                'detail':
                    'Order already cancelled'
            })


        from .services import (
            restore_stock_after_cancel
        )

        restore_stock_after_cancel(order)

        order.status = (
            Order.Status.CANCELLED
        )

        order.save()

        return Response({

            'detail':
                'Order cancelled successfully'
        })

class OrderItemViewSet(viewsets.ModelViewSet):

    queryset = OrderItem.objects.select_related(
        'order',
        'product'
    )

    serializer_class = OrderItemSerializer

    permission_classes = []


    def perform_create(
        self,
        serializer
    ):

        order_item =serializer.save()


        from .services import (
            reduce_stock_after_order
        )

        reduce_stock_after_order(
            order_item.order
        )


class CustomerPaymentViewSet(viewsets.ModelViewSet):

    queryset = CustomerPayment.objects.select_related(
        'customer',
        'order'
    )

    serializer_class = CustomerPaymentSerializer

    permission_classes = []