from django.urls import path
from . import api_views
from .views import movimientos

urlpatterns = [
    path('',movimientos),
    #api
    path('api/', api_views.listar),
    path('api/crear/', api_views.crear),
    path('api/actualizar/<int:pk>/', api_views.actualizar),
    path('api/eliminar/<int:pk>/', api_views.eliminar),
    path('api/detail/<int:pk>/', api_views.detail),
]