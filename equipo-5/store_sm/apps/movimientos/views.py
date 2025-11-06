from django.shortcuts import render

def movimientos(request):
    return render(request, "movimientos/movimientos.html")