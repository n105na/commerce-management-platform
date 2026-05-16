from django.db import models

from products.models import Product
from users.models import User


# ==========================================
# SUPPLIER
# ==========================================

class Supplier(models.Model):

    name = models.CharField(
        max_length=255
    )

    phone_number = models.CharField(
        max_length=20,
        blank=True
    )

    address = models.TextField(
        blank=True
    )

    notes = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name


# ==========================================
# INVENTORY ITEM
# ==========================================

class InventoryItem(models.Model):

    product = models.OneToOneField(
        Product,
        on_delete=models.CASCADE,
        related_name='inventory'
    )

    quantity = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    minimum_quantity = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.product.name


# ==========================================
# STOCK MOVEMENT
# ==========================================

class StockMovement(models.Model):

    class MovementTypes(models.TextChoices):

        IN = 'IN', 'Stock In'

        OUT = 'OUT', 'Stock Out'

        ADJUSTMENT = 'ADJUSTMENT', 'Adjustment'


    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='stock_movements'
    )

    supplier = models.ForeignKey(
        Supplier,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    movement_type = models.CharField(
        max_length=20,
        choices=MovementTypes.choices
    )

    quantity = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    notes = models.TextField(
        blank=True
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return (
            f'{self.product.name} - '
            f'{self.movement_type}'
        )