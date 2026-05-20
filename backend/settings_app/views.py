from rest_framework.views import APIView

from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated

from .models import PlatformSettings

from .serializers import (

    PlatformSettingsSerializer
)


class PlatformSettingsView(APIView):

    permission_classes = [
        IsAuthenticated
    ]


    def get(self, request):

        settings_instance, created = (

            PlatformSettings.objects.get_or_create(
                id=1
            )
        )

        serializer = (

            PlatformSettingsSerializer(
                settings_instance
            )
        )

        return Response(
            serializer.data
        )


    def patch(self, request):

        settings_instance, created = (

            PlatformSettings.objects.get_or_create(
                id=1
            )
        )

        serializer = (

            PlatformSettingsSerializer(

                settings_instance,

                data=request.data,

                partial=True
            )
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            serializer.data
        )