from django.db import models
from django.contrib.auth.models import User

# Categorías de trabajo
CATEGORIA_CHOICES = [
    ('software', 'Desarrollo de Software'),
    ('marketing', 'Marketing Digital'),
    ('diseno', 'Diseño Gráfico'),
    ('redaccion', 'Redacción de Contenidos'),
]

# Estados de la postulación
ESTADO_POSTULACION = [
    ('pendiente', 'Pendiente'),
    ('revisada', 'Revisada'),
    ('contactado', 'Contactado'),
]

class Empresa(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    # Puedes agregar más campos como dirección, teléfono, etc.

    def __str__(self):
        return self.nombre

class Candidato(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    # Puedes agregar más campos como CV, teléfono, etc.

    def __str__(self):
        return self.usuario.username

class OfertaTrabajo(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=20, choices=CATEGORIA_CHOICES)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, related_name='ofertas')
    ubicacion = models.CharField(max_length=100)
    fecha_publicacion = models.DateField(auto_now_add=True)
    fecha_limite = models.DateField()

    def __str__(self):
        return self.titulo

class Postulacion(models.Model):
    candidato = models.ForeignKey(Candidato, on_delete=models.CASCADE, related_name='postulaciones')
    oferta = models.ForeignKey(OfertaTrabajo, on_delete=models.CASCADE, related_name='postulaciones')
    fecha_postulacion = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADO_POSTULACION, default='pendiente')
    notas = models.TextField(blank=True)  # Para comunicación interna

    class Meta:
        unique_together = ('candidato', 'oferta')  # Evita postulaciones duplicadas

    def __str__(self):
        return f'{self.candidato} - {self.oferta}'