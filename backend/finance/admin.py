from django.contrib import admin

from .models import (
    Expense,
    SalaryPayment,
)


admin.site.register(Expense)
admin.site.register(SalaryPayment)