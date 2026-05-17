from rest_framework import serializers

from .models import (
    Customer,
    Order,
    OrderItem,
    CustomerPayment,
)

from products.models import Product
from products.serializers import ProductSerializer

class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer

        fields = [
            'id',

            'user',

            'full_name',

            'phone_number',

            'address',

            'created_at',
        ]

        read_only_fields = [
            'created_at',
        ]

class OrderItemSerializer(serializers.ModelSerializer):

    product = ProductSerializer(
        read_only=True
    )

    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )

    class Meta:
        model = OrderItem

        fields = [
            'id',

            'product',
            'product_id',

            'quantity',

            'unit_price',

            'subtotal',
        ]

        read_only_fields = [
            'subtotal',
        ]

class OrderSerializer(serializers.ModelSerializer):

    customer = CustomerSerializer(
        read_only=True
    )

    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.all(),
        source='customer',
        write_only=True
    )

    items = OrderItemSerializer(
        many=True,
        read_only=True
    )

    remaining_amount = serializers.SerializerMethodField()

    class Meta:
        model = Order

        fields = [
            'id',

            'customer',
            'customer_id',

            'created_by',

            'status',

            'total_amount',

            'paid_amount',

            'remaining_amount',

            'notes',

            'items',

            'created_at',
        ]

        read_only_fields = [
            'created_by',
            'created_at',
        ]


    # ==========================================
    # REMAINING AMOUNT
    # ==========================================

    def get_remaining_amount(self, obj):

        return (
            obj.total_amount -
            obj.paid_amount
        )
class CustomerPaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomerPayment

        fields = [
            'id',

            'customer',

            'order',

            'amount',

            'payment_date',

            'notes',

            'created_at',
        ]

        read_only_fields = [
            'created_at',
        ]