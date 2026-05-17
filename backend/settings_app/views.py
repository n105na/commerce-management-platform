from rest_framework import viewsets

from .models import StoreSettings

from .serializers import (
    StoreSettingsSerializer
)


class StoreSettingsViewSet(
    viewsets.ModelViewSet
):

    queryset = StoreSettings.objects.all()

    serializer_class = (
        StoreSettingsSerializer
    )

    permission_classes = []