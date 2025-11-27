from django.db import models
from apps.productos.models import Producto
from django.utils import timezone

# Create your models here.
class Movimiento(models.Model):
    TIPOS=[('entrada','Entrada'),('salida','Salida')]
    tipo = models.CharField(choices=TIPOS, max_length=10)
    cantidad = models.IntegerField()
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='movimientos')
    fecha= models.DateTimeField(null=True, blank=True, default=timezone.now)

    def __str__(self):
        return f"{self.producto} | {self.cantidad} unidades | {self.tipo}"

