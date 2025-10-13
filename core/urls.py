from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import *
from Usuarios.views import *
from django.contrib.auth import views as auth_views
from Usuarios.views import register_view
from django.contrib.auth.views import LogoutView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('home',home,name='home'),
    path('', portal, name='portal'),
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),




    path('listar_animal/',listar_animal,name='listar_animal'),
    path('insertar_animal/',insertar_animal,name='insertar_animal'),
    path('editar_animal/<pk>',editar_animal,name='editar_animal'),
    path('eliminar_animal/<pk>',eliminar_animal,name='eliminar_animal'),
    path('insertar_atencionM',insertar_atencionM,name='insertar_atencionM'),
    #path('editar_atencionM/<pk>',editar_atencionM,name='editar_atencionM'),
    #path('eliminar_atencionM/<pk>',eliminar_atencionM,name='eliminar_atencionM'),
    path('listar_atencionM/',listar_atencionM,name='listar_atencionM'),

    path('insertar_veterinario/',insertar_veterinario,name='insertar_veterinario'),
    path('listar_veterinario/',listar_veterinario,name='listar_veterinario'),
    path('editar_veterinario/<pk>',editar_veterinario,name='editar_veterinario'),
    path('eliminar_veterinario/<pk>',eliminar_veterinario,name='eliminar_veterinario'),
   # path('vacunacion_form/',vacunacion_form,name='vacunacion_form'),
    path('insertar_vacuna/',insertar_vacuna,name='insertar_vacuna'),
    path('eliminar_atencionM/<int:pk>/',eliminar_atencionM, name='eliminar_atencionM'),
    path('listar_vacuna/',listar_vacuna,name='listar_vacuna'),






    






    

#logout






]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)