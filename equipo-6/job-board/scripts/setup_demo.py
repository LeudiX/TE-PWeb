#!/usr/bin/env python3
"""
Script para configurar la aplicación Django de demostración
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
    print("=== Configuración de Django - Aplicación de Demostración ===\n")
    
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
    print("\n📋 Características de la demo:")
    print("   • Página principal como inicio")
    print("   • Login/Registro en navbar (no funcional)")
    print("   • Tabla con datos de ejemplo")
    print("   • Formularios de insertar/editar (no funcionales)")
    print("   • Vista de detalles y eliminación (no funcionales)")
    print("   • Todos los botones y formularios son solo visuales")
    print("\n⚠️  IMPORTANTE: Ninguna funcionalidad está implementada")
    print("   Todos los formularios y botones son solo demostración visual")

if __name__ == "__main__":
    main()
