from rest_framework import serializers
from .models import Producto 

class SerializadorDeProducto(serializers.ModelSerializer):

    class Meta:
        model = Producto
        fields = [
            'id',
            'nombre',
            'precio',
            'precio_venta',
            'cantidad',
            'categoria',
            'categoria_nombre',
            'descripcion',
            'imagen', 
        ]
