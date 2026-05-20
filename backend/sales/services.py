from django.db import transaction

from inventory.models import (
    InventoryItem,
    StockMovement,
)

from .models import Order


# ==========================================
# REDUCE STOCK
# ==========================================

@transaction.atomic
def reduce_stock_after_order(order):

    for item in order.items.all():

        inventory_item = (
            InventoryItem.objects.get(
                product=item.product
            )
        )

        if inventory_item.quantity < item.quantity:

            raise ValueError(

                f'Not enough stock for '
                f'{item.product.name}'
            )

        inventory_item.quantity -= item.quantity

        inventory_item.save()

        StockMovement.objects.create(

            product=item.product,

            movement_type='OUT',

            quantity=item.quantity,

            notes=(
                f'Automatic reduction '
                f'from Order #{order.id}'
            ),
        )


# ==========================================
# RESTORE STOCK
# ==========================================

@transaction.atomic
def restore_stock_after_cancel(order):

    for item in order.items.all():

        inventory_item = (
            InventoryItem.objects.get(
                product=item.product
            )
        )

        inventory_item.quantity += item.quantity

        inventory_item.save()

        StockMovement.objects.create(

            product=item.product,

            movement_type='IN',

            quantity=item.quantity,

            notes=(
                f'Restored stock from '
                f'cancelled Order #{order.id}'
            ),
        )