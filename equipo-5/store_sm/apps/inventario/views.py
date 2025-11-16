from django.shortcuts import render

def inventarioR(request):
    return render(request, "inventario/inventario.html")