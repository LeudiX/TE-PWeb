from django.db import models
from apps.categories.models import Categoria

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=30)
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.CASCADE,
        related_name='productos'
    )
    precio_compra = models.DecimalField(max_digits=10, decimal_places=2)
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2)
    unidades = models.IntegerField(max_length=6)