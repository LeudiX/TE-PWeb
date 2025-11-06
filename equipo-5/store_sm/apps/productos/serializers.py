from rest_framework import serializers
from .models import Producto 

class SerializadorDeProducto(serializers.ModelSerializer):
    categoria_nombre = serializers.CharField(source='categoria.nombre', read_only=True)
    class Meta:
        model = Producto
        fields = ['id','nombre','precio','precio_venta','cantidad','categoria','categoria_nombre']