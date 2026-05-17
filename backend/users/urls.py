from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    RegisterView,
    CurrentUserView,
)


urlpatterns = [

    # ==========================================
    # REGISTER
    # ==========================================

    path(
        'register/',
        RegisterView.as_view(),
        name='register'
    ),

    # ==========================================
    # LOGIN
    # ==========================================

    path(
        'login/',
        TokenObtainPairView.as_view(),
        name='login'
    ),

    # ==========================================
    # REFRESH TOKEN
    # ==========================================

    path(
        'token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'
    ),

    # ==========================================
    # CURRENT USER
    # ==========================================

    path(
        'me/',
        CurrentUserView.as_view(),
        name='current_user'
    ),
]