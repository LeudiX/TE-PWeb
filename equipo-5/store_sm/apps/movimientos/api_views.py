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
    print("datos frontend: ",request.data)
    serializer = SerializadorDeMovimiento(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
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
