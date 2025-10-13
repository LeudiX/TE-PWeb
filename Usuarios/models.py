from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    fecha_nac = models.DateField(null=True)# auto_now_add=True para que se registre la fecha en que se registra
   # rol = models.CharField(max_length=100,choices=( ('admin','admin'),('cliente','cliente')   ))


class Animal(models.Model):
    nombre=models.CharField( max_length=50, unique=True)
    
    ESPECIES_CHOICES = (
        ('perro', 'Perro'),
        ('gato', 'Gato'),
        ('ave', 'Ave'),
        ('hamster', 'Hámster'),
    )   

    especie=models.CharField( choices=ESPECIES_CHOICES )
    #especie = models.CharField(max_length=20, choices=[(k, k) for k in DiccionarioVet.keys()])
    #def veterinario_asignado(self):
       # return DiccionarioVet.get(self.especie, 'No asignado')
    
    edad=models.PositiveIntegerField()
    sexo=models.CharField( choices=(('F', 'F'),('M', 'M') ))
    disponibleAdopcion=models.BooleanField(verbose_name="¿Está disponible para adopción?",default=False)
  
    def __str__(self):
        return f"{self.nombre} ({self.especie})"
         


class Vacuna(models.Model):
    nombre= models.CharField( )
    especie = models.CharField(max_length=20, choices=Animal.ESPECIES_CHOICES)
    
    def __str__(self):
        return self.nombre


class Veterinario(models.Model):
    nombre=models.CharField(max_length=50)

    def __str__(self):
         return self.nombre



class AtencionMedica(models.Model):
    TIPO_ATENCION = [
        ('Vacunación', 'Vacunación'),
        ('Consulta', 'Consulta'),
    ]
    tipo = models.CharField(max_length=20, choices=TIPO_ATENCION)
    animalA = models.ForeignKey(Animal, on_delete=models.CASCADE)
    veterinario = models.ForeignKey(Veterinario, on_delete=models.CASCADE)
    fecha_hora = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

   
class Vacunacion(AtencionMedica):
    vacuna = models.ForeignKey(Vacuna, on_delete=models.CASCADE)


class Consulta(AtencionMedica):
    diagnostico = models.TextField(blank=True, null=True)
    tratamiento = models.TextField(blank=True, null=True)



class Solicitud(models.Model):
    animalS=models.ForeignKey("Animal",  on_delete=models.CASCADE)    
    usuarioS=models.OneToOneField("Usuario", on_delete=models.CASCADE)
    fechaS=models.DateTimeField(auto_now_add=True)
    accion=models.CharField( choices=(('aprobar','aprobar'),('denegar','denegar') ) )













































