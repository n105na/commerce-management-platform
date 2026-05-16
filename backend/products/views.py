from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

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


# ==========================================
# CATEGORY VIEWSET
# ==========================================

class CategoryViewSet(viewsets.ModelViewSet):

    queryset = Category.objects.all()

    serializer_class = CategorySerializer

    permission_classes = []


# ==========================================
# PRODUCT VIEWSET
# ==========================================

class ProductViewSet(viewsets.ModelViewSet):

    queryset = Product.objects.select_related(
        'category'
    ).prefetch_related(
        'prices'
    )

    serializer_class = ProductSerializer

    permission_classes = []


# ==========================================
# PRODUCT PRICE VIEWSET
# ==========================================

class ProductPriceViewSet(viewsets.ModelViewSet):

    queryset = ProductPrice.objects.select_related(
        'product'
    )

    serializer_class = ProductPriceSerializer

    permission_classes = []