from django.urls import path
from .api_views import productos_mas_vendidos, stoksBajos, inventario, movimientos_por_producto, resumen
from .views import inventarioR

urlpatterns=[
    path('',inventarioR),
    #api
    path('api/', inventario),
    path('api/masvendidos/', productos_mas_vendidos),
    path('api/bajostock/', stoksBajos),
    path('api/movimientos/<int:pk>/', movimientos_por_producto),
    path('api/resumen/', resumen),
]

