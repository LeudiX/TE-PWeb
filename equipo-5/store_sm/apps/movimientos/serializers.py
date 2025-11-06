from rest_framework import serializers
from .models import Movimiento

class SerializadorDeMovimiento(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='producto.nombre', read_only=True)
    class Meta:
        model = Movimiento
        fields = ['id','tipo','producto','cantidad','date','producto_nombre']