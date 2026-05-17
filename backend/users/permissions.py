from rest_framework.permissions import BasePermission


# ==========================================
# ADMIN ONLY
# ==========================================

class IsAdmin(BasePermission):

    def has_permission(
        self,
        request,
        view
    ):

        return (
            request.user.is_authenticated and
            request.user.role == 'ADMIN'
        )


# ==========================================
# MANAGER OR ADMIN
# ==========================================

class IsManagerOrAdmin(BasePermission):

    def has_permission(
        self,
        request,
        view
    ):

        return (
            request.user.is_authenticated and
            request.user.role in [
                'ADMIN',
                'MANAGER'
            ]
        )


# ==========================================
# WORKER OR HIGHER
# ==========================================

class IsWorkerOrHigher(BasePermission):

    def has_permission(
        self,
        request,
        view
    ):

        return (
            request.user.is_authenticated and
            request.user.role in [
                'ADMIN',
                'MANAGER',
                'WORKER'
            ]
        )