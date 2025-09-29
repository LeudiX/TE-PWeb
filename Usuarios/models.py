from django.db import models
from django.contrib.auth.models import AbstractUser


DiccionarioVet = {
    'Perro': 'Dr. Andrés Herrera',
    'Gato': 'Dra. Clara Núñez',
    'Hámster': 'Dra. Sofía Mena',
    'Ave': 'Dr. Luis Torres',
}

VACUNAS_POR_ESPECIE = {
    'Perro': ['Anti-Rabia', 'Anti-Parvovirus'],
    'Gato': ['Anti-Rabia', 'Anti-Leucemia felina'],
    'Hámster': ['Anti-Tifoidea', 'Anti-Tularemia'],
    'Ave': ['Anti-Viruela aviar', 'Anti-Newcastle'],
}




class Usuario(AbstractUser):
    fecha_nac = models.DateField(null=True)# auto_now_add=True para que se registre la fecha en que se registra
   # rol = models.CharField(max_length=100,choices=( ('admin','admin'),('cliente','cliente')   ))


class Animal(models.Model):
    nombre=models.CharField( max_length=50, unique=True)
    def __str__(self):
        return self.nombre
    #especie=models.models.CharField( choices=(( 'perro', 'perro' ),( 'gato', 'gato' ),( 'ave', 'ave' ),( 'hamster', 'hamster' ) ) )
    especie = models.CharField(max_length=20, choices=[(k, k) for k in DiccionarioVet.keys()])
    def veterinario_asignado(self):
        return DiccionarioVet.get(self.especie, 'No asignado')
    
    edad=models.PositiveIntegerField()
    sexo=models.CharField( choices=(('F', 'F'),('M', 'M') ))
    disponibleAdopcion=models.BooleanField(verbose_name="¿Está disponible para adopción?",default=False)
  
class Vacuna(models.Model):
    nombre= models.CharField( )
    animal = models.ForeingKey(Animal)


class AtencionMedica(models.Model):
    tipo=models.CharField( choices=( ( 'vacunacion','vacunacion' ),( 'consulta','consulta' )    )   )
    animalA=models.ForeignKey(Animal, on_delete=models.CASCADE)    
    veterinario=models.ForeignKey("Veterinario", on_delete=models.CASCADE)
    fecha_hora = models.DateTimeField(auto_now_add=True)
    diagnostico = models.TextField(blank=True, null=True)
    tratamiento = models.TextField(blank=True, null=True)
    vacuna_aplicada = models.CharField(max_length=50, blank=True, null=True)
   
    def clean(self):
        from django.core.exceptions import ValidationError

        if self.tipo == 'consulta':
            if not self.diagnostico or not self.tratamiento:
                raise ValidationError("Debe registrar diagnóstico y tratamiento para una consulta.")
        elif self.tipo == 'vacunacion':
            if not self.vacuna_aplicada:
                raise ValidationError("Debe registrar el nombre de la vacuna aplicada.")
            vacunas_validas = VACUNAS_POR_ESPECIE.get(self.especie, [])
            if self.vacuna_aplicada not in vacunas_validas:
                raise ValidationError(f"La vacuna '{self.vacuna_aplicada}' no es válida para la especie '{self.especie}'.")

class Veterinario(models.Model):
    nombre=models.CharField(max_length=50)

    def __str__(self):
         return self.nombre

class Solicitud(models.Model):
    animalS=models.ForeignKey("Animal",  on_delete=models.CASCADE)    
    usuarioS=models.OneToOneField("Usuario", on_delete=models.CASCADE)
    fechaS=models.DateTimeField(auto_now_add=True)
    accion=models.CharField( choices=(('aprobar','aprobar'),('denegar','denegar') ) )

class Vacunacion(AtencionMedica):
    # campos de vacunacion
    pass































































