from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from .forms import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.shortcuts import render, get_object_or_404, redirect
from .models import Vacunacion, Vacuna, Animal, Veterinario




def login_view(request):
    return render(request, 'login.html')


def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('listar_animal')  # o cualquier otra vista
        else:
            return render(request, 'login.html', {'error': 'Credenciales incorrectas'})
    return render(request, 'login.html')  

User = get_user_model()

def register_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')

        if User.objects.filter(username=username).exists():
            return render(request, 'register.html', {'error': 'El nombre de usuario ya existe'})
        
        user = User.objects.create_user(username=username, password=password, email=email)
        user.backend = 'django.contrib.auth.backends.ModelBackend'
        login(request, user)
        return redirect('home')  # ← Redirige al inicio

    return render(request, 'register.html')



def listar_animal(request):
    animal=Animal.objects.all()
    return render (request,'listar_animal.html',{ 'animal':animal }  )



def insertar_animal(request):
    if request.method=='POST':
        form=AnimalForms(request.POST)
        if form.is_valid():
            form.save()
            return redirect ('listar_animal')
       
    form=AnimalForms()
    return render (request,'insertar_animal.html',{'form':form})    

def editar_animal(request,pk):
    animal = Animal.objects.get(pk=pk)
    if request.method=='POST':
        form=AnimalForms(request.POST,instance=animal)
        if form.is_valid():
            form.save()
        return redirect('listar_animal')
    form=AnimalForms(instance=animal)
    return render (request,'insertar_animal.html',{'form':form})        
    

def eliminar_animal(request,pk):
    animal = Animal.objects.get(pk=pk)
    animal.delete()
    return redirect ('listar_animal')        



def listar_atencionM(request):
    vacunas=Vacunacion.objects.all()
    return render (request,'listar_atencionM.html',{ 'vacunas':vacunas }  )


def insertar_vacuna(request):
    if request.method=='POST':
        form4=VacunaForms(request.POST)
        if form4.is_valid():
            form4.save()
            return redirect ('listar_atencionM')
       
    form4=VacunaForms()
    return render (request,'insertar_vacuna.html',{'form4':form4})    

   
    
def editar_atencionM(request,pk):
    atencion = AtencionMedica.objects.get(pk=pk)
    if request.method=='POST':
        form1=AtencionMForms(request.POST,instance=atencion)
        if form1.is_valid():
            form1.save()
        return redirect('listar_atencionM')
    form1=AtencionMForms(instance=atencion)
    return render (request,'insertar_atencionM.html',{'form1':form1})        
    

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
    veterinario=Veterinario.objects.all()
    return render (request,'listar_veterinario.html',{ 'veterinario':veterinario }  )



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









def vacunacion_form(request):
    if request.method == 'POST':
        vacuna_id = request.POST.get('vacuna')
        animal_id = request.POST.get('animal')
        veterinario_id = request.POST.get('veterinario') 

        try:
            vacuna = Vacuna.objects.get(id=vacuna_id)
            animal = Animal.objects.get(id=animal_id)
            veterinario = Veterinario.objects.get(id=veterinario_id)
        except (Vacuna.DoesNotExist, Animal.DoesNotExist, Veterinario.DoesNotExist):
            return render(request, 'vacunacion_form.html', {
                'error': 'Vacuna, animal o veterinario no válido.',
                'vacunas': Vacuna.objects.all(),
                'animales': Animal.objects.all(),
                'veterinarios': Veterinario.objects.all()
            })

        Vacunacion.objects.create(
            vacuna=vacuna,
            animalA=animal,
            veterinario=veterinario,
            fecha_hora=timezone.now()
        )

        return redirect('listar_atencionM')

    return render(request, 'vacunacion_form.html', {
        'vacunas': Vacuna.objects.all(),
        'animales': Animal.objects.all(),
        'veterinarios': Veterinario.objects.all()
    })



def editar_vacunacion(request, pk):
    vacunacion = get_object_or_404(Vacunacion, pk=pk)

    if request.method == 'POST':
        vacuna_id = request.POST.get('vacuna')
        animal_id = request.POST.get('animal')
        veterinario_id = request.POST.get('veterinario')

        try:
            vacuna = Vacuna.objects.get(id=vacuna_id)
            animal = Animal.objects.get(id=animal_id)
            veterinario = Veterinario.objects.get(id=veterinario_id)
        except (Vacuna.DoesNotExist, Animal.DoesNotExist, Veterinario.DoesNotExist):
            return render(request, 'editar_vacunacion.html', {
                'error': 'Datos inválidos.',
                'vacunacion': vacunacion,
                'vacunas': Vacuna.objects.all(),
                'animales': Animal.objects.all(),
                'veterinarios': Veterinario.objects.all()
            })

        vacunacion.vacuna = vacuna
        vacunacion.animalA = animal
        vacunacion.veterinario = veterinario
        vacunacion.save()

        return redirect('listar_atencionM')

    return render(request, 'vacunacion_form.html', {
        'vacunacion': vacunacion,
        'vacunas': Vacuna.objects.all(),
        'animales': Animal.objects.all(),
        'veterinarios': Veterinario.objects.all()
    })




#def vacunacion_form_get(request):
#    vacuna= Vacunacion.objects.all()
#    return render(request, 'vacunacion_form.html', {'animales':animales})



#def vacunacion_form_post(request):
#    if request.method == 'POST':
#        nombre = request.POST['nombre']
#        animal_name = request.POST['animal']
#        animal = Animal.objects.get(nombre=animal_name)

#        vacunacion = Vacunacion.objects.create(
#            nombre = nombre,
#            animal = animal,
#        )
#    return redirect('/')
















  

    #      <li class="mb-3">
     #               <a href="{% url 'accounts_logout' %}" class="hover:bg-green-700 py-2 px-4 rounded block"><i class='pr-2 fas fa-users'></i> Cerrar Sesion </a>
      #          </li>
                