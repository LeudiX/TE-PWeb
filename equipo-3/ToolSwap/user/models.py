from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """
    Modelo de usuario personalizado que extiende AbstractUser
    """
    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.role = 'admin'
        super().save(*args, **kwargs)
    ROLE_CHOICES = [
        ('provider', 'Proveedor'),
        ('client', 'Cliente'),
        ('both', 'Ambos'),
        ('admin', 'Administrador'),
    ]
    
    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default='client',
        help_text='Rol del usuario en la plataforma'
    )
    
    phone = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        help_text='Número de teléfono del usuario'
    )
    
    address = models.TextField(
        blank=True,
        null=True,
        help_text='Dirección del usuario'
    )
    
    profile_picture = models.URLField(
        blank=True,
        null=True,
        help_text='URL de la foto de perfil del usuario'
    )
    
    is_verified = models.BooleanField(
        default=False,
        help_text='Indica si el usuario está verificado'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
    
    def can_provide_tools(self):
        """Verifica si el usuario puede ofrecer herramientas"""
        return self.role in ['provider', 'both', 'admin']
    
    def can_rent_tools(self):
        """Verifica si el usuario puede alquilar herramientas"""
        return self.role in ['client', 'both', 'admin']
    
    def is_admin(self):
        """Verifica si el usuario es administrador"""
        return self.role == 'admin'
    
    def request_role_change(self):
        """
        Retorna la dirección de correo del administrador para solicitar cambio de rol.
        Este método se usa cuando un usuario quiere convertirse en proveedor o ambos roles.
        """
        # En una implementación real, deberías obtener el correo del administrador desde una configuración
        admin_email = "admin@toolswap.com"  # Reemplazar con el correo real del administrador
        return admin_email


class RoleChangeRequest(models.Model):
    """
    Modelo para solicitudes de cambio de rol de usuarios
    """
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('approved', 'Aprobada'),
        ('rejected', 'Rechazada'),
    ]
    
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='role_change_requests',
        help_text='Usuario que solicita el cambio de rol'
    )
    
    current_role = models.CharField(
        max_length=10,
        choices=User.ROLE_CHOICES,
        help_text='Rol actual del usuario'
    )
    
    requested_role = models.CharField(
        max_length=10,
        choices=User.ROLE_CHOICES,
        help_text='Rol solicitado por el usuario'
    )
    
    reason = models.TextField(
        help_text='Razón o justificación del cambio de rol'
    )
    
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending',
        help_text='Estado de la solicitud'
    )
    
    admin_response = models.TextField(
        blank=True,
        null=True,
        help_text='Respuesta del administrador'
    )
    
    reviewed_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='reviewed_role_requests',
        help_text='Administrador que revisó la solicitud'
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text='Fecha de creación de la solicitud'
    )
    
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text='Fecha de última actualización'
    )
    
    reviewed_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text='Fecha de revisión por el administrador'
    )
    
    class Meta:
        verbose_name = 'Solicitud de Cambio de Rol'
        verbose_name_plural = 'Solicitudes de Cambio de Rol'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username}: {self.get_current_role_display()} → {self.get_requested_role_display()} ({self.get_status_display()})"
    
    def approve(self, admin_user, response=''):
        """Aprobar la solicitud y cambiar el rol del usuario"""
        self.status = 'approved'
        self.admin_response = response
        self.reviewed_by = admin_user
        from django.utils import timezone
        self.reviewed_at = timezone.now()
        self.save()
        
        # Cambiar el rol del usuario
        self.user.role = self.requested_role
        self.user.save()
    
    def reject(self, admin_user, response=''):
        """Rechazar la solicitud"""
        self.status = 'rejected'
        self.admin_response = response
        self.reviewed_by = admin_user
        from django.utils import timezone
        self.reviewed_at = timezone.now()
        self.save()
