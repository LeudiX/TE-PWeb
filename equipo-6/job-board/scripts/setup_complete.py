#!/usr/bin/env python3
"""
Script completo para configurar la aplicación Django con datos de ejemplo
"""

import os
import sys
import subprocess
import django

def run_command(command):
    """Ejecuta un comando y muestra el resultado"""
    print(f"Ejecutando: {command}")
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.returncode == 0:
        print("✓ Comando ejecutado exitosamente")
        if result.stdout:
            print(result.stdout)
    else:
        print("✗ Error al ejecutar comando")
        if result.stderr:
            print(result.stderr)
    return result.returncode == 0

def create_test_data():
    """Crear datos de prueba"""
    # Configurar Django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
    django.setup()
    
    from django.contrib.auth.models import User
    from myapp.models import Producto
    
    # Crear usuario de prueba
    username = 'admin'
    password = 'admin123'
    email = 'admin@example.com'
    
    if not User.objects.filter(username=username).exists():
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name='Administrador',
            last_name='Sistema',
            is_staff=True,
            is_superuser=True
        )
        print(f"✓ Usuario creado: {username}")
    else:
        user = User.objects.get(username=username)
        print(f"✓ Usuario ya existe: {username}")
    
    # Crear productos de ejemplo
    productos_ejemplo = [
        {
            'nombre': 'Laptop Dell Inspiron',
            'descripcion': 'Laptop Dell Inspiron 15 con procesador Intel Core i5, 8GB RAM, 256GB SSD. Ideal para trabajo y estudio.',
            'precio': 899.99,
            'stock': 25,
            'categoria': 'Electrónicos'
        },
        {
            'nombre': 'Smartphone Samsung Galaxy',
            'descripcion': 'Samsung Galaxy A54 con pantalla de 6.4", cámara de 50MP, 128GB de almacenamiento y batería de larga duración.',
            'precio': 349.99,
            'stock': 50,
            'categoria': 'Electrónicos'
        },
        {
            'nombre': 'Auriculares Sony WH-1000XM4',
            'descripcion': 'Auriculares inalámbricos con cancelación de ruido activa, hasta 30 horas de batería y sonido de alta calidad.',
            'precio': 279.99,
            'stock': 15,
            'categoria': 'Audio'
        },
        {
            'nombre': 'Mesa de Oficina Ergonómica',
            'descripcion': 'Mesa de oficina ajustable en altura con superficie amplia de 120x60cm, ideal para trabajo desde casa.',
            'precio': 199.99,
            'stock': 8,
            'categoria': 'Muebles'
        },
        {
            'nombre': 'Cafetera Espresso Delonghi',
            'descripcion': 'Cafetera espresso automática con molinillo integrado, sistema de espuma de leche y pantalla LCD.',
            'precio': 449.99,
            'stock': 12,
            'categoria': 'Electrodomésticos'
        },
        {
            'nombre': 'Libro "Python para Principiantes"',
            'descripcion': 'Guía completa para aprender programación en Python desde cero, con ejemplos prácticos y ejercicios.',
            'precio': 29.99,
            'stock': 100,
            'categoria': 'Libros'
        },
        {
            'nombre': 'Monitor 4K LG UltraWide',
            'descripcion': 'Monitor curvo de 34" con resolución 4K, ideal para diseño gráfico y gaming. Incluye conectividad USB-C.',
            'precio': 599.99,
            'stock': 6,
            'categoria': 'Electrónicos'
        },
        {
            'nombre': 'Teclado Mecánico RGB',
            'descripcion': 'Teclado mecánico gaming con switches Cherry MX, retroiluminación RGB personalizable y teclas programables.',
            'precio': 129.99,
            'stock': 30,
            'categoria': 'Accesorios'
        }
    ]
    
    for producto_data in productos_ejemplo:
        if not Producto.objects.filter(nombre=producto_data['nombre']).exists():
            Producto.objects.create(
                creado_por=user,
                **producto_data
            )
            print(f"✓ Producto creado: {producto_data['nombre']}")
        else:
            print(f"✓ Producto ya existe: {producto_data['nombre']}")

def main():
    print("=== Configuración completa de Django con datos de ejemplo ===\n")
    
    # Crear migraciones
    print("1. Creando migraciones...")
    if not run_command("python manage.py makemigrations"):
        print("Error al crear migraciones")
        return
    
    # Aplicar migraciones
    print("\n2. Aplicando migraciones...")
    if not run_command("python manage.py migrate"):
        print("Error al aplicar migraciones")
        return
    
    # Crear datos de prueba
    print("\n3. Creando datos de prueba...")
    try:
        create_test_data()
    except Exception as e:
        print(f"Error al crear datos: {e}")
    
    print("\n=== Configuración completada ===")
    print("\n🚀 Para ejecutar la aplicación:")
    print("   python manage.py runserver")
    print("\n🌐 Luego visita: http://127.0.0.1:8000/")
    print("\n👤 Credenciales de prueba:")
    print("   Usuario: admin")
    print("   Contraseña: admin123")
    print("\n✨ Características:")
    print("   • Página principal como inicio")
    print("   • Login/Registro en navbar")
    print("   • Formularios funcionales para crear/editar")
    print("   • 8 productos de ejemplo")
    print("   • CRUD completo")

if __name__ == "__main__":
    main()
