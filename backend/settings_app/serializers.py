from rest_framework import serializers

from .models import PlatformSettings


class PlatformSettingsSerializer(

    serializers.ModelSerializer
):

    class Meta:

        model = PlatformSettings

        fields = '__all__'