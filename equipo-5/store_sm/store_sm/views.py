from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer


def principal(request):
    return render(request, "index.html")

def login(request):
    return render(request, "login.html")

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer