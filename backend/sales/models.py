from django.db import models

from products.models import Product
from users.models import User

class Customer(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='customer',
        null=True,
        blank=True
    )

    full_name = models.CharField(
        max_length=255
    )

    phone_number = models.CharField(
        max_length=20,
        blank=True
    )

    address = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.full_name
    
class Order(models.Model):

    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        COMPLETED = 'COMPLETED', 'Completed'
        CANCELLED = 'CANCELLED', 'Cancelled'

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name='orders'
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    paid_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    notes = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def remaining_amount(self):
        return self.total_amount - self.paid_amount

    def __str__(self):
        return f'Order #{self.id}'
    
class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items'
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    unit_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    subtotal = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    def save(self, *args, **kwargs):

        self.subtotal = self.quantity * self.unit_price

        super().save(*args, **kwargs)

    def __str__(self):
        return self.product.name


class CustomerPayment(models.Model):

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name='payments'
    )

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='payments'
    )

    amount = models.DecimalField(
        max_digits=12,
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
        return f'{self.customer.full_name} - {self.amount}'