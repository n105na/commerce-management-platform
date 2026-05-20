from django.urls import path

from .views import (
    PlatformSettingsView
)


urlpatterns = [

    path(

        'platform/',

        PlatformSettingsView.as_view(),

        name='platform-settings'
    ),
]