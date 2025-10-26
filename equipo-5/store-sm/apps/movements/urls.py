from django.urls import path
from .views import movements

urlpatterns = [
    path('',movements)
]