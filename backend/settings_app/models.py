from django.db import models


class StoreSettings(models.Model):

    store_name = models.CharField(
        max_length=255
    )

    logo = models.ImageField(
        upload_to='branding/',
        blank=True,
        null=True
    )

    primary_color = models.CharField(
        max_length=20,
        default='#000000'
    )

    secondary_color = models.CharField(
        max_length=20,
        default='#ffffff'
    )

    currency = models.CharField(
        max_length=10,
        default='EUR'
    )

    language = models.CharField(
        max_length=10,
        default='en'
    )

    dark_mode_enabled = models.BooleanField(
        default=True
    )

    contact_phone = models.CharField(
        max_length=20,
        blank=True
    )

    contact_email = models.EmailField(
        blank=True
    )

    address = models.TextField(blank=True)

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.store_name