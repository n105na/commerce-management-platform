from rest_framework.routers import DefaultRouter

from .views import (
    CustomerViewSet,
    OrderViewSet,
    OrderItemViewSet,
    CustomerPaymentViewSet,
)


router = DefaultRouter()

router.register(
    'customers',
    CustomerViewSet
)

router.register(
    'orders',
    OrderViewSet
)

router.register(
    'order-items',
    OrderItemViewSet
)

router.register(
    'payments',
    CustomerPaymentViewSet
)

urlpatterns = router.urls
