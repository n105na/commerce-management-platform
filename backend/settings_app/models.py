from django.db import models


class PlatformSettings(models.Model):

    store_name = models.CharField(
        max_length=255,
        default='Commerce Platform'
    )

    business_email = models.EmailField(
        blank=True,
        null=True
    )

    currency = models.CharField(
        max_length=10,
        default='EUR'
    )

    timezone = models.CharField(
        max_length=100,
        default='Europe/Paris'
    )

    logo = models.ImageField(
        upload_to='settings/',
        blank=True,
        null=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )


    def __str__(self):

        return 'Platform Settings'