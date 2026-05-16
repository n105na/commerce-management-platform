from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    class Roles(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        MANAGER = 'MANAGER', 'Manager'
        WORKER = 'WORKER', 'Worker'
        CUSTOMER = 'CUSTOMER', 'Customer'

    role = models.CharField(
        max_length=20,
        choices=Roles.choices,
        default=Roles.CUSTOMER
    )

    phone_number = models.CharField(
        max_length=20,
        blank=True
    )

    is_active_employee = models.BooleanField(
        default=True
    )

    def __str__(self):
        return self.username


class EmployeeProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='employee_profile'
    )

    monthly_salary = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    hire_date = models.DateField()

    notes = models.TextField(blank=True)

    def __str__(self):
        return self.user.username


class CustomerProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='customer_profile'
    )

    address = models.TextField(blank=True)

    loyalty_points = models.PositiveIntegerField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.user.username