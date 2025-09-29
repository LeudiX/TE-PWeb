from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from .forms import *
from django.contrib.auth.decorators import login_required



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
    atencion=AtencionMedica.objects.all()
    return render (request,'listar_atencionM.html',{ 'atencion':atencion }  )

def insertar_atencionM(request):
    if request.method=='POST':
        form1=AtencionMForms(request.POST)
        if form1.is_valid():
            form1.save()
            return redirect ('listar_atencionM')
    form1=AtencionMForms()
    return render (request,'insertar_atencionM.html',{'form1':form1})
            
    
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


























  

    #      <li class="mb-3">
     #               <a href="{% url 'accounts_logout' %}" class="hover:bg-green-700 py-2 px-4 rounded block"><i class='pr-2 fas fa-users'></i> Cerrar Sesion </a>
      #          </li>
                