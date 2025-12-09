from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from home.models import ToolCategory, Tool, User

User = get_user_model()

class Command(BaseCommand):
    help = 'Poblar la base de datos con datos de ejemplo'

    def handle(self, *args, **options):
        self.stdout.write('Creando categorías de herramientas...')
        
        # Crear categorías
        categories_data = [
            {'name': 'Herramientas de Mano', 'description': 'Martillos, destornilladores, llaves', 'icon': 'bi-hammer'},
            {'name': 'Herramientas Eléctricas', 'description': 'Taladros, sierras, lijadoras', 'icon': 'bi-lightning'},
            {'name': 'Herramientas de Jardín', 'description': 'Palas, podadoras, cortacésped', 'icon': 'bi-flower1'},
            {'name': 'Herramientas de Automóvil', 'description': 'Llaves inglesas, gatos hidráulicos', 'icon': 'bi-car-front'},
        ]
        
        for cat_data in categories_data:
            category, created = ToolCategory.objects.get_or_create(
                name=cat_data['name'],
                defaults=cat_data
            )
            if created:
                self.stdout.write(f'  ✓ Categoría creada: {category.name}')
        
        self.stdout.write('Creando usuarios de ejemplo...')
        
        # Crear usuarios de ejemplo
        users_data = [
            {
                'username': 'juan_proveedor',
                'email': 'juan@example.com',
                'first_name': 'Juan',
                'last_name': 'Pérez',
                'role': 'provider',
                'phone': '+1-555-0101',
                'address': 'Calle Principal 123, Ciudad'
            },
            {
                'username': 'maria_cliente',
                'email': 'maria@example.com',
                'first_name': 'María',
                'last_name': 'García',
                'role': 'client',
                'phone': '+1-555-0102',
                'address': 'Avenida Central 456, Ciudad'
            },
            {
                'username': 'carlos_ambos',
                'email': 'carlos@example.com',
                'first_name': 'Carlos',
                'last_name': 'López',
                'role': 'both',
                'phone': '+1-555-0103',
                'address': 'Plaza Mayor 789, Ciudad'
            }
        ]
        
        for user_data in users_data:
            user, created = User.objects.get_or_create(
                username=user_data['username'],
                defaults={
                    **user_data,
                    'password': 'pbkdf2_sha256$600000$dummy$dummy'  # Contraseña dummy
                }
            )
            if created:
                user.set_password('password123')
                user.save()
                self.stdout.write(f'  ✓ Usuario creado: {user.username}')
        
        self.stdout.write('Creando herramientas de ejemplo...')
        
        # Crear herramientas de ejemplo
        tools_data = [
            {
                'name': 'Martillo Profesional 16oz',
                'description': 'Martillo de 16 onzas con mango de fibra de vidrio, ideal para trabajos de construcción.',
                'category': 'Herramientas de Mano',
                'daily_rate': 5.00,
                'deposit_required': 20.00,
                'location': 'Centro de la ciudad',
                'owner_username': 'juan_proveedor'
            },
            {
                'name': 'Taladro Eléctrico 18V',
                'description': 'Taladro inalámbrico de 18V con batería de litio incluida. Perfecto para trabajos domésticos.',
                'category': 'Herramientas Eléctricas',
                'daily_rate': 15.00,
                'deposit_required': 50.00,
                'location': 'Zona Norte',
                'owner_username': 'juan_proveedor'
            },
            {
                'name': 'Cortacésped Eléctrico 1400W',
                'description': 'Cortacésped eléctrico de 1400W para jardines medianos. Incluye bolsa recolectora.',
                'category': 'Herramientas de Jardín',
                'daily_rate': 20.00,
                'deposit_required': 80.00,
                'location': 'Zona Sur',
                'owner_username': 'carlos_ambos'
            },
            {
                'name': 'Juego de Llaves Inglesas',
                'description': 'Juego completo de llaves inglesas de 8mm a 24mm. Ideal para mantenimiento automotriz.',
                'category': 'Herramientas de Automóvil',
                'daily_rate': 8.00,
                'deposit_required': 30.00,
                'location': 'Zona Este',
                'owner_username': 'carlos_ambos'
            },
            {
                'name': 'Sierra Circular 7.25"',
                'description': 'Sierra circular de 7.25 pulgadas con motor de 15 amperios. Ideal para cortes en madera.',
                'category': 'Herramientas Eléctricas',
                'daily_rate': 18.00,
                'deposit_required': 60.00,
                'location': 'Zona Oeste',
                'owner_username': 'juan_proveedor'
            }
        ]
        
        for tool_data in tools_data:
            category = ToolCategory.objects.get(name=tool_data['category'])
            owner = User.objects.get(username=tool_data['owner_username'])
            
            tool, created = Tool.objects.get_or_create(
                name=tool_data['name'],
                owner=owner,
                defaults={
                    'description': tool_data['description'],
                    'category': category,
                    'daily_rate': tool_data['daily_rate'],
                    'deposit_required': tool_data['deposit_required'],
                    'location': tool_data['location']
                }
            )
            if created:
                self.stdout.write(f'  ✓ Herramienta creada: {tool.name}')
        
        self.stdout.write(
            self.style.SUCCESS('¡Datos de ejemplo creados exitosamente!')
        )
        self.stdout.write('\nUsuarios de prueba:')
        self.stdout.write('  - juan_proveedor / password123 (Proveedor)')
        self.stdout.write('  - maria_cliente / password123 (Cliente)')
        self.stdout.write('  - carlos_ambos / password123 (Ambos)')
