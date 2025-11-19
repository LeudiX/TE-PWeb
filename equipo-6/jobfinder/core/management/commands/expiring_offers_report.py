from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta

from core.models import JobOffer


class Command(BaseCommand):
    help = 'Report job offers expiring in the next N days (default 3)'

    def add_arguments(self, parser):
        parser.add_argument(
            '--days',
            type=int,
            default=3,
            help='Number of days ahead to check for expiring offers (default 3)'
        )
        parser.add_argument(
            '--details',
            action='store_true',
            help='Show details (id, title, company, deadline) for each expiring offer'
        )

    def handle(self, *args, **options):
        days = options.get('days')
        today = timezone.now().date()
        end = today + timedelta(days=days)

        qs = JobOffer.objects.filter(is_active=True, deadline__gte=today, deadline__lte=end).order_by('deadline')
        count = qs.count()
        self.stdout.write(self.style.SUCCESS(f'Found {count} offers expiring between {today} and {end}.'))

        if options.get('details'):
            for o in qs:
                company_name = o.company.name if o.company else 'N/A'
                self.stdout.write(f'- [{o.pk}] {o.title} (company: {company_name}) -> {o.deadline}')
