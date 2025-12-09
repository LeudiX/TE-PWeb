from django.shortcuts import render
from rest_framework.decorators import permission_classes
from rest_framework.permissions import   IsAuthenticatedOrReadOnly

@permission_classes([IsAuthenticatedOrReadOnly])
def categorias(request):
    return render(request, "categorias/categorias.html")