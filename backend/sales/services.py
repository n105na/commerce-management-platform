from django.db import transaction

from inventory.models import (
    InventoryItem,
    StockMovement,
)

from inventory.models import Supplier

from .models import (
    Order,
)


# ==========================================
# UPDATE INVENTORY AFTER SALE
# ==========================================

@transaction.atomic
def reduce_stock_after_order(order):

    for item in order.items.all():

        inventory_item = (
            InventoryItem.objects.get(
                product=item.product
            )
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