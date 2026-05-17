from django.db.models import (
    Sum,
    F,
)

from rest_framework.views import APIView
from rest_framework.response import Response

from sales.models import Order

from finance.models import Expense

from inventory.models import InventoryItem


# ==========================================
# DASHBOARD ANALYTICS
# ==========================================

class DashboardAnalyticsView(APIView):

    permission_classes = []


    def get(self, request):

        total_sales = (
            Order.objects.aggregate(
                total=Sum('total_amount')
            )['total'] or 0
        )

        total_paid = (
            Order.objects.aggregate(
                total=Sum('paid_amount')
            )['total'] or 0
        )

        total_expenses = (
            Expense.objects.aggregate(
                total=Sum('amount')
            )['total'] or 0
        )

        low_stock_items = (

            InventoryItem.objects.filter(
                quantity__lte=F(
                    'minimum_quantity'
                )
            ).count()
        )

        return Response({

            'total_sales':
                total_sales,

            'total_paid':
                total_paid,

            'total_unpaid':
                total_sales - total_paid,

            'total_expenses':
                total_expenses,

            'low_stock_items':
                low_stock_items,
        })