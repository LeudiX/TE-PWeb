from django.shortcuts import get_object_or_404
from django.db.models import Sum
from rest_framework.response import Response
from store_sm.permissions import EsAlmacenero, EsVendedor
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import   IsAuthenticatedOrReadOnly, AllowAny
from rest_framework import status
from django.db.models.functions import Coalesce
from .models import Categoria
from .serializers import SerializadorDeCategoria
from .paginators import PaginadorDeCategoria


@api_view(['POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def crear(request):
    print(request.data)
    categoria = SerializadorDeCategoria(data=request.data)
    if categoria.is_valid():
        categoria.save()
        return Response(categoria.data)
    return Response(categoria.errors, 400)

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def detalles(request,pk):
    categoria = get_object_or_404(Categoria, pk=pk)
    serializadorDeCategoria = SerializadorDeCategoria(categoria)
    return Response(serializadorDeCategoria.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticatedOrReadOnly])
def actualizar(request,pk):
    categoria = get_object_or_404(Categoria, pk=pk)
    serializadorDeCategoria = SerializadorDeCategoria(categoria, data=request.data)
    if serializadorDeCategoria.is_valid():
        serializadorDeCategoria.save()
        return Response(serializadorDeCategoria.data)
    return Response(serializadorDeCategoria.errors)

@api_view(["DELETE"])
@permission_classes([IsAuthenticatedOrReadOnly])
def eliminar(request,pk):
    categoria = get_object_or_404(Categoria, pk=pk)
    categoria.delete()
    return Response({'mensage': f'deletd object {pk}'})

@api_view(["DELETE"])
@permission_classes([IsAuthenticatedOrReadOnly])
def eliminarVarios(request):
    ids = request.data.get('ids')
    if not ids or not isinstance(ids, list):
        return Response({}, status = status.HTTP_400_BAD_REQUEST )
    categorias = Categoria.objects.filter(id__in = ids)
    eliminadas = categorias.count()
    categorias.delete()
    return Response({"message":f"{eliminadas} objetos eliminados"})

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def buscar(request):
    query = request.query_params.get("query")
    print(query)
    #categorias = Categoria.objects.filter(productos__cantidad__gt=0).distinct()
    categorias = (
        Categoria.objects
        .annotate(cantidad=Coalesce(Sum("productos__cantidad"), 0))
        .order_by("-id")
    )
    if not query == "nada":
        categorias = categorias.filter(nombre__icontains=query)
    paginador = PaginadorDeCategoria()
    paginatedCategoria = paginador.paginate_queryset(categorias, request)
    serializadorDeCategoria = SerializadorDeCategoria(paginatedCategoria, many=True)

    return paginador.get_paginated_response(serializadorDeCategoria.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def listar(request):
    # Consulta base que siempre se usa
    categorias = (
        Categoria.objects
        .annotate(cantidad=Coalesce(Sum("productos__cantidad"), 0))
        .order_by("-id")
    )
    
    # Verificar si viene el parámetro paginate="false"
    paginate_param = request.query_params.get('paginate', '').lower()
    
    if paginate_param == 'false':
        categorias = (
            Categoria.objects
            .annotate(cantidad=Coalesce(Sum("productos__cantidad"), 0))
            .order_by("nombre")
        )
        # Caso sin paginación - devolver todas las categorías
        serializadorDeCategoria = SerializadorDeCategoria(categorias, many=True)
        return Response(serializadorDeCategoria.data)
    else:
        # Caso con paginación (comportamiento por defecto)
        paginador = PaginadorDeCategoria()
        paginatedCategoria = paginador.paginate_queryset(categorias, request)
        serializadorDeCategoria = SerializadorDeCategoria(paginatedCategoria, many=True)
        return paginador.get_paginated_response(serializadorDeCategoria.data)