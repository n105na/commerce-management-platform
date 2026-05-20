from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
from django.urls import path, include
from django.conf import settings

from django.conf.urls.static import static

urlpatterns = [

    path(
        'admin/',
        admin.site.urls
    ),

    path(
        'api/users/',
        include('users.urls')
    ),

    path(
        'api/products/',
        include('products.urls')
    ),

    path(
        'api/inventory/',
        include('inventory.urls')
    ),

    path(
        'api/sales/',
        include('sales.urls')
    ),

    path(
        'api/finance/',
        include('finance.urls')
    ),

    path(
        'api/reports/',
        include('reports.urls')
    ),

    path(
    'api/settings/',
    include('settings_app.urls')
    ),
]


if settings.DEBUG:

    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )
    
urlpatterns += static(

    settings.MEDIA_URL,

    document_root=settings.MEDIA_ROOT
)