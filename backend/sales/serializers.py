from rest_framework import serializers

from .models import (
    Customer,
    Order,
    OrderItem,
    CustomerPayment,
)

from products.models import Product


# ==========================================
# CUSTOMER
# ==========================================

class CustomerSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Customer

        fields = '__all__'


# ==========================================
# ORDER ITEM
# ==========================================

class OrderItemSerializer(
    serializers.ModelSerializer
):

    product_name =serializers.CharField(

            source='product.name',

            read_only=True
        )


    product_id =serializers.PrimaryKeyRelatedField(

            queryset=Product.objects.all(),

            source='product',

            write_only=True
        )


    order_id =serializers.PrimaryKeyRelatedField(

            queryset=Order.objects.all(),

            source='order',

            write_only=True
        )


    class Meta:

        model = OrderItem

        fields = [

            'id',

            'order',
            'order_id',

            'product',
            'product_id',

            'product_name',

            'quantity',

            'unit_price',

            'subtotal',
        ]

        read_only_fields = [

            'unit_price',

            'subtotal',

            'product',
            'order',
        ]


# ==========================================
# ORDER
# ==========================================

class OrderSerializer(
    serializers.ModelSerializer
):

    customer_name =serializers.CharField(

            source='customer.full_name',

            read_only=True
        )


    customer_id =serializers.PrimaryKeyRelatedField(

            queryset=Customer.objects.all(),

            source='customer',

            write_only=True
        )


    items =OrderItemSerializer(

            many=True,

            read_only=True
        )


    remaining_amount =serializers.SerializerMethodField()


    class Meta:

        model = Order

        fields = [

            'id',

            'customer',
            'customer_id',

            'customer_name',

            'status',

            'total_amount',

            'paid_amount',

            'remaining_amount',

            'notes',

            'items',

            'created_at',
        ]

        read_only_fields = [

            'total_amount',

            'created_at',

            'customer',
        ]


    def get_remaining_amount(
        self,
        obj
    ):

        return (
            obj.total_amount -
            obj.paid_amount
        )


# ==========================================
# PAYMENT
# ==========================================

class CustomerPaymentSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = CustomerPayment

        fields = '__all__'