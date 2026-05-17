from rest_framework.routers import DefaultRouter

from .views import (
    ExpenseViewSet,
    SalaryPaymentViewSet,
)


router = DefaultRouter()

router.register(
    'expenses',
    ExpenseViewSet
)

router.register(
    'salary-payments',
    SalaryPaymentViewSet
)

urlpatterns = router.urls