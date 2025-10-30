from django.urls import path
from .views import products,visualize,modify,register
from . import api_views

urlpatterns = [
    path('',products),
    path('modificar/',modify),
    path('visualizar/',visualize),
    path('registrar/',register),
    #api
    path('api/',api_views.products),
    path('modificar/api/<int:pk>/',api_views.modify),
    path('visualizar/api/<int:pk>/',api_views.product),
    path('registrar/api/', api_views.register),
    path('eliminar/api/<int:pk>/', api_views.delete),
]