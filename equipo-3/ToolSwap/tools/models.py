from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from user.models import User

# Create your models here.
class ToolCategory(models.Model):
    """
    Categorías de herramientas
    """
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    
    class Meta:
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'
    
    def __str__(self):
        return self.name


class Tool(models.Model):
    """
    Modelo para las herramientas disponibles para alquiler
    """
    STATUS_CHOICES = [
        ('available', 'Disponible'),
        ('rented', 'Alquilada'),
        ('maintenance', 'En Mantenimiento'),
        ('unavailable', 'No Disponible'),
    ]
    
    CONDITION_CHOICES = [
        ('new', 'Nueva'),
        ('excellent', 'Excelente'),
        ('good', 'Buena'),
        ('fair', 'Regular'),
        ('poor', 'Desgastada'),
    ]
    
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='owned_tools',
        limit_choices_to={'role__in': ['provider', 'both']}
    )
    
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(ToolCategory, on_delete=models.CASCADE)
    
    # Información de alquiler
    daily_rate = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0.01)]
    )
    deposit_required = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )
    
    # Estado y disponibilidad
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='available'
    )
    
    # Condición de la herramienta
    condition = models.CharField(
        max_length=20,
        choices=CONDITION_CHOICES,
        default='good',
        help_text='Estado físico de la herramienta'
    )
    
    # Ubicación
    location = models.CharField(max_length=200)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    
    # Imágenes
    main_image = models.URLField(
        blank=True,
        null=True,
        help_text='URL de la imagen principal de la herramienta'
    )
    
    # Metadatos
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Herramienta'
        verbose_name_plural = 'Herramientas'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.owner.username}"
    
    def is_available(self):
        """Verifica si la herramienta está disponible para alquiler"""
        return self.status == 'available'
    
    def has_pending_request(self):
        """Verifica si tiene una solicitud pendiente"""
        return self.rental_requests.filter(status='pending').exists()
    
    def get_average_rating(self):
        """Calcula la calificación promedio del propietario de la herramienta"""
        from django.db.models import Avg
        ratings = Rating.objects.filter(rated_user=self.owner)
        avg = ratings.aggregate(Avg('rating'))['rating__avg']
        return round(avg, 1) if avg else 0


class RentalRequest(models.Model):
    """
    Modelo para las solicitudes de alquiler
    """
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('approved', 'Aprobada'),
        ('rejected', 'Rechazada'),
        ('completed', 'Completada'),
        ('cancelled', 'Cancelada'),
    ]
    
    tool = models.ForeignKey(
        Tool,
        on_delete=models.CASCADE,
        related_name='rental_requests'
    )
    
    requester = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='rental_requests',
        limit_choices_to={'role__in': ['client', 'both']}
    )
    
    # Fechas de alquiler
    start_date = models.DateField()
    end_date = models.DateField()
    
    # Estado de la solicitud
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    
    # Mensaje del solicitante
    message = models.TextField(blank=True)
    
    # Respuesta del propietario
    owner_response = models.TextField(blank=True)
    
    # Metadatos
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    responded_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        verbose_name = 'Solicitud de Alquiler'
        verbose_name_plural = 'Solicitudes de Alquiler'
        ordering = ['-created_at']
        constraints = [
            models.UniqueConstraint(
                fields=['tool'],
                condition=models.Q(status='pending'),
                name='unique_pending_request_per_tool'
            )
        ]
    
    def __str__(self):
        return f"{self.requester.username} solicita {self.tool.name}"
    
    def approve(self):
        """Aprueba la solicitud de alquiler"""
        self.status = 'approved'
        self.responded_at = timezone.now()
        self.tool.status = 'rented'
        self.tool.save()
        self.save()
    
    def reject(self, reason=""):
        """Rechaza la solicitud de alquiler"""
        self.status = 'rejected'
        self.responded_at = timezone.now()
        self.owner_response = reason
        self.save()
    
    def cancel(self):
        """Cancela la solicitud de alquiler"""
        self.status = 'cancelled'
        self.save()
    
    def complete(self):
        """Marca la solicitud como completada"""
        self.status = 'completed'
        self.tool.status = 'available'
        self.tool.save()
        self.save()
    
    def user_has_rated(self, user):
        """Verifica si un usuario ya calificó esta solicitud"""
        return self.ratings.filter(rater=user).exists()


class Rating(models.Model):
    """
    Modelo para las calificaciones entre usuarios
    """
    RATING_CHOICES = [
        (1, '1 Estrella'),
        (2, '2 Estrellas'),
        (3, '3 Estrellas'),
        (4, '4 Estrellas'),
        (5, '5 Estrellas'),
    ]
    
    # Usuario que califica
    rater = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='ratings_given'
    )
    
    # Usuario calificado
    rated_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='ratings_received'
    )
    
    # Solicitud relacionada
    rental_request = models.ForeignKey(
        RentalRequest,
        on_delete=models.CASCADE,
        related_name='ratings'
    )
    
    # Calificación
    rating = models.IntegerField(
        choices=RATING_CHOICES,
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    
    # Comentario
    comment = models.TextField(blank=True)
    
    # Metadatos
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Calificación'
        verbose_name_plural = 'Calificaciones'
        unique_together = ['rater', 'rental_request']
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.rater.username} califica a {self.rated_user.username} con {self.rating} estrellas"
