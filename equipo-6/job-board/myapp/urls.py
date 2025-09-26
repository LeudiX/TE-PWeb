from django.urls import path
from . import views

urlpatterns = [
    path('',views.inicio , name='inicio'),
    path('empresas/' , views.empresas , name='empresas'),
    path('candidatos/', views.candidatos , name='candidatos'),
    path('ofertasTrabajo/', views.ofertasTrabajo , name = 'ofertasTrabajo'),
    path('registro/', views.registro, name='registro'),
    path('login/' , views.login , name = 'login'),
    path('registro/' , views.login ,name = 'registro'),
    path('insertarEmpresa/' , views.insertarEmpresa , name='insertarEmpresa'),
    path('insertarCandidatos/' , views.insertarCandidatos , name= 'insertarCandidatos'),
    path('insertarOfertaTrabajo/' , views.insertarOfertaTrabajo , name='insertarOfertaTrabajo'),
    path('login/' , views.login , name='login'),
    path('dashboard/' , views.dashboard , name= 'dashboard')
]