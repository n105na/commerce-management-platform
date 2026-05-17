from rest_framework import viewsets

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

        order = serializer.save(
            created_by=self.request.user
        )

        from .services import (
            reduce_stock_after_order
        )

        reduce_stock_after_order(order)

        
class OrderItemViewSet(viewsets.ModelViewSet):

    queryset = OrderItem.objects.select_related(
        'order',
        'product'
    )

    serializer_class = OrderItemSerializer

    permission_classes = []

class CustomerPaymentViewSet(viewsets.ModelViewSet):

    queryset = CustomerPayment.objects.select_related(
        'customer',
        'order'
    )

    serializer_class = CustomerPaymentSerializer

    permission_classes = []

