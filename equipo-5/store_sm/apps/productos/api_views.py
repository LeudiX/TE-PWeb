from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from store_sm.permissions import EsAlmacenero, EsVendedor
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Producto
from .serializers import SerializadorDeProducto
from apps.movimientos.models import Movimiento
from .paginators import ProductoPaginador
from rest_framework import status


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def listar(request):
    productos = Producto.objects.all()
    serializedProducto = SerializadorDeProducto(productos, many=True)
    return Response(serializedProducto.data)

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def paginateStokList(request):
    productos = Producto.objects.filter(cantidad__gt=0)
    paginador = ProductoPaginador()
    paginatedProducto = paginador.paginate_queryset(productos, request)
    serializedProducto = SerializadorDeProducto(paginatedProducto, many=True)
    return paginador.get_paginated_response(serializedProducto.data)

@api_view(['POST'])
@permission_classes([IsAuthenticatedOrReadOnly,EsAlmacenero])
def crear(request):
    producto = SerializadorDeProducto(data=request.data)
    if producto.is_valid():
        savedProducto = producto.save()
        crearMovimiento(savedProducto,savedProducto.cantidad)
        return Response(producto.data)
    return Response(producto.errors, status=400)

def crearMovimiento(obj, cantidad, tipo='entrada'):
    movimiento = Movimiento(producto=obj,tipo=tipo,cantidad=cantidad)
    movimiento.save()

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def detail(request,pk):
    producto = get_object_or_404(Producto, pk=pk)
    serializedProducto = SerializadorDeProducto(producto)
    return Response(serializedProducto.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticatedOrReadOnly])
def actualizar(request,pk):
    producto = get_object_or_404(Producto, pk=pk)
    oldAmount = producto.cantidad
    serializedProducto = SerializadorDeProducto(producto, data=request.data)
    if serializedProducto.is_valid():
        newProducto = serializedProducto.save()
        newAmount = newProducto.cantidad
        if newAmount > oldAmount:
            diference = newAmount - oldAmount
            crearMovimiento(newProducto,diference)
        else:
            diference = oldAmount - newAmount
            crearMovimiento(newProducto,diference,'salida')

        return Response(serializedProducto.data)
    return Response(serializedProducto.errors, status=400)

@api_view(['PATCH'])
@permission_classes([IsAuthenticatedOrReadOnly, EsVendedor])
def sellRest(request,pk):
    producto = get_object_or_404(Producto, pk=pk)
    oldAmount = producto.cantidad
    producto.cantidad = 0
    producto.save()
    crearMovimiento(producto,oldAmount,'salida')
    return Response({'message': 'Producto modificado',
                     'id': producto.id,
                     'nombre': producto.nombre,
                     'cantidad': producto.cantidad
                    })

@api_view(["DELETE"])
@permission_classes([IsAuthenticatedOrReadOnly])
def eliminar(request,pk):
    producto = get_object_or_404(Producto, pk=pk)
    producto.eliminar()
    return Response({'mensage': 'eliminard object'})

@api_view(["DELETE"])
@permission_classes([IsAuthenticatedOrReadOnly])
def eliminarVarios(request):
    ids = request.data.get('ids')
    if not ids or not isinstance(ids, list):
        return Response({}, status = status.HTTP_400_BAD_REQUEST )
    productos = Producto.objects.filter(id__in = ids)
    eliminadas = productos.count()
    productos.delete()
    return Response({"message":f"{eliminadas} objetos eliminados"})