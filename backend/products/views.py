from rest_framework import viewsets

from .models import (
    Category,
    Product,
    ProductPrice,
)

from .serializers import (
    CategorySerializer,
    ProductSerializer,
    ProductPriceSerializer,
)

from inventory.models import InventoryItem


# ==========================================
# CATEGORY
# ==========================================

class CategoryViewSet(viewsets.ModelViewSet):

    queryset = Category.objects.all()

    serializer_class = CategorySerializer

    permission_classes = []


# ==========================================
# PRODUCT
# ==========================================

class ProductViewSet(viewsets.ModelViewSet):

    queryset = Product.objects.select_related(
        'category'
    ).prefetch_related(
        'prices'
    )

    serializer_class = ProductSerializer

    permission_classes = []


    def perform_create(
        self,
        serializer
    ):

        product =serializer.save()


        """
        AUTO CREATE INVENTORY
        """

        InventoryItem.objects.create(

            product=product,

            quantity=0,

            minimum_quantity=0,
        )


# ==========================================
# PRODUCT PRICE
# ==========================================

class ProductPriceViewSet(
    viewsets.ModelViewSet
):

    queryset = ProductPrice.objects.select_related(
        'product'
    )

    serializer_class = ProductPriceSerializer

    permission_classes = []