from rest_framework import serializers

from .models import (
    Category,
    Product,
    ProductPrice,
)


# ==========================================
# CATEGORY
# ==========================================

class CategorySerializer(
    serializers.ModelSerializer
):

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
# PRODUCT PRICE
# ==========================================

class ProductPriceSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = ProductPrice

        fields = [

            'id',

            'product',

            'price',

            'effective_date',

            'created_at',
        ]

        read_only_fields = [

            'created_at',
        ]


# ==========================================
# PRODUCT
# ==========================================

class ProductSerializer(
    serializers.ModelSerializer
):

    category_name =serializers.CharField(

            source='category.name',

            read_only=True
        )


    latest_price =serializers.SerializerMethodField()


    class Meta:

        model = Product

        fields = [

            'id',

            'category',
            'category_name',

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


    def get_latest_price(
        self,
        obj
    ):

        latest_price =obj.prices.first()

        if latest_price:

            return latest_price.price

        return None