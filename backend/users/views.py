from rest_framework import generics
from rest_framework.permissions import (
    IsAuthenticated,
)

from rest_framework.response import Response

from django.contrib.auth import get_user_model

from .serializers import (
    RegisterSerializer,
    UserSerializer,
)

User = get_user_model()

class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = RegisterSerializer

    permission_classes = []

class CurrentUserView(generics.RetrieveAPIView):

    serializer_class = UserSerializer

    permission_classes = [
        IsAuthenticated
    ]


    # ==========================================
    # GET CURRENT USER
    # ==========================================

    def get_object(self):

        return self.request.user


