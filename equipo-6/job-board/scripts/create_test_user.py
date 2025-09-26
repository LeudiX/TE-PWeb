#!/usr/bin/env python3
"""
Script para crear un usuario de prueba
"""

import os
import sys
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from django.contrib.auth.models import User

def create_test_user():
    """Crear usuario de prueba"""
    username = 'admin'
    password = 'admin123'
    email = 'admin@example.com'
    
    # Verificar si el usuario ya existe
    if User.objects.filter(username=username).exists():
        print(f"El usuario '{username}' ya existe.")
        return
    
    # Crear usuario
    user = User.objects.create_user(
        username=username,
        password=password,
        email=email,
        is_staff=True,
        is_superuser=True
    )
    
    print(f"✓ Usuario creado exitosamente:")
    print(f"  Username: {username}")
    print(f"  Password: {password}")
    print(f"  Email: {email}")
    print(f"  Es superusuario: Sí")

if __name__ == "__main__":
    create_test_user()
