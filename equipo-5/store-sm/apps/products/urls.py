from django.urls import path
from .views import products,visualize,modify,register



urlpatterns = [
    path('',products),
    path('modificar/',modify),
    path('visualizar/',visualize),
    path('registrar/',register),
]