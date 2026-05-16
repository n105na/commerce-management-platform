from rest_framework import serializers

from .models import (
    Category,
    Product,
    ProductPrice,
)


# ==========================================
# CATEGORY SERIALIZER
# ==========================================

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category

        fields = [
            'id',
            'name',
            'slug',
            'created_at',
        ]

        read_only_fields = [
            'slug',
            'created_at',
        ]


# ==========================================
# PRODUCT PRICE SERIALIZER
# ==========================================

class ProductPriceSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductPrice

        fields = [
            'id',
            'price',
            'effective_date',
            'created_at',
        ]

        read_only_fields = [
            'created_at',
        ]


# ==========================================
# PRODUCT SERIALIZER
# ==========================================

class ProductSerializer(serializers.ModelSerializer):

    # Readable category data
    category = CategorySerializer(
        read_only=True
    )

    # Used for creation/update
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )

    # Custom computed field
    latest_price = serializers.SerializerMethodField()

    class Meta:
        model = Product

        fields = [
            'id',

            'category',
            'category_id',

            'name',
            'slug',

            'description',

            'image',

            'is_active',

            'latest_price',

            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'slug',
            'created_at',
            'updated_at',
        ]

    # ==========================================
    # GET CURRENT PRICE
    # ==========================================

    def get_latest_price(self, obj):

        latest_price = obj.prices.first()

        if latest_price:
            return latest_price.price

        return None