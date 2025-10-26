from django.shortcuts import render

def products(request):
    return render(request, "products/productos.html")

from django.shortcuts import render

def register(request):
    return render(request, "products/registrarProducto.html")

from django.shortcuts import render

def visualize(request):
    return render(request, "products/visualizarProducto.html")

from django.shortcuts import render

def modify(request):
    return render(request, "products/modificarProducto.html")