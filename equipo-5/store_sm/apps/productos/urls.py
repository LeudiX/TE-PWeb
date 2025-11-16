from django.urls import path
from . import api_views
from . import views

urlpatterns = [
    path('',views.productos),
    path('modificar/',views.modificar),
    path('visualizar/',views.visualizar),
    path('registrar/',views.registrar),
    #api
    path('api/', api_views.paginateStokList),
    path('api/all/', api_views.listar),
    path('api/crear/', api_views.crear),
    path('api/buscar/', api_views.buscarProductos),
    path('api/detalles/<int:pk>/', api_views.detail),
    path('api/actualizar/<int:pk>/', api_views.actualizar),
    path('api/eliminar/<int:pk>/', api_views.eliminar),
    path('api/eliminar/', api_views.eliminarVarios),
]