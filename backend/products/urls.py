from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    ProductViewSet,
    ProductPriceViewSet,
)


router = DefaultRouter()

router.register(
    'categories',
    CategoryViewSet
)

router.register(
    'products',
    ProductViewSet
)

router.register(
    'prices',
    ProductPriceViewSet
)

urlpatterns = router.urls