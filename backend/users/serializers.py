from rest_framework import serializers

from django.contrib.auth import get_user_model

from django.contrib.auth.password_validation import (
    validate_password
)

from .models import (
    EmployeeProfile,
    CustomerProfile,
)

User = get_user_model()


# ==========================================
# USER SERIALIZER
# ==========================================

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        required=False
    )

    password_confirm = serializers.CharField(
        write_only=True,
        required=False
    )

    class Meta:

        model = User

        fields = [

            'id',

            'username',

            'email',

            'role',

            'phone_number',

            'is_active',

            'password',

            'password_confirm',
        ]


    # ==========================================
    # VALIDATE PASSWORDS
    # ==========================================

    def validate(self, attrs):

        password = attrs.get('password')

        password_confirm = attrs.get(
            'password_confirm'
        )


        if password or password_confirm:

            if password != password_confirm:

                raise serializers.ValidationError({

                    'password':

                    'Passwords do not match.'
                })

            validate_password(password)

        return attrs


    # ==========================================
    # UPDATE USER
    # ==========================================

    def update(self, instance, validated_data):

        password = validated_data.pop(
            'password',
            None
        )

        validated_data.pop(
            'password_confirm',
            None
        )


        for attr, value in validated_data.items():

            setattr(
                instance,
                attr,
                value
            )


        # SAFE PASSWORD HASHING

        if password:

            instance.set_password(
                password
            )


        instance.save()

        return instance


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

            raise serializers.ValidationError({

                'password':

                'Passwords do not match.'
            })

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