from django.core.management.base import BaseCommand
from django.utils import timezone

from core.models import JobOffer


class Command(BaseCommand):
    help = 'Archive expired job offers (set is_active=False)'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Do not perform update; just show how many offers would be archived.'
        )

    def handle(self, *args, **options):
        today = timezone.now().date()
        qs = JobOffer.objects.filter(is_active=True, deadline__lt=today)

        if options.get('dry_run'):
            count = qs.count()
            self.stdout.write(self.style.WARNING(f'[DRY RUN] {count} expired offers would be archived.'))
            return

        count = qs.update(is_active=False)
        self.stdout.write(self.style.SUCCESS(f'Archived {count} expired offers.'))
