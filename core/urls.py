from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import *
from Usuarios.views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('',home,name='home'),
    path('listar_animal',listar_animal,name='listar_animal'),
    path('insertar_animal',insertar_animal,name='insertar_animal'),
    path('editar_animal/<pk>',editar_animal,name='editar_animal'),
    path('eliminar_animal/<pk>',eliminar_animal,name='eliminar_animal'),
    path('insertar_atencionM',insertar_atencionM,name='insertar_atencionM'),
    path('editar_atencionM/<pk>',editar_atencionM,name='editar_atencionM'),
    path('eliminar_atencionM/<pk>',eliminar_atencionM,name='eliminar_atencionM'),
    path('insertar_veterinario',insertar_veterinario,name='insertar_veterinario'),
    path('listar_veterinario',listar_veterinario,name='listar_veterinario'),
    path('editar_veterinario/<pk>',editar_veterinario,name='editar_veterinario'),
    path('eliminar_veterinario/<pk>',eliminar_veterinario,name='eliminar_veterinario'),



    






    

#logout






]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)