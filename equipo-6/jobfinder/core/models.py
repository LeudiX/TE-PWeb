import os
import uuid
from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.core.validators import FileExtensionValidator

class Company(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    website = models.URLField(blank=True)
    phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Candidate(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=200)
    skills = models.TextField(blank=True)
    experience = models.TextField(blank=True)
    resume = models.FileField(upload_to='resumes/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"



class JobOffer(models.Model):
    CATEGORY_CHOICES = [
        ('💻 Desarrollo de Software', '💻 Desarrollo de Software'),
        ('📊 Marketing Digital', '📊 Marketing Digital'),
        ('🎨 Diseño Gráfico', '🎨 Diseño Gráfico'),
        ('✍️ Redacción de Contenidos', '✍️ Redacción de Contenidos'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    location = models.CharField(max_length=200)
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    requirements = models.TextField()
    publication_date = models.DateTimeField(auto_now_add=True)
    deadline = models.DateField()
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-publication_date']

    def __str__(self):
        return self.title

    def clean(self):
        if self.deadline < timezone.now().date():
            raise ValidationError('La fecha límite no puede ser en el pasado.')

    @property
    def is_expired(self):
        return self.deadline < timezone.now().date()

class Application(models.Model):
    STATUS_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('revisada', 'Revisada'),
        ('contactado', 'Contactado'),
        ('rechazada', 'Rechazada'),
    ]

    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    job_offer = models.ForeignKey(JobOffer, on_delete=models.CASCADE)
    application_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pendiente')
    cover_letter = models.TextField()
    notes = models.TextField(blank=True)
    
    def application_attachment_upload_to(instance, filename):
        ext = os.path.splitext(filename)[1].lower()
        filename = f"{uuid.uuid4().hex}{ext}"
        candidate_id = getattr(instance.candidate, 'id', 'anonymous')
        return os.path.join('applications', 'resumes', str(candidate_id), filename)

    attachment = models.FileField(
        upload_to = application_attachment_upload_to,
        validators = [FileExtensionValidator(allowed_extensions=['pdf'])],
        blank = True,
        null = True,
        help_text= 'CV o portafolio en PDF (máx 5MB)'
    )

    class Meta:
        unique_together = ['candidate', 'job_offer']
        ordering = ['-application_date']

    def __str__(self):
        return f"{self.candidate} - {self.job_offer}"

    def clean(self):
        # Evitar acceder a self.job_offer cuando todavía no fue asignado
        # (al validar un ModelForm antes de save(commit=False) puede ocurrir)
        if getattr(self, 'job_offer_id', None):
            # solo si existe la relación comprobamos expiración
            if self.job_offer.is_expired:
                raise ValidationError('No puedes postularte a una oferta expirada.')

        # Validación de tamaño del adjunto (si existe)
        max_size = 5 * 1024 * 1024
        if self.attachment and hasattr(self.attachment, 'size') and self.attachment.size > max_size:
            raise ValidationError('El archivo adjunto debe ser menor a 5MB.')