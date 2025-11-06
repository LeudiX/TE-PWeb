from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import   IsAuthenticatedOrReadOnly

from rest_framework.response import Response
from store_sm.permissions import EsAlmacenero, EsVendedor
from rest_framework.pagination import PageNumberPagination

from apps.productos.models import Producto
from apps.productos.serializers import SerializadorDeProducto
from apps.movimientos.models import Movimiento

from django.db.models import Sum
from django.utils import timezone
from datetime import timedelta


# Create your views here.

@api_view(["GET"])
@permission_classes([IsAuthenticatedOrReadOnly])
def inventario(request):
    topProducto = Movimiento.objects.filter(
        tipo = 'salida').values(
            'producto__id'
            ).annotate(sales=Sum('cantidad'))
    
    id_sales = {}
    for item in topProducto:
        id_sales[item['producto__id']] = item['sales']

    claves=id_sales.keys()

    productos = Producto.objects.filter(id__in=claves)

    paginador = PageNumberPagination()
    paginador.page_size = 4
    paginador.page_size_query_description='limit'
    paginador.max_page_size=20

    paginatedProducto = paginador.paginate_queryset(productos,request)

    serialized = SerializadorDeProducto(paginatedProducto, many=True)

    data = serialized.data
    for item in data:
        id = item['id']
        item['sales']= id_sales[id]

    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def prueba(request):
    pas_fecha= timezone.now()-timedelta(days=30)
    topProducto = Movimiento.objects.filter(
        fecha__gte=pas_fecha,
        tipo = 'salida').values(
            'producto__id',
            'producto__nombre',
            'producto__precio',
            'producto__precio_venta',
            'producto__cantidad',
            ).annotate(sales=Sum('cantidad')).order_by('-sales')[:5]
    
    res = []
    for item in topProducto:
        idi=item['producto__id']
        prod = Producto.objects.get(id=idi)
        producto = SerializadorDeProducto(prod)
        res.append({
            'nombre':prod.nombre,
            'precio':prod.precio,
            'precio_venta':prod.precio_venta,
            'cantidad':prod.cantidad,
            'categoria_nombre':producto.data['categoria_nombre'],
            'seles':item['sales']

        })
    print(res)
    return Response(res)

#prueba mas eficiente
@api_view(["GET"])
@permission_classes([IsAuthenticatedOrReadOnly])
def ultimasVentasProducto(request):
    pas_fecha= timezone.now()-timedelta(days=30)
    topProducto = Movimiento.objects.filter(
        fecha__gte=pas_fecha,
        tipo = 'salida').values(
            'producto__id',
            'producto__nombre',
            'producto__precio',
            'producto__precio_venta',
            'producto__cantidad',
            ).annotate(sales=Sum('cantidad')).order_by('-sales')[:5]
    
    id_sales = {}
    for item in topProducto:
        id_sales[item['producto__id']] = item['sales']

    claves=id_sales.keys()

    productos = Producto.objects.filter(id__in=claves)
    serialized = SerializadorDeProducto(productos, many=True)

    data = serialized.data
    for item in data:
        id = item['id']
        item['sales']= id_sales[id]

    dataOrdenada = sorted(data, key=get_seles, reverse=True)
    return Response(dataOrdenada)

def get_seles(item):
    return item['sales']

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def stoksBajos(request):
    lowests=Producto.objects.filter(cantidad__lt=5).order_by('cantidad')
    productos = SerializadorDeProducto(lowests, many=True)
    return Response(productos.data)



