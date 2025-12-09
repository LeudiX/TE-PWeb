from rest_framework import serializers
from .models import Categoria 

class SerializadorDeCategoria(serializers.ModelSerializer):
    cantidad = serializers.IntegerField(read_only=True) 
    
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'cantidad']