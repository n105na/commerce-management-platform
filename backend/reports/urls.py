from django.urls import path

from .views import (
    DashboardAnalyticsView
)


urlpatterns = [

    path(
        'dashboard-analytics/',
        DashboardAnalyticsView.as_view(),
        name='dashboard_analytics'
    ),
]