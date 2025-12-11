from django.shortcuts import render
from django.db.models import Q

# Create your views here.
def registrar_usuario(request):
    return render(request, 'usuarios/registrarusuario.html')

def listar_usuarios(request):
    return render(request, 'usuarios/listarusuarios.html')


from .paginators import PaginadorDeUsuarios
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticated
from django.shortcuts import get_object_or_404
from store_sm.permissions import EsAdmin
from rest_framework_simplejwt.tokens import RefreshToken


def busqueda(query):
    from django.db.models import Value, CharField
    from django.db.models.functions import Concat
    
    users = User.objects.all()
    if not query:
        return users
    
    # Anotar con nombre completo para búsqueda más fácil
    users = users.annotate(
        full_name=Concat(
            'first_name', Value(' '), 'last_name',
            output_field=CharField()
        )
    )
    
    # Crear consulta de búsqueda
    queryQ = Q()
    
    # Buscar en todos los campos relevantes
    search_fields = [
        'username',
        'first_name', 
        'last_name',
        'email',
        'role',
        'full_name'  # Campo anotado
    ]
    
    for field in search_fields:
        queryQ |= Q(**{f'{field}__icontains': query})
    
    users = users.filter(queryQ)
    return users


@api_view(['GET'])
@permission_classes([IsAuthenticated, EsAdmin])
def list_users(request):
    search_query = request.GET.get('query', '').strip()
    
    users = busqueda(search_query)
    users = users.exclude(id=request.user.id).order_by('username')
    paginator = PaginadorDeUsuarios()
    paginated_users = paginator.paginate_queryset(users, request)
    serializer = UserSerializer(paginated_users, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated, EsAdmin])
def retrieve_user(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated, EsAdmin])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated, EsAdmin])
def update_user(request, pk):
    user = get_object_or_404(User, pk=pk)
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        # Guardamos cambios en el usuario
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated, EsAdmin])
def delete_user(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, EsAdmin])
def delete_users(request):
    ids = request.data.get('ids', [])
    User.objects.filter(id__in=ids).delete()
    return Response({'deleted_ids': ids}, status=status.HTTP_204_NO_CONTENT)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "role": user.role,
    })

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token
        return Response({"user": serializer.data,"access": str(access), "refresh":str(refresh)}, status=status.HTTP_201_CREATED)
