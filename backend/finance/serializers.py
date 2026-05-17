from rest_framework import serializers

from .models import (
    Expense,
    SalaryPayment,
)

from users.models import EmployeeProfile


# ==========================================
# EXPENSE SERIALIZER
# ==========================================

class ExpenseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Expense

        fields = [
            'id',

            'title',

            'amount',

            'description',

            'expense_date',

            'created_at',
        ]

        read_only_fields = [
            'created_at',
        ]


# ==========================================
# SALARY PAYMENT SERIALIZER
# ==========================================

class SalaryPaymentSerializer(
    serializers.ModelSerializer
):

    employee_name = serializers.CharField(
        source='employee.user.username',
        read_only=True
    )

    class Meta:
        model = SalaryPayment

        fields = [
            'id',

            'employee',

            'employee_name',

            'amount',

            'payment_date',

            'notes',

            'created_at',
        ]

        read_only_fields = [
            'created_at',
        ]