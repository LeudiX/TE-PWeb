from django.core.management.base import BaseCommand
from tools.models import ToolCategory

class Command(BaseCommand):
    help = 'Crea las categorías predefinidas de herramientas'

    def handle(self, *args, **kwargs):
        categories = [
            {
                'name': 'Herramientas de mano',
                'description': 'Martillos, destornilladores y otras herramientas manuales',
                'icon': '🔨'
            },
            {
                'name': 'Herramientas eléctricas',
                'description': 'Taladros, sierras y otras herramientas eléctricas',
                'icon': '⚙️'
            },
            {
                'name': 'Herramientas de jardín',
                'description': 'Palas, podadoras y otras herramientas de jardinería',
                'icon': '🪴'
            },
            {
                'name': 'Herramientas de automóvil',
                'description': 'Llaves inglesas, gatos hidráulicos y otras herramientas automotrices',
                'icon': '🚗'
            }
        ]

        for category_data in categories:
            category, created = ToolCategory.objects.get_or_create(
                name=category_data['name'],
                defaults={
                    'description': category_data['description'],
                    'icon': category_data['icon']
                }
            )
            
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Categoría "{category.name}" creada exitosamente')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'La categoría "{category.name}" ya existe')
                )