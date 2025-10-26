from django.shortcuts import render

def movements(request):
    return render(request, "entradasSalidas.html")