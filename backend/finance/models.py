from django.db import models

from users.models import EmployeeProfile

class Expense(models.Model):

    title = models.CharField(
        max_length=255
    )

    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    description = models.TextField(
        blank=True
    )

    expense_date = models.DateField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title

class SalaryPayment(models.Model):

    employee = models.ForeignKey(
        EmployeeProfile,
        on_delete=models.CASCADE,
        related_name='salary_payments'
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    payment_date = models.DateField()

    notes = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.employee.user.username