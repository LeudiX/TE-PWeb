from django.urls import path
from .api_views import ultimasVentasProducto, prueba, stoksBajos, inventario
from .views import inventario

urlpatterns=[
    path('',inventario),
    #api
    path('api/', inventario),
    path('api/ultimasVentasProducto/', ultimasVentasProducto),
    path('api/ultimasVentasProducto/', ultimasVentasProducto),
    path('api/prueba/', prueba),
    path('api/stoksBajos/', stoksBajos)
]

