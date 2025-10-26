from django.db import models

# Create your models here.
class Categoria(models.Model):
    nombre=models.CharField(max_length=30)