from django.contrib.auth import authenticate, login
from django.shortcuts import render , redirect
from django.contrib import messages
from . import models
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from datetime import datetime
from django.utils import timezone
from django.contrib.auth.decorators import login_required, user_passes_test
from .models import Empresa 
from .models import Candidato
from .models import OfertaTrabajo
from .models import Postulacion

def inicio(request):
    return render(request , 'inicio.html')

def dashboard(request):
    return render(request , 'dashboard.html')

def empresas(request):
    return render(request , 'empresas.html' ,{'empresas':Empresa.objects.all()})

def candidatos(request):
    return render(request , 'candidatos.html' ,{'candidatos':Candidato.objects.all()})

def ofertasTrabajo(request):
    return render(request,'ofertasTrabajo.html' , {'ofertas':OfertaTrabajo.objects.all()})

def postulaciones(request):
    return render(request,'postulaciones.html' , {'postulaciones':Postulacion.objects.all()})   

def insertarEmpresa(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        municipio = request.POST.get('municipio')
        ubicacion = request.POST.get('ubicacion')

        Empresa.objects.create(
            nombre=nombre,
            municipio=municipio,
            ubicacion=ubicacion,
        )
        messages.success(request , 'Empresa registrada exitosamente')
        return redirect('empresas')
    return render(request , 'insertarEmpresa.html')


def insertarCandidatos(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        origen = request.POST.get('origen')
        destino = request.POST.get('destino')
        cantkm = request.POST.get('cantkm')
        
        Candidato.objects.create(
            nombre=nombre,
            origen=origen,
            destino=destino,
            cantkm=cantkm
        )
        messages.success(request, 'Candidato creado exitosamente')
        return redirect('candidatos')
    return render(request , 'insertarCandidatos.html')


def insertarOfertaTrabajo(request):
    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        descripcion = request.POST.get('descripcion')
        empresa = request.POST.get('empresa')
        ubicacion = request.POST.get('ubicacion')
        tipo = request.POST.get('tipo')
        salario = request.POST.get('salario')

        OfertaTrabajo.objects.create(
            titulo=titulo,
            descripcion=descripcion,
            empresa=empresa,
            ubicacion=ubicacion,
            tipo=tipo,
            salario=salario
        )
        messages.success(request, 'Oferta de Trabajo creada exitosamente')
        return redirect('ofertasTrabajo')
    return render(request, 'insertarOfertaTrabajos.html')
        

def registro(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        
        if password1!=password2 :
            messages.error(request , 'Las contraseñas no coinciden')
            return render(request , 'registro.html')
        
        if User.objects.filter(username=username).exists():
            messages.error(request , 'Ya hay un usuario con ese nombre')
            return render(request , 'registro.hmtl')
        
        if User.objects.filter(email=email).exists():
            messages.error(request , 'Ya ese email esta registrado')
            return render(request , 'registro.html')
        
        User.objects.create_user(
            username=username,
            password=password1,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        messages.success(request , 'Usuario creado exitosamente')
        return redirect('terminales')
    return render(request , 'registro.html')

def login(request):
    if request.method == 'POST':
        username=request.POST.get('username')
        password=request.POST.get('password')
        user = authenticate( request , username=username , password=password)
    
        if user is not None:
            User.objects.login(request, user)
            messages.success(request , 'Usuario Autenticado')
            return redirect('login.html')
        else:
            messages.error(request , 'El usuairo no existe')
            return render(request , 'login.html')
    return render(request, 'login.html')
        
        