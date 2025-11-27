from django.urls import path
from . import api_views
from .views import categorias

urlpatterns = [
    path('',categorias),
    #api
    path('api/', api_views.listar),
    path('api/crear/', api_views.crear),
    path('api/detalles/<int:pk>/', api_views.detalles),
    path('api/actualizar/<int:pk>/', api_views.actualizar),
    path('api/eliminar/<int:pk>/', api_views.eliminar),
    path('api/eliminar/', api_views.eliminarVarios),
    path('api/buscar/', api_views.buscar),
]