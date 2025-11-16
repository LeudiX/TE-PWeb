from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from store_sm.permissions import EsAlmacenero, EsVendedor
from django.db.models import F, ExpressionWrapper, IntegerField

from apps.productos.models import Producto
from apps.productos.serializers import SerializadorDeProducto
from apps.movimientos.models import Movimiento

from django.db.models import Sum, Q
from datetime import datetime, timedelta
from .paginators import PaginadorDeInventario


# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def stoksBajos(request):
    lowests = Producto.objects.filter(cantidad__lt=5).order_by('cantidad')
    productos = SerializadorDeProducto(lowests, many=True)
    return Response(productos.data)


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def productos_mas_vendidos(request):
    ultimo_dia_mes_pasado = calcularFecha()

    productos = (
        Producto.objects
        .filter(
            movimientos__tipo="salida",
            movimientos__fecha__gt=ultimo_dia_mes_pasado
        )
        .annotate(total_vendidos=Sum("movimientos__cantidad"))
        .order_by("-total_vendidos")[:5]
    )

    data = [
        {
            "id": p.id,
            "nombre": p.nombre,
            "categoria": p.categoria.nombre if p.categoria else None,
            "total_vendidos": int(p.total_vendidos or 0),
            "stock_actual": p.cantidad,
        }
        for p in productos
    ]

    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def inventario(request):
    ultimo_dia_mes_pasado = calcularFecha()

    productos = (
        Producto.objects
        .filter(
            movimientos__fecha__gt=ultimo_dia_mes_pasado
        )
        .annotate(
            vendidos_mes=Sum(
                "movimientos__cantidad",
                filter=Q(movimientos__tipo="salida") &
                       Q(movimientos__fecha__gt=ultimo_dia_mes_pasado)
            )
        )
        .order_by("id")  # opcional: orden consistente
    )

    paginator = PaginadorDeInventario()
    result_page = paginator.paginate_queryset(productos, request)

    data = [
        {
            "id": p.id,
            "nombre": p.nombre,
            "categoria": p.categoria.nombre if p.categoria else None,
            "precio_venta": int(p.precio_venta),
            "stock_actual": p.cantidad,
            "vendidos_mes": p.vendidos_mes or 0,
        }
        for p in result_page
    ]

    return paginator.get_paginated_response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def movimientos_por_producto(request, pk):

    ultimo_dia_mes_pasado = calcularFecha()

    producto = get_object_or_404(Producto,pk=pk)

    movimientos = (
        Movimiento.objects
        .filter(
            producto=producto,
            fecha__gt=ultimo_dia_mes_pasado
        )
        .order_by("-fecha")
    )

    data = [
        {
            "id": m.id,
            "tipo": m.tipo,
            "cantidad": m.cantidad,
            "fecha": m.fecha,
            "producto": m.producto.nombre,
        }
        for m in movimientos
    ]

    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def resumen(request):
    ultimo_dia_mes_pasado = calcularFecha()

    productos = Producto.objects.filter(
        movimientos__fecha__gt=ultimo_dia_mes_pasado
    ).distinct()

    cantidad_productos = productos.count()

    stock_total = productos.aggregate(total=Sum("cantidad"))["total"] or 0

    valor_total = productos.aggregate(
        total=Sum(ExpressionWrapper(F("cantidad") * F("precio_venta"), output_field=IntegerField()))
    )["total"] or 0

    data = {
        "productos": cantidad_productos,
        "stock_total": stock_total,
        "valor_total": valor_total,
    }

    return Response(data, status=status.HTTP_200_OK)



def calcularFecha():
    hoy = datetime.today().date()
    primer_dia_mes_actual = hoy.replace(day=1)
    ultimo_dia_mes_pasado = primer_dia_mes_actual - timedelta(days=1)
    return ultimo_dia_mes_pasado


