from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from .forms import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.utils import timezone
from .models import *
from django.core.paginator import Paginator
from django.contrib.auth import logout
from django.db import IntegrityError
from django.db.models import Q
from datetime import datetime
from django.http import HttpResponseForbidden
from django.shortcuts import get_object_or_404


def portal(request):
    return render(request, 'portal.html')

def login_view(request):
    return render(request, 'login.html')


def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            if user.rol == 'admin':
                return redirect('listar_animal')  # o la vista del panel admin
            elif user.rol == 'cliente':
                return redirect('listar_animal_cliente')  # vista para clientes
            else:
                return redirect('login')  # fallback
        else:
            return render(request, 'login.html', {'error': 'Credenciales incorrectas'})
    return render(request, 'login.html')

User = get_user_model()



def logout_view(request):
    logout(request)
    messages.success(request, "Has cerrado sesión correctamente.")
    return redirect('portal')

def register_view(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.rol = 'cliente'
            user.save()

            # Autenticar con backend correcto
            user = authenticate(username=user.username, password=form.cleaned_data['password'])
            if user is not None:
                login(request, user)

                if user.rol == 'admin':
                    return redirect('listar_animal')
                elif user.rol == 'cliente':
                    return redirect('listar_animal')
                else:
                    return redirect('listar_animal')
    else:
        form = RegistroForm()

    return render(request, 'register.html', {'form': form})


def solo_clientes(view_func):
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated and request.user.rol == 'cliente':
            return view_func(request, *args, **kwargs)
        return HttpResponseForbidden("No tienes permiso para acceder a esta vista.")
    return wrapper    


def listar_animal(request):
    buscar = request.GET.get('buscar', '')
    disponible = request.GET.get('disponible', '')

    animales = Animal.objects.all()

    if buscar:
        animales = animales.filter(nombre__icontains=buscar) | animales.filter(especie__icontains=buscar)
    if disponible in ['0', '1']:
        animales = animales.filter(disponibleAdopcion=bool(int(disponible)))

    paginator = Paginator(animales, 5)  # 5 animales por página
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'listar_animal.html', {'animal': page_obj})



def insertar_animal(request):
    if request.method == 'POST':
        form = AnimalForms(request.POST)
        if form.is_valid():
            try:
                form.save()
                messages.success(request, "Animal insertado correctamente.")
                return redirect('listar_animal')
            except IntegrityError:
                form.add_error('nombre', "Ya existe un animal con ese nombre. Elige uno diferente.")
    else:
        form = AnimalForms()
    return render(request, 'insertar_animal.html', {'form': form, 'modo': 'insertar'})

def editar_animal(request,pk):
    animal = Animal.objects.get(pk=pk)
    if request.method=='POST':
        form=AnimalForms(request.POST,instance=animal)
        if form.is_valid():
            form.save()
        return redirect('listar_animal')
    form=AnimalForms(instance=animal)
    return render (request,'insertar_animal.html',{'form':form, 'modo': 'modificar'})        
    

def eliminar_animal(request,pk):
    animal = Animal.objects.get(pk=pk)
    animal.delete()
    return redirect ('listar_animal')        



@login_required
def listar_animal_cliente(request):
    animales = Animal.objects.filter(disponibleAdopcion=True)
    return render(request, 'listar_animal_cliente.html', {'animales': animales})


def insertar_atencionM(request):
    if request.method == 'POST':
        tipo = request.POST.get('tipo')

        if tipo == 'Vacunación':
            form6 = VacunacionForm(request.POST)
        elif tipo == 'Consulta':
            form6 = ConsultaForm(request.POST)
        else:
            form6 = AtencionMForms(request.POST)

        if form6.is_valid():
            atencion = form6.save(commit=False)

            if tipo == 'Consulta':
                if not atencion.diagnostico or not atencion.tratamiento:
                    messages.error(request, 'Debes completar diagnóstico y tratamiento para una consulta.')
                    return render(request, 'insertar_atencionM.html', {'form6': form6, 'tipo': tipo})

            elif tipo == 'Vacunación':
                if not atencion.vacuna:
                    messages.error(request, 'Debes seleccionar una vacuna aplicada para una vacunación.')
                    return render(request, 'insertar_atencionM.html', {'form6': form6, 'tipo': tipo})

                if atencion.vacuna.especie != atencion.animalA.especie:
                    messages.error(request, f"La vacuna seleccionada no es válida para la especie {atencion.animalA.especie}.")
                    return render(request, 'insertar_atencionM.html', {'form6': form6, 'tipo': tipo})

            atencion.save()
            messages.success(request, 'Atención médica registrada correctamente.')
            return redirect('listar_atencionM')

    else:
        tipo = request.GET.get('tipo', 'Vacunación')  # ← valor por defecto
        if tipo == 'Vacunación':
            form6 = VacunacionForm()
        elif tipo == 'Consulta':
            form6 = ConsultaForm()
        else:
            form6 = AtencionMForms()

    return render(request, 'insertar_atencionM.html', {'form6': form6, 'tipo': tipo})


def listar_atencionM(request):
    buscar = request.GET.get('buscar')
    especie = request.GET.get('especie')
    desde = request.GET.get('desde')
    hasta = request.GET.get('hasta')

    consultas = Consulta.objects.select_related('animalA', 'veterinario')
    vacunaciones = Vacunacion.objects.select_related('animalA', 'veterinario', 'vacuna')

    if buscar:
        consultas = consultas.filter(
            Q(animalA__nombre__icontains=buscar) |
            Q(veterinario__nombre__icontains=buscar) |
            Q(diagnostico__icontains=buscar)
        )
        vacunaciones = vacunaciones.filter(
            Q(animalA__nombre__icontains=buscar) |
            Q(veterinario__nombre__icontains=buscar) |
            Q(vacuna__nombre__icontains=buscar)
        )

    if especie:
        consultas = consultas.filter(animalA__especie=especie)
        vacunaciones = vacunaciones.filter(animalA__especie=especie)

    if desde:
        desde_fecha = datetime.strptime(desde, "%Y-%m-%d")
        consultas = consultas.filter(fecha_hora__date__gte=desde_fecha)
        vacunaciones = vacunaciones.filter(fecha_hora__date__gte=desde_fecha)

    if hasta:
        hasta_fecha = datetime.strptime(hasta, "%Y-%m-%d")
        consultas = consultas.filter(fecha_hora__date__lte=hasta_fecha)
        vacunaciones = vacunaciones.filter(fecha_hora__date__lte=hasta_fecha)

    paginator_c = Paginator(consultas, 10)
    paginator_v = Paginator(vacunaciones, 10)

    page_c = request.GET.get('page_c')
    page_v = request.GET.get('page_v')

    consultas_page = paginator_c.get_page(page_c)
    vacunaciones_page = paginator_v.get_page(page_v)

    return render(request, 'listar_atencionM.html', {
        'consultas': consultas_page,
        'vacunaciones': vacunaciones_page
    })


@login_required
def historial_atenciones(request, animal_id):
    try:
        # Validar que animal_id sea entero
        animal_id = int(animal_id)

        # Obtener el animal disponible
        animalA = get_object_or_404(Animal, id=animal_id, disponibleAdopcion=True)

        # Consultar atenciones médicas asociadas
        atenciones = Consulta.objects.filter(animalA_id=animalA.id).order_by('-fecha_hora')
        atenciones = Vacunacion.objects.filter(animalA_id=animalA.id).order_by('-fecha_hora')


    except ValueError:
        return HttpResponseBadRequest("ID de animal inválido.")
    except Exception as e:
        print("Error en historial_atenciones:", e)
        atenciones = []

    return render(request, 'historial_atenciones.html', {
        'animalA': animalA,
        'atenciones': atenciones
    })


def listar_vacuna(request):
    buscar = request.GET.get('buscar')
    especie = request.GET.get('especie')

    vacunas = Vacuna.objects.all()

    if buscar:
        vacunas = vacunas.filter(nombre__icontains=buscar)

    if especie:
        vacunas = vacunas.filter(especie=especie)

    paginator = Paginator(vacunas, 10)  # 10 vacunas por página
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'listar_vacuna.html', {
        'vacuna': page_obj
    })


def insertar_vacuna(request):
    if request.method=='POST':
        form4=VacunaForms(request.POST)
        if form4.is_valid():
            form4.save()
            return redirect ('listar_vacuna')
       
    form4=VacunaForms()
    return render (request,'insertar_vacuna.html',{'form4':form4})  


def eliminar_vacuna(request,pk):
    vacuna = Vacuna.objects.get(pk=pk)
    vacuna.delete()
    return redirect ('listar_vacuna')       
 
def editar_vacunacion(request, pk):
    vacunacion = Vacunacion.objects.get(pk=pk)
    
    if request.method == 'POST':
        form = VacunacionForm(request.POST, instance=vacunacion)
        if form.is_valid():
            form.save()
            return redirect('listar_atencionM') 
    else:
        form = VacunacionForm(instance=vacunacion)
    
    return render(request, 'editar_vacunacion.html', {'form': form})    


def editar_consulta(request, pk):
    consulta = Consulta.objects.get(pk=pk)
    
    if request.method == 'POST':
        form = ConsultaForm(request.POST, instance=consulta)
        if form.is_valid():
            form.save()
            return redirect('listar_atencionM') 
    else:
        form = ConsultaForm(instance=consulta)
    
    return render(request, 'editar_consulta.html', {'form': form})    

def eliminar_atencionM(request,pk):
    atencion = AtencionMedica.objects.get(pk=pk)
    atencion.delete()
    return redirect ('listar_atencionM')  
    

def insertar_veterinario(request):
    if request.method=='POST':
        form2=VeterinarioForms(request.POST)
        if form2.is_valid():
            form2.save()
            return redirect ('listar_veterinario')
    form2=VeterinarioForms()
    return render (request,'insertar_veterinario.html',{'form2':form2})
            

def listar_veterinario(request):
    buscar = request.GET.get('buscar')
    especialidad = request.GET.get('especialidad')

    veterinarios = Veterinario.objects.all()

    if buscar:
        veterinarios = veterinarios.filter(nombre__icontains=buscar)

    if especialidad:
        veterinarios = veterinarios.filter(especialidad=especialidad)

    paginator = Paginator(veterinarios, 10)  # 10 por página
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'listar_veterinario.html', {
        'veterinario': page_obj
    })


def editar_veterinario(request,pk):
    veterinario = Veterinario.objects.get(pk=pk)
    if request.method=='POST':
        form2=VeterinarioForms(request.POST,instance=veterinario)
        if form2.is_valid():
            form2.save()
        return redirect('listar_veterinario')
    form2=VeterinarioForms(instance=veterinario)
    return render (request,'insertar_veterinario.html',{'form2':form2})        
    

def eliminar_veterinario(request,pk):
    veterinario = Veterinario.objects.get(pk=pk)
    veterinario.delete()
    return redirect('listar_veterinario')

def listar_solicitud(request):
    buscar = request.GET.get('buscar')
    accion = request.GET.get('accion')

    solicitudes = Solicitud.objects.select_related('animalS', 'usuarioS')

    if buscar:
        solicitudes = solicitudes.filter(
            Q(animalS__nombre__icontains=buscar) |
            Q(usuarioS__username__icontains=buscar)
        )

    if accion:
        solicitudes = solicitudes.filter(accion=accion)

    paginator = Paginator(solicitudes, 10)  # 10 por página
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'listar_solicitud.html', {
        'solicitud': page_obj
    })


def insertar_solicitud(request):
    if request.method == 'POST':
        form = SolicitudForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Solicitud de adopción registrada correctamente.')
            return redirect('listar_solicitud')
        else:
            messages.error(request, 'Corrige los errores del formulario.')
    else:
        form = SolicitudForm()
    return render(request, 'insertar_solicitud.html', {'form': form})


def editar_solicitud(request, pk):
    solicitud = Solicitud.objects.get(pk=pk)
    if request.method == 'POST':
        form = SolicitudForm(request.POST, instance=solicitud)
        if form.is_valid():
            form.save()
            messages.success(request, 'Solicitud actualizada correctamente.')
            return redirect('listar_solicitudes')
        else:
            messages.error(request, 'Corrige los errores del formulario.')
    else:
        form = SolicitudForm(instance=solicitud)
    return render(request, 'editar_solicitud.html', {'form': form, 'solicitud': solicitud})

#@login_required
#@solo_clientes
#def solicitar_adopcion_cliente(request, animal_id):
#    animal = Animal.objects.get(pk=animal_id)
#
#    if not animal.disponible:
#        messages.error(request, 'Este animal no está disponible para adopción.')
#        return redirect(request.path)
#
#    existe = Solicitud.objects.filter(animalS=animal, usuarioS=request.user).exists()
#    if existe:
#        messages.warning(request, 'Ya has solicitado la adopción de este animal.')
#        return redirect(request.path)

#    Solicitud.objects.create(animalS=animal, usuarioS=request.user)
#    messages.success(request, 'Solicitud enviada correctamente.')
#    return redirect('listar_animal')




               