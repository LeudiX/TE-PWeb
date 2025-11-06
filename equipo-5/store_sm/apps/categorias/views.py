from django.shortcuts import render

def categorias(request):
    return render(request, "categorias/categorias.html")