from django.shortcuts import render

def principal(request):
    return render(request, "index.html")

def login(request):
    return render(request, "login.html")