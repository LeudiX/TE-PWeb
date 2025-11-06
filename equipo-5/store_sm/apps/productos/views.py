from django.shortcuts import render

def productos(request):
    return render(request, "productos/productos.html")

from django.shortcuts import render

def registrar(request):
    return render(request, "productos/registrarProducto.html")

from django.shortcuts import render

def visualizar(request):
    return render(request, "productos/visualizarProducto.html")

from django.shortcuts import render

def modificar(request):
    return render(request, "productos/modificarProducto.html")