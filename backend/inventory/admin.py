from django.contrib import admin

from .models import (
    Supplier,
    InventoryItem,
    StockMovement,
)


admin.site.register(Supplier)
admin.site.register(InventoryItem)
admin.site.register(StockMovement)