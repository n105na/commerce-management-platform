from rest_framework import generics
from rest_framework import viewsets

from rest_framework.permissions import (
    IsAuthenticated,
)

from rest_framework.response import Response

from django.contrib.auth import get_user_model

from .serializers import (
    RegisterSerializer,
    UserSerializer,
)

from .permissions import (
    IsAdmin,
)

User = get_user_model()


# ==========================================
# REGISTER
# ==========================================

class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = RegisterSerializer

    permission_classes = []


# ==========================================
# CURRENT USER
# ==========================================

class CurrentUserView(generics.RetrieveAPIView):

    serializer_class = UserSerializer

    permission_classes = [
        IsAuthenticated
    ]


    def get_object(self):

        return self.request.user


# ==========================================
# USER MANAGEMENT
# ==========================================

class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()

    serializer_class = UserSerializer

    permission_classes = [

        IsAuthenticated,

        IsAdmin,
    ]