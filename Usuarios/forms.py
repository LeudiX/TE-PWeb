from django import forms
from .models import *



class AnimalForms(forms.ModelForm):
        
    class Meta:
        model=Animal
        fields='__all__' #[ si se quiere poner un campo en especifico]
        widgets = {
            'nombre': forms.TextInput(attrs={
                'class': 'block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500',
                'placeholder': 'Ej. Luna'
            }),
            'especie': forms.Select(attrs={
                'class': 'block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500'
            }),
            'edad': forms.NumberInput(attrs={
                'class': 'block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500',
                'min': '0',
                'placeholder': 'Ej. 3'
            }),
            'sexo': forms.Select(attrs={
                'class': 'block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500'
            }),
            'disponibleAdopcion': forms.CheckboxInput(attrs={
                'class': 'h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
            }),
        }

class AtencionMForms(forms.ModelForm):
    class Meta:
        model = AtencionMedica
        fields = '__all__'
        widgets = {
            'tipo': forms.Select(attrs={'class': 'form-input'}),
            'animalA': forms.Select(attrs={'class': 'form-input'}),
            'veterinario': forms.Select(attrs={'class': 'form-input'}),
            'fecha_hora': forms.DateTimeInput(attrs={'type': 'datetime-local', 'class': 'form-input'}),
        }

class VacunacionForm(forms.ModelForm):
    class Meta:
        model = Vacunacion
        fields = '__all__'
        widgets = {
            'tipo': forms.Select(attrs={'class': 'form-input'}),
            'animalA': forms.Select(attrs={'class': 'form-input'}),
            'veterinario': forms.Select(attrs={'class': 'form-input'}),
            'fecha_hora': forms.DateTimeInput(attrs={'type': 'datetime-local', 'class': 'form-input'}),
            'vacuna': forms.Select(attrs={'class': 'form-input'}),
        }


class ConsultaForm(forms.ModelForm):
    class Meta:
        model = Consulta
        fields = '__all__'
        widgets = {
            'tipo': forms.Select(attrs={'class': 'form-input'}),
            'animalA': forms.Select(attrs={'class': 'form-input'}),
            'veterinario': forms.Select(attrs={'class': 'form-input'}),
            'fecha_hora': forms.DateTimeInput(attrs={'type': 'datetime-local', 'class': 'form-input'}),
            'diagnostico': forms.Textarea(attrs={'rows': 3, 'class': 'form-input'}),
            'tratamiento': forms.Textarea(attrs={'rows': 3, 'class': 'form-input'}),
        }


class VeterinarioForms(forms.ModelForm):
        
    class Meta:
        model=Veterinario
        fields='__all__' 

class VacunaForms(forms.ModelForm):
        
    class Meta:
        model=Vacuna
        fields='__all__' 
   
      

    


       
            