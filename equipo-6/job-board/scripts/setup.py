#!/usr/bin/env python3
"""
Script para configurar la aplicación Django
"""

import os
import sys
import subprocess

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

def main():
    print("=== Configuración de la aplicación Django ===\n")
    
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
    
    print("\n=== Configuración completada ===")
    print("\n🚀 Para ejecutar la aplicación:")
    print("   python manage.py runserver")
    print("\n🌐 Luego visita: http://127.0.0.1:8000/")
    print("\n📋 Características:")
    print("   • Tabla de productos directamente en la página principal")
    print("   • Login y registro en el navbar")
    print("   • Formularios completos de CRUD")
    print("   • Interfaz profesional sin mensajes de demo")
    print("   • 8 productos de ejemplo precargados")

if __name__ == "__main__":
    main()
