from django import forms
from .models import *


class AnimalForms(forms.ModelForm):
        
    class Meta:
        model=Animal
        fields='__all__' #[ si se quiere poner un campo en especifico]


class AtencionMForms(forms.ModelForm):
        
    class Meta:
        model=AtencionMedica
        fields='__all__' 

class VeterinarioForms(forms.ModelForm):
        
    class Meta:
        model=Veterinario
        fields='__all__' 


      

    


       
            