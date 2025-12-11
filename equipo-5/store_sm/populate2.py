# mocks_populate1.py
import os
import django
import random
from datetime import datetime, timedelta
from django.utils import timezone

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'store_sm.settings')
django.setup()

from apps.categorias.models import Categoria
from apps.productos.models import Producto
from apps.movimientos.models import Movimiento

def crear_categorias():
    """Crear categorías de productos tecnológicos"""
    categorias = [
        'Laptops',
        'Smartphones',
        'Tablets',
        'Accesorios',
        'Periféricos',
        'Audio',
        'Gaming',
        'Componentes'
    ]
    
    categorias_objs = {}
    for nombre in categorias:
        categoria, creada = Categoria.objects.get_or_create(nombre=nombre)
        categorias_objs[nombre] = categoria
        if creada:
            print(f"Categoría creada: {nombre}")
    
    return categorias_objs

def crear_productos(categorias):
    """Crear productos tecnológicos de ejemplo"""
    productos_data = [
        # Laptops
        {
            'nombre': 'MacBook Pro 14"',
            'precio': 1999.99,
            'precio_venta': 2499.99,
            'cantidad': 15,
            'categoria': categorias.get('Laptops'),
            'descripcion': 'Laptop Apple chip M3 Pro, 16GB RAM, 512GB SSD',
        },
        {
            'nombre': 'Dell XPS 13',
            'precio': 1299.99,
            'precio_venta': 1499.99,
            'cantidad': 20,
            'categoria': categorias.get('Laptops'),
            'descripcion': 'Laptop ultradelgada pantalla InfinityEdge',
        },
        {
            'nombre': 'Lenovo ThinkPad',
            'precio': 1499.99,
            'precio_venta': 1799.99,
            'cantidad': 12,
            'categoria': categorias.get('Laptops'),
            'descripcion': 'Laptop empresarial durabilidad MIL-STD',
        },
        
        # Smartphones
        {
            'nombre': 'iPhone 15 Pro',
            'precio': 999.99,
            'precio_venta': 1199.99,
            'cantidad': 30,
            'categoria': categorias.get('Smartphones'),
            'descripcion': 'Smartphone Apple chip A17 Pro cámara triple',
        },
        {
            'nombre': 'Samsung S24',
            'precio': 899.99,
            'precio_venta': 1099.99,
            'cantidad': 25,
            'categoria': categorias.get('Smartphones'),
            'descripcion': 'Smartphone Android pantalla AMOLED',
        },
        {
            'nombre': 'Google Pixel 8',
            'precio': 799.99,
            'precio_venta': 999.99,
            'cantidad': 18,
            'categoria': categorias.get('Smartphones'),
            'descripcion': 'Smartphone cámara Android puro',
        },
        
        # Tablets
        {
            'nombre': 'iPad Pro 12.9"',
            'precio': 1099.99,
            'precio_venta': 1299.99,
            'cantidad': 22,
            'categoria': categorias.get('Tablets'),
            'descripcion': 'Tablet Apple chip M2 pantalla Liquid Retina',
        },
        {
            'nombre': 'Samsung Tab S9',
            'precio': 849.99,
            'precio_venta': 1049.99,
            'cantidad': 16,
            'categoria': categorias.get('Tablets'),
            'descripcion': 'Tablet Android S Pen incluido',
        },
        
        # Accesorios
        {
            'nombre': 'Cargador USB-C 65W',
            'precio': 29.99,
            'precio_venta': 49.99,
            'cantidad': 50,
            'categoria': categorias.get('Accesorios'),
            'descripcion': 'Cargador rápido múltiples puertos',
        },
        {
            'nombre': 'Estuche iPhone 15',
            'precio': 19.99,
            'precio_venta': 39.99,
            'cantidad': 45,
            'categoria': categorias.get('Accesorios'),
            'descripcion': 'Estuche protector transparente',
        },
        
        # Periféricos
        {
            'nombre': 'Teclado Mecánico',
            'precio': 89.99,
            'precio_venta': 129.99,
            'cantidad': 30,
            'categoria': categorias.get('Periféricos'),
            'descripcion': 'Teclado RGB switches red',
        },
        {
            'nombre': 'Mouse Gaming',
            'precio': 59.99,
            'precio_venta': 89.99,
            'cantidad': 35,
            'categoria': categorias.get('Periféricos'),
            'descripcion': 'Mouse 16000DPI ajustable',
        },
        
        # Audio
        {
            'nombre': 'Audífonos Sony',
            'precio': 199.99,
            'precio_venta': 299.99,
            'cantidad': 25,
            'categoria': categorias.get('Audio'),
            'descripcion': 'Noise cancelling Bluetooth',
        },
        {
            'nombre': 'Parlante JBL',
            'precio': 79.99,
            'precio_venta': 119.99,
            'cantidad': 20,
            'categoria': categorias.get('Audio'),
            'descripcion': 'Parlante portátil waterproof',
        },
        
        # Gaming
        {
            'nombre': 'PS5 Digital',
            'precio': 399.99,
            'precio_venta': 499.99,
            'cantidad': 15,
            'categoria': categorias.get('Gaming'),
            'descripcion': 'Consola Sony sin lector',
        },
        {
            'nombre': 'Xbox Series S',
            'precio': 299.99,
            'precio_venta': 399.99,
            'cantidad': 18,
            'categoria': categorias.get('Gaming'),
            'descripcion': 'Consola Microsoft 512GB',
        },
        
        # Componentes
        {
            'nombre': 'RAM 16GB DDR4',
            'precio': 59.99,
            'precio_venta': 89.99,
            'cantidad': 40,
            'categoria': categorias.get('Componentes'),
            'descripcion': 'Memoria RAM 3200MHz',
        },
        {
            'nombre': 'SSD 1TB NVMe',
            'precio': 79.99,
            'precio_venta': 119.99,
            'cantidad': 35,
            'categoria': categorias.get('Componentes'),
            'descripcion': 'Disco sólido PCIe 4.0',
        },
    ]
    
    productos_creados = []
    for data in productos_data:
        producto, creado = Producto.objects.get_or_create(
            nombre=data['nombre'],
            defaults={
                'precio': data['precio'],
                'precio_venta': data['precio_venta'],
                'cantidad': data['cantidad'],
                'categoria': data['categoria'],
                'descripcion': data['descripcion'],
            }
        )
        productos_creados.append(producto)
        if creado:
            print(f"Producto creado: {data['nombre']}")
    
    return productos_creados

def crear_movimientos(productos):
    """Crear movimientos de entrada y salida"""
    # Fechas aleatorias pero todas anteriores al 3 de diciembre de 2025
    # Usamos make_aware para crear un datetime con timezone
    fecha_base = timezone.make_aware(datetime(2025, 12, 3))
    
    movimientos = []
    
    for producto in productos:
        # Entrada inicial (compra al proveedor) - 60-90 días atrás
        dias_atras = random.randint(60, 90)
        fecha_entrada = fecha_base - timedelta(days=dias_atras)
        
        # Calcular cantidad de entrada (más que el stock actual)
        cantidad_entrada = producto.cantidad + random.randint(5, 15)
        
        entrada = Movimiento.objects.create(
            tipo='entrada',
            cantidad=cantidad_entrada,
            producto=producto,
            fecha=fecha_entrada
        )
        movimientos.append(entrada)
        
        # Algunas ventas (salidas) en los últimos 60 días
        num_ventas = random.randint(3, 8)
        stock_disponible = cantidad_entrada  # Usamos la cantidad de entrada como stock inicial
        
        for i in range(num_ventas):
            if stock_disponible <= 0:
                break
                
            cantidad_venta = random.randint(1, 3)
            if cantidad_venta > stock_disponible:
                cantidad_venta = stock_disponible
            
            dias_venta = random.randint(1, 60)
            fecha_venta = fecha_base - timedelta(days=dias_venta)
            
            salida = Movimiento.objects.create(
                tipo='salida',
                cantidad=cantidad_venta,
                producto=producto,
                fecha=fecha_venta
            )
            movimientos.append(salida)
            stock_disponible -= cantidad_venta
            
            # Ocasionalmente, reposición después de ventas grandes
            if cantidad_venta >= 3 and random.random() < 0.3:
                dias_reposicion = random.randint(1, 7)
                fecha_reposicion = fecha_venta + timedelta(days=dias_reposicion)
                
                # Asegurar que la reposición no sea después de la fecha base
                if fecha_reposicion < fecha_base:
                    reposicion = Movimiento.objects.create(
                        tipo='entrada',
                        cantidad=random.randint(5, 10),
                        producto=producto,
                        fecha=fecha_reposicion
                    )
                    movimientos.append(reposicion)
                    stock_disponible += reposicion.cantidad
    
    # Movimientos especiales (entradas grandes para productos populares)
    productos_populares = productos[:6]
    for producto in productos_populares:
        if random.random() < 0.4:
            dias_entrada_grande = random.randint(30, 45)
            fecha_entrada_grande = fecha_base - timedelta(days=dias_entrada_grande)
            
            entrada_grande = Movimiento.objects.create(
                tipo='entrada',
                cantidad=random.randint(20, 30),
                producto=producto,
                fecha=fecha_entrada_grande
            )
            movimientos.append(entrada_grande)
    
    print(f"Total movimientos creados: {len(movimientos)}")
    return movimientos

def main():
    """Función principal para poblar la base de datos"""
    print("Iniciando población de datos...")
    print("-" * 50)
    
    # Crear categorías
    categorias = crear_categorias()
    print("-" * 50)
    
    # Crear productos
    productos = crear_productos(categorias)
    print("-" * 50)
    
    # Crear movimientos
    movimientos = crear_movimientos(productos)
    print("-" * 50)
    
    # Mostrar resumen
    print("Resumen de datos creados:")
    print(f"Categorías: {Categoria.objects.count()}")
    print(f"Productos: {Producto.objects.count()}")
    print(f"Movimientos: {Movimiento.objects.count()}")
    
    # Mostrar algunos productos con su stock
    print("\nProductos y stock actual (primeros 5):")
    for producto in Producto.objects.all()[:5]:
        entradas = Movimiento.objects.filter(producto=producto, tipo='entrada').count()
        salidas = Movimiento.objects.filter(producto=producto, tipo='salida').count()
        print(f"- {producto.nombre}: Stock={producto.cantidad}, Entradas={entradas}, Salidas={salidas}")
    
    print("\n¡Datos poblados exitosamente!")

if __name__ == "__main__":
    main()