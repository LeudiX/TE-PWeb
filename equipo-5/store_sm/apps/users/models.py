from django.contrib.auth.models import AbstractUser
from django.db import models
# Create your models here.
class User(AbstractUser):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('Almacenero', 'Almacenero'),
        ('Vendedor', 'Vendedor'),
    ]
    role             = models.CharField(max_length=10, choices=ROLE_CHOICES, default='Vendedor')

    def __str__(self):
        return self.username 
    
    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.role = 'Admin'
        super().save(*args, **kwargs)