from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import Producto
from .serializer import ProductoSerializer

@api_view(['GET'])
def products(request):
    productos= Producto.objects.all()
    serializer = ProductoSerializer(productos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def product(request, pk):
    producto= get_object_or_404(Producto, pk=pk)
    serializer = ProductoSerializer(producto)
    return Response(serializer.data)

@api_view(['POST'])
def register(request):
    producto = ProductoSerializer(data=request.data)
    if producto.is_valid():
        producto.save()
        return Response(request.data)
    return Response(producto.errors , stats=400)

@api_view(['PATCH'])
def modify(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    newProducto = ProductoSerializer(producto, data=request.data)
    if newProducto.is_valid():
        newProducto.save()
        return Response(newProducto.data)
    return Response(newProducto.errors, status=400)

@api_view(['DELETE'])
def delete(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    data = ProductoSerializer(producto)
    producto.delete()
    return Response(data, status=200)