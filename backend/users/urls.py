from django.urls import path
from django.urls import include

from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (

    RegisterView,

    CurrentUserView,

    UserViewSet,
)


router = DefaultRouter()

router.register(
    'manage',
    UserViewSet
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

    # ==========================================
    # USER MANAGEMENT
    # ==========================================

    path(
        '',
        include(router.urls)
    ),
]