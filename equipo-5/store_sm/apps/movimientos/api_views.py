from .models import Movimiento
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import   IsAuthenticatedOrReadOnly
from rest_framework import status

from django.shortcuts import get_object_or_404
from .serializers import SerializadorDeMovimiento
from rest_framework.response import Response
from store_sm.permissions import EsAlmacenero, EsVendedor

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def listar(request):
    movimientos = Movimiento.objects.all()
    serializedMovimiento = SerializadorDeMovimiento(movimientos, many=True)
    return Response(serializedMovimiento.data)

@api_view(['POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def crear(request):
    movimientos = SerializadorDeMovimiento(data=request.data)
    if movimientos.is_valid():
        movimientos.save()
        return Response(movimientos.data)
    return Response({'mensaje':'bad request'}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def detail(request, pk):
    movimiento = get_object_or_404(Movimiento, pk=pk)
    serializedMovimiento = SerializadorDeMovimiento(movimiento)
    return Response(serializedMovimiento.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticatedOrReadOnly])
def actualizar(request, pk):
    movimiento = get_object_or_404(Movimiento, pk=pk)
    serializedMovimiento = SerializadorDeMovimiento(movimiento, data=request.data)
    if serializedMovimiento.is_valid():
        serializedMovimiento.save()
        return Response(serializedMovimiento.data)
    return Response({'mensage':'bad request'}, status=404)

@api_view(['DELETE'])
@permission_classes([IsAuthenticatedOrReadOnly])
def eliminar(request,pk):
    movimiento = get_object_or_404(Movimiento, pk=pk)
    movimiento.eliminar()
    return Response({'mensage':'eliminar movimiento'})

@api_view(["DELETE"])
@permission_classes([IsAuthenticatedOrReadOnly])
def eliminarVarios(request):
    ids = request.data.get('ids')
    if not ids or not isinstance(ids, list):
        return Response({}, status = status.HTTP_400_BAD_REQUEST )
    movimientos = Movimiento.objects.filter(id__in = ids)
    eliminadas = movimientos.count()
    movimientos.delete()
    return Response({"message":f"{eliminadas} objetos eliminados"})