from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import *
from Usuarios.views import *
from django.contrib.auth import views as auth_views
 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('home',home,name='home'),
    path('', portal, name='portal'),
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('logout/', logout_view, name='logout'),
    path('listar_animal/',listar_animal,name='listar_animal'),
    path('insertar_animal/',insertar_animal,name='insertar_animal'),
    path('editar_animal/<pk>',editar_animal,name='editar_animal'),
    path('eliminar_animal/<pk>',eliminar_animal,name='eliminar_animal'),
    path('insertar_atencionM',insertar_atencionM,name='insertar_atencionM'),
    path('editar_vacunacion/<pk>',editar_vacunacion,name='editar_vacunacion'),
    path('editar_consulta/<pk>',editar_consulta,name='editar_consulta'),
    path('listar_atencionM/',listar_atencionM,name='listar_atencionM'),
    path('insertar_veterinario/',insertar_veterinario,name='insertar_veterinario'),
    path('listar_veterinario/',listar_veterinario,name='listar_veterinario'),
    path('editar_veterinario/<pk>',editar_veterinario,name='editar_veterinario'),
    path('eliminar_veterinario/<pk>',eliminar_veterinario,name='eliminar_veterinario'),
    path('insertar_vacuna/',insertar_vacuna,name='insertar_vacuna'),
    path('eliminar_atencionM/<int:pk>/',eliminar_atencionM, name='eliminar_atencionM'),
    path('listar_vacuna/',listar_vacuna,name='listar_vacuna'),
    path('eliminar_vacuna/<pk>',eliminar_vacuna,name='eliminar_vacuna'),
    path('insertar_solicitud/', insertar_solicitud, name='insertar_solicitud'),
    path('editar_solicitud/<int:pk>/',editar_solicitud, name='editar_solicitud'),
    path('listar_solicitud/', listar_solicitud, name='listar_solicitud'), 
    path('listar_animal_cliente/', listar_animal_cliente, name='listar_animal_cliente'),
    path('historial_atenciones/<int:animal_id>/', historial_atenciones, name='historial_atenciones'),




#logout
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)