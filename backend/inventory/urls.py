from rest_framework.routers import DefaultRouter

from .views import (
    SupplierViewSet,
    InventoryItemViewSet,
    StockMovementViewSet,
)


router = DefaultRouter()

router.register(
    'suppliers',
    SupplierViewSet
)

router.register(
    'inventory-items',
    InventoryItemViewSet
)

router.register(
    'stock-movements',
    StockMovementViewSet
)

urlpatterns = router.urls