from django.db import transaction  # 👈 Agregar esta importación
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Movimiento
from .serializers import SerializadorDeMovimiento

# Listar todos los movimientos
@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def listar(request):
    movimientos = Movimiento.objects.all()
    serializer = SerializadorDeMovimiento(movimientos, many=True)
    return Response(serializer.data)

# Crear un movimiento
@api_view(['POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def crear(request):
    data = request.data.copy()
    if data.get("fecha") == "":
        data.pop("fecha")
    
    serializer = SerializadorDeMovimiento(data=data)
    
    if serializer.is_valid():
        try:
            with transaction.atomic():
                # Guardar el movimiento
                movimiento = serializer.save()
                
                # Obtener el producto relacionado
                producto = movimiento.producto
                cantidad_movimiento = movimiento.cantidad
                
                # Actualizar el stock según el tipo de movimiento
                if movimiento.tipo == 'entrada':
                    producto.cantidad += cantidad_movimiento
                elif movimiento.tipo == 'salida':
                    # Verificar que haya suficiente stock
                    if producto.cantidad < cantidad_movimiento:
                        return Response(
                            {"error": f"No hay suficiente stock. Stock actual: {producto.cantidad}, intenta vender: {cantidad_movimiento}"},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    producto.cantidad -= cantidad_movimiento  # 👈 Corregido: cantidad_movimiento
                
                # Verificar que la cantidad no sea negativa (por seguridad)
                if producto.cantidad < 0:
                    return Response(
                        {"error": "La cantidad del producto no puede ser negativa"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Guardar el producto actualizado
                producto.save()
                
                return Response(serializer.data, status=status.HTTP_201_CREATED)
                
        except Exception as e:
            return Response(
                {"error": f"Error al procesar el movimiento: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Detalle de un movimiento
@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def detail(request, pk):
    movimiento = get_object_or_404(Movimiento, pk=pk)
    serializer = SerializadorDeMovimiento(movimiento)
    return Response(serializer.data)

# Actualizar un movimiento (PATCH parcial)
@api_view(['PATCH'])
@permission_classes([IsAuthenticatedOrReadOnly])
def actualizar(request, pk):
    movimiento = get_object_or_404(Movimiento, pk=pk)
    serializer = SerializadorDeMovimiento(movimiento, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response({'mensaje': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)

# Eliminar un movimiento
@api_view(['DELETE'])
@permission_classes([IsAuthenticatedOrReadOnly])
def eliminar(request, pk):
    movimiento = get_object_or_404(Movimiento, pk=pk)
    movimiento.delete()
    return Response({'mensaje': 'movimiento eliminado'}, status=status.HTTP_204_NO_CONTENT)

# Eliminar varios movimientos
@api_view(["DELETE"])
@permission_classes([IsAuthenticatedOrReadOnly])
def eliminarVarios(request):
    ids = request.data.get('ids')
    if not ids or not isinstance(ids, list):
        return Response({'mensaje': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
    movimientos = Movimiento.objects.filter(id__in=ids)
    eliminadas = movimientos.count()
    movimientos.delete()
    return Response({"mensaje": f"{eliminadas} objetos eliminados"}, status=status.HTTP_200_OK)