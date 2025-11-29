from django.db import models
from apps.categorias.models import Categoria

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=20, unique=True)
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    precio_venta= models.DecimalField(max_digits=6, decimal_places=2)
    cantidad = models.IntegerField()
    categoria = models.ForeignKey(Categoria,on_delete=models.SET_NULL, related_name='productos', null=True, blank=True)
    categoria_nombre = models.CharField(max_length=20, null=True, blank=True)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='productos/', null=True, blank=True)

    def save(self, *args, **kwargs):
        # Si tiene categoría, copiamos el nombre
        if self.categoria is not None:
            self.categoria_nombre = self.categoria.nombre
        # Si no tiene categoría, puedes decidir si dejar el valor anterior
        # o limpiar el campo. Si lo quieres limpiar, descomenta:
        # else:
        #     self.categoria_nombre = None

        super().save(*args, **kwargs)