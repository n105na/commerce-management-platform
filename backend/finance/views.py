from rest_framework import viewsets

from .models import (
    Expense,
    SalaryPayment,
)

from .serializers import (
    ExpenseSerializer,
    SalaryPaymentSerializer,
)


# ==========================================
# EXPENSE VIEWSET
# ==========================================

class ExpenseViewSet(viewsets.ModelViewSet):

    queryset = Expense.objects.all()

    serializer_class = ExpenseSerializer

    permission_classes = []


# ==========================================
# SALARY PAYMENT VIEWSET
# ==========================================

class SalaryPaymentViewSet(
    viewsets.ModelViewSet
):

    queryset = SalaryPayment.objects.select_related(
        'employee',
        'employee__user'
    )

    serializer_class = SalaryPaymentSerializer

    permission_classes = []