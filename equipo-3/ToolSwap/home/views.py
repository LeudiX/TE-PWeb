from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.db.models import Count, Avg, Q
from django.utils import timezone
from datetime import timedelta
from tools.models import Tool, RentalRequest, Rating, ToolCategory
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from tools.utils import paginate_queryset

def home(request):
    """Homepage view"""
    return render(request, 'home.html')

@login_required
def most_requested_tools(request):
    """
    Consulta 1: Mostrar las 5 herramientas más solicitadas en el último mes
    """
    one_month_ago = timezone.now() - timedelta(days=30)
    
    # Obtener las herramientas más solicitadas
    top_tools = Tool.objects.filter(
        rental_requests__created_at__gte=one_month_ago
    ).annotate(
        request_count=Count('rental_requests')
    ).order_by('-request_count')[:5]
    
    context = {
        'top_tools': top_tools,
        'period': 'último mes'
    }
    
    return render(request, 'queries/most_requested_tools.html', context)

@login_required
def available_tools_by_price(request):
    """
    Consulta 2: Listar las herramientas disponibles para alquilar, 
    ordenadas por precio (del más bajo al más alto)
    """
    tools = Tool.objects.filter(status='available').order_by('daily_rate')
    categories = ToolCategory.objects.all()
    
    # Filtro opcional por categoría
    category_filter = request.GET.get('category')
    if category_filter:
        tools = tools.filter(category_id=category_filter)
    
    # Paginación
    tools_page = paginate_queryset(tools, request)
    
    context = {
        'tools': tools_page,
        'categories': categories,
        'selected_category': int(category_filter) if category_filter else None
    }
    
    return render(request, 'queries/available_tools_by_price.html', context)

@login_required
def provider_average_rating(request, user_id=None):
    """
    Consulta 3: Calcular la calificación promedio de un usuario proveedor
    """
    from user.models import User
    
    # Si no se especifica user_id, mostrar todos los proveedores
    if user_id:
        providers = User.objects.filter(id=user_id, role__in=['provider', 'both'])
    else:
        providers = User.objects.filter(role__in=['provider', 'both'])
    
    # Calcular calificación promedio para cada proveedor
    providers_with_ratings = []
    for provider in providers:
        ratings = Rating.objects.filter(rated_user=provider)
        avg_rating = ratings.aggregate(Avg('rating'))['rating__avg']
        total_ratings = ratings.count()
        tools_count = Tool.objects.filter(owner=provider).count()
        
        providers_with_ratings.append({
            'provider': provider,
            'average_rating': round(avg_rating, 1) if avg_rating else 0,
            'total_ratings': total_ratings,
            'tools_count': tools_count
        })
    
    # Ordenar por calificación promedio
    providers_with_ratings.sort(key=lambda x: x['average_rating'], reverse=True)
    
    context = {
        'providers_with_ratings': providers_with_ratings
    }
    
    return render(request, 'queries/provider_average_rating.html', context)

@login_required
def tools_by_category_high_rating(request, category_id=None):
    """
    Consulta 4: Listar todas las herramientas de una categoría específica 
    con una calificación promedio superior a 4 estrellas
    """
    categories = ToolCategory.objects.all()
    
    # Filtrar por categoría si se especifica
    if category_id:
        tools = Tool.objects.filter(category_id=category_id)
        selected_category = ToolCategory.objects.get(id=category_id)
    else:
        tools = Tool.objects.all()
        selected_category = None
    
    # Filtrar herramientas con calificación promedio > 4
    tools_with_high_rating = []
    for tool in tools:
        # Obtener calificaciones del propietario de la herramienta
        owner_ratings = Rating.objects.filter(rated_user=tool.owner)
        avg_rating = owner_ratings.aggregate(Avg('rating'))['rating__avg']
        
        if avg_rating and avg_rating > 4:
            tools_with_high_rating.append({
                'tool': tool,
                'average_rating': round(avg_rating, 1),
                'ratings_count': owner_ratings.count()
            })
    
    # Ordenar por calificación
    tools_with_high_rating.sort(key=lambda x: x['average_rating'], reverse=True)
    
    context = {
        'tools_with_high_rating': tools_with_high_rating,
        'categories': categories,
        'selected_category': selected_category
    }
    
    return render(request, 'queries/tools_by_category_high_rating.html', context)

@login_required
def rental_history(request, user_id=None):
    """
    Consulta 5: Obtener el historial de alquiler de un usuario cliente, 
    ordenado cronológicamente
    """
    from user.models import User
    
    # Si no se especifica user_id, usar el usuario actual
    if user_id:
        user = User.objects.get(id=user_id)
    else:
        user = request.user
    
    # Obtener historial de alquileres completados
    rental_history = RentalRequest.objects.filter(
        requester=user
    ).order_by('-created_at')
    
    # Agregar información de si el usuario ya calificó cada solicitud
    for rental in rental_history:
        rental.user_has_rated = rental.ratings.filter(rater=request.user).exists()
    
    # Estadísticas
    total_rentals = rental_history.count()
    completed_rentals = rental_history.filter(status='completed').count()
    pending_rentals = rental_history.filter(status='pending').count()
    approved_rentals = rental_history.filter(status='approved').count()
    
    # Paginación
    rental_history_page = paginate_queryset(rental_history, request)
    
    context = {
        'rental_history': rental_history_page,
        'history_user': user,
        'total_rentals': total_rentals,
        'completed_rentals': completed_rentals,
        'pending_rentals': pending_rentals,
        'approved_rentals': approved_rentals
    }
    
    return render(request, 'queries/rental_history.html', context)



