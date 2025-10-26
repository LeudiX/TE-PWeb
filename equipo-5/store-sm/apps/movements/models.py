from django.db import models
from apps.products.models import Producto

# Create your models here.
class Movimiento(models.Model):
    TIPOS=[('entrada','Entrada'),('salida','Salida')]
    tipo=models.CharField(max_length=10, choices=TIPOS)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='movimientos')
    cantidad = models.IntegerField(max_length=6)
