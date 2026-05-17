from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from .models import (
    EmployeeProfile,
    CustomerProfile,
)

User = get_user_model()


# ==========================================
# USER SERIALIZER
# ==========================================

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = [
            'id',

            'username',

            'email',

            'role',

            'phone_number',
        ]


# ==========================================
# REGISTER SERIALIZER
# ==========================================

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )

    password_confirm = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = User

        fields = [
            'username',

            'email',

            'password',

            'password_confirm',

            'role',

            'phone_number',
        ]


    # ==========================================
    # VALIDATE PASSWORDS
    # ==========================================

    def validate(self, attrs):

        if (
            attrs['password'] !=
            attrs['password_confirm']
        ):

            raise serializers.ValidationError(
                {
                    'password':
                    'Passwords do not match.'
                }
            )

        return attrs


    # ==========================================
    # CREATE USER
    # ==========================================

    def create(self, validated_data):

        validated_data.pop(
            'password_confirm'
        )

        user = User.objects.create_user(
            username=validated_data['username'],

            email=validated_data['email'],

            password=validated_data['password'],

            role=validated_data['role'],

            phone_number=validated_data.get(
                'phone_number',
                ''
            ),
        )

        return user


# ==========================================
# EMPLOYEE PROFILE SERIALIZER
# ==========================================

class EmployeeProfileSerializer(
    serializers.ModelSerializer
):

    user = UserSerializer(
        read_only=True
    )

    class Meta:
        model = EmployeeProfile

        fields = '__all__'


# ==========================================
# CUSTOMER PROFILE SERIALIZER
# ==========================================

class CustomerProfileSerializer(
    serializers.ModelSerializer
):

    user = UserSerializer(
        read_only=True
    )

    class Meta:
        model = CustomerProfile

        fields = '__all__'