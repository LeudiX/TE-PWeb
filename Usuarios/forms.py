from django import forms
from .models import *

class RegistroForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ['username', 'password']
        widgets = {
            'password': forms.PasswordInput(),
        }

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        user.rol = 'cliente'
        if commit:
            user.save()
        return user

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
    def clean_nombre(self):
        nombre = self.cleaned_data.get('nombre')
        if not nombre or nombre.strip() == '':
            raise forms.ValidationError("El nombre no puede estar vacío.")

        if Animal.objects.filter(nombre__iexact=nombre).exists():
            raise forms.ValidationError("Ya existe un animal con ese nombre. Por favor elige uno diferente.")
        return nombre    

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
            'animalA': forms.Select(attrs={
                'class': 'w-full px-3 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm'
            }),
            'veterinario': forms.Select(attrs={
                'class': 'w-full px-3 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm'
            }),
            'fecha_hora': forms.DateTimeInput(attrs={
                'type': 'datetime-local',
                'class': 'w-full px-3 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm'
            }),
            'vacuna': forms.Select(attrs={
                'class': 'w-full px-3 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm'
            }),
        }



class ConsultaForm(forms.ModelForm):
    class Meta:
        model = Consulta
        fields = '__all__'
        widgets = {
            'tipo': forms.Select(attrs={
                'class': 'w-full px-2 py-1.5 border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-xs'
            }),
            'animalA': forms.Select(attrs={
                'class': 'w-full px-2 py-1.5 border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-xs'
            }),
            'veterinario': forms.Select(attrs={
                'class': 'w-full px-2 py-1.5 border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-xs'
            }),
            'fecha_hora': forms.DateTimeInput(attrs={
                'type': 'datetime-local',
                'class': 'w-full px-2 py-1.5 border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-xs'
            }),
            'diagnostico': forms.Textarea(attrs={
                'rows': 3,
                'class': 'w-full px-2 py-1.5 border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-xs resize-none'
            }),
            'tratamiento': forms.Textarea(attrs={
                'rows': 3,
                'class': 'w-full px-2 py-1.5 border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-xs resize-none'
            }),
        }



class VeterinarioForms(forms.ModelForm):
        
    class Meta:
        model=Veterinario
        fields='__all__' 

class VacunaForms(forms.ModelForm):
    class Meta:
        model = Vacuna
        fields = '__all__'
        widgets = {
            'nombre': forms.TextInput(attrs={
                'placeholder': 'Ej. AntiRabia, AntiParvovirus...',
                'class': 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-xs'
            }),
            'especie': forms.Select(attrs={
                'class': 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-xs'
            }),
        }
class SolicitudForm(forms.ModelForm):
    class Meta:
        model = Solicitud
        fields = ['animalS', 'usuarioS', 'accion']
        widgets = {
            'animalS': forms.Select(attrs={'class': 'form-select'}),
            'usuarioS': forms.Select(attrs={'class': 'form-select'}),
            'accion': forms.Select(attrs={'class': 'form-select'}),
        }