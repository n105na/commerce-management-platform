from django.contrib import admin

from .models import (
    Category,
    Product,
    ProductPrice,
)


admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductPrice)