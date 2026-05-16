from rest_framework import serializers

from .models import (
    Supplier,
    InventoryItem,
    StockMovement,
)

from products.models import Product
from products.serializers import ProductSerializer


# ==========================================
# SUPPLIER SERIALIZER
# ==========================================

class SupplierSerializer(serializers.ModelSerializer):

    class Meta:
        model = Supplier

        fields = [
            'id',
            'name',
            'phone_number',
            'address',
            'notes',
            'created_at',
        ]

        read_only_fields = [
            'created_at',
        ]


# ==========================================
# INVENTORY ITEM SERIALIZER
# ==========================================

class InventoryItemSerializer(serializers.ModelSerializer):

    product = ProductSerializer(
        read_only=True
    )

    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )

    stock_status = serializers.SerializerMethodField()

    class Meta:
        model = InventoryItem

        fields = [
            'id',

            'product',
            'product_id',

            'quantity',

            'minimum_quantity',

            'stock_status',

            'updated_at',
        ]

        read_only_fields = [
            'updated_at',
        ]


    # ==========================================
    # STOCK STATUS
    # ==========================================

    def get_stock_status(self, obj):

        if obj.quantity <= 0:
            return 'OUT_OF_STOCK'

        if obj.quantity <= obj.minimum_quantity:
            return 'LOW_STOCK'

        return 'IN_STOCK'


# ==========================================
# STOCK MOVEMENT SERIALIZER
# ==========================================

class StockMovementSerializer(serializers.ModelSerializer):

    class Meta:
        model = StockMovement

        fields = [
            'id',

            'product',

            'supplier',

            'movement_type',

            'quantity',

            'notes',

            'created_by',

            'created_at',
        ]

        read_only_fields = [
            'created_by',
            'created_at',
        ]