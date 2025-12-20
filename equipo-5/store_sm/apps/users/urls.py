from django.urls import path
from . import views

urlpatterns = [
    path('registrar/', views.registrar_usuario),
    path('', views.listar_usuarios),

    path('api/', views.list_users, name='list_users'),
    path('api/me/', views.me, name='me'),
    path('api/register/', views.register_user , name='register_user'),
    path('api/<int:pk>/', views.retrieve_user, name='retrieve_user'),
    path('api/crear/', views.create_user, name='create_user'),
    path('api/actualizar/<int:pk>/', views.update_user, name='update_user'),
    path('api/eliminar/<int:pk>/', views.delete_user, name='delete_user'),
    path('api/eliminar/', views.delete_users, name='delete_users'),
]