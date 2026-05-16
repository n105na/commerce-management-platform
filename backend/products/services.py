from datetime import date

from .models import ProductPrice


def get_current_price(product):

    latest_price = ProductPrice.objects.filter(
        product=product,
        effective_date__lte=date.today()
    ).first()

    return latest_price