from django.contrib import admin

from .models import User, EmployeeProfile, CustomerProfile


admin.site.register(User)
admin.site.register(EmployeeProfile)
admin.site.register(CustomerProfile)