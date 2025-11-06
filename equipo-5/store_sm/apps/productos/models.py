from django.db import models
from apps.categorias.models import Categoria

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=20)
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    precio_venta= models.DecimalField(max_digits=6, decimal_places=2)
    cantidad = models.IntegerField()
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='productos', null=True, blank=True)
    descripcion = models.TextField()

