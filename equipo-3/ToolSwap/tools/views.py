from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models import Q, Avg
from django.utils import timezone
from .models import ToolCategory, Tool, RentalRequest, Rating
from user.models import User
from user.decorators import role_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .utils import paginate_queryset
from .utils import get_per_page
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# Create your views here.
@login_required
def tools_list(request):
    """Lista de herramientas disponibles"""
    tools = Tool.objects.filter(status='available').order_by('-created_at')
    categories = ToolCategory.objects.all()
    
    # Filtros
    category_filter = request.GET.get('category')
    search_query = request.GET.get('search')
    
    if category_filter:
        tools = tools.filter(category_id=category_filter)
    
    if search_query:
        tools = tools.filter(
            Q(name__icontains=search_query) | 
            Q(description__icontains=search_query)
        )
    
    # Paginación
    tools_page = paginate_queryset(tools, request)
    
    context = {
        'tools': tools_page,
        'categories': categories,
        'selected_category': int(category_filter) if category_filter else None,
        'search_query': search_query
    }
    # Calificaciones: las que el usuario otorgó y las que recibió
    try:
        ratings_given_qs = Rating.objects.filter(rater=request.user).select_related('rated_user', 'rental_request__tool')
        ratings_received_qs = Rating.objects.filter(rated_user=request.user).select_related('rater', 'rental_request__tool')

        ratings_given = []
        for r in ratings_given_qs:
            ratings_given.append({
                'provider': r.rated_user,
                'tool': r.rental_request.tool,
                'stars': range(r.rating),
                'comment': r.comment,
            })

        ratings_received = []
        for r in ratings_received_qs:
            ratings_received.append({
                'renter': r.rater,
                'tool': r.rental_request.tool,
                'stars': range(r.rating),
                'comment': r.comment,
            })

        context['ratings_given'] = ratings_given
        context['ratings_received'] = ratings_received
    except Exception:
        # En caso de cualquier error, pasar listas vacías para no romper la vista
        context['ratings_given'] = []
        context['ratings_received'] = []
    return render(request, 'tools/tools_list.html', context)

@login_required
def tool_detail(request, tool_id):
    """Detalle de una herramienta específica"""
    tool = get_object_or_404(Tool, id=tool_id)
    
    # Verificar si el usuario ya tiene una solicitud pendiente
    has_pending_request = False
    if request.user.can_rent_tools():
        has_pending_request = RentalRequest.objects.filter(
            tool=tool,
            requester=request.user,
            status='pending'
        ).exists()
    
    # Calificaciones del propietario
    owner_ratings = Rating.objects.filter(rated_user=tool.owner)
    owner_avg_rating = owner_ratings.aggregate(Avg('rating'))['rating__avg'] or 0
    
    context = {
        'tool': tool,
        'has_pending_request': has_pending_request,
        'owner_avg_rating': round(owner_avg_rating, 1),
        'owner_ratings_count': owner_ratings.count()
    }
    # Indicar si el usuario puede solicitar alquileres (útil en la plantilla)
    try:
        context['can_rent'] = request.user.can_rent_tools()
    except Exception:
        context['can_rent'] = False
    
    return render(request, 'tool_detail.html', context)

@login_required
@role_required('client', 'both')
def request_rental(request, tool_id):
    """Solicitar alquiler de una herramienta"""
    
    tool = get_object_or_404(Tool, id=tool_id)
    
    # Validar que el usuario no solicite su propia herramienta
    if tool.owner == request.user:
        messages.error(request, 'No puedes solicitar tu propia herramienta.')
        return redirect('tools_list')
    
    if request.method == 'POST':
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')
        message = request.POST.get('message', '')
        
        # Validaciones
        if not start_date or not end_date:
            messages.error(request, 'Debes seleccionar fechas de inicio y fin.')
            return redirect('tools_list')
        
        try:
            start_date = timezone.datetime.strptime(start_date, '%Y-%m-%d').date()
            end_date = timezone.datetime.strptime(end_date, '%Y-%m-%d').date()
        except ValueError:
            messages.error(request, 'Formato de fecha inválido.')
            return redirect('tools_list')
        
        if start_date >= end_date:
            messages.error(request, 'La fecha de fin debe ser posterior a la fecha de inicio.')
            return redirect('tools_list')
        
        if start_date < timezone.now().date():
            messages.error(request, 'No puedes seleccionar fechas pasadas.')
            return redirect('tools_list')
        
        # Verificar si ya existe una solicitud pendiente
        if tool.has_pending_request():
            messages.error(request, 'Esta herramienta ya tiene una solicitud pendiente.')
            return redirect('tools_list')
        
        # Crear la solicitud
        try:
            rental_request = RentalRequest.objects.create(
                tool=tool,
                requester=request.user,
                start_date=start_date,
                end_date=end_date,
                message=message
            )
            messages.success(request, f'Solicitud de alquiler de "{tool.name}" enviada correctamente.')
            return redirect('my_requests')
        except Exception as e:
            messages.error(request, 'Error al crear la solicitud. Inténtalo de nuevo.')
    
    return redirect('tool_detail', tool_id=tool_id)

@login_required
def my_requests(request):
    """Solicitudes del usuario"""
    # Solicitudes como cliente
    client_requests = RentalRequest.objects.filter(requester=request.user).order_by('-created_at')
    
    # Solicitudes como proveedor
    provider_requests = RentalRequest.objects.filter(tool__owner=request.user).order_by('-created_at')
    
    # Agregar información de si el usuario ya calificó cada solicitud
    for req in client_requests:
        req.user_has_rated = req.ratings.filter(rater=request.user).exists()
    
    for req in provider_requests:
        req.user_has_rated = req.ratings.filter(rater=request.user).exists()
    
    # Paginación para solicitudes como cliente
    from .utils import get_per_page
    per_page = get_per_page(request)
    client_paginator = Paginator(client_requests, per_page)
    client_page = request.GET.get('client_page')
    try:
        client_requests_page = client_paginator.page(client_page)
    except PageNotAnInteger:
        client_requests_page = client_paginator.page(1)
    except EmptyPage:
        client_requests_page = client_paginator.page(client_paginator.num_pages)
    
    # Paginación para solicitudes como proveedor
    provider_paginator = Paginator(provider_requests, per_page)
    provider_page = request.GET.get('provider_page')
    try:
        provider_requests_page = provider_paginator.page(provider_page)
    except PageNotAnInteger:
        provider_requests_page = provider_paginator.page(1)
    except EmptyPage:
        provider_requests_page = provider_paginator.page(provider_paginator.num_pages)
    
    # Contadores de estados
    pending_count = client_requests.filter(status='pending').count() + provider_requests.filter(status='pending').count()
    approved_count = client_requests.filter(status='approved').count() + provider_requests.filter(status='approved').count()
    rejected_count = client_requests.filter(status='rejected').count() + provider_requests.filter(status='rejected').count()
    completed_count = client_requests.filter(status='completed').count() + provider_requests.filter(status='completed').count()
    
    context = {
        'client_requests': client_requests_page,
        'provider_requests': provider_requests_page,
        'pending_count': pending_count,
        'approved_count': approved_count,
        'rejected_count': rejected_count,
        'completed_count': completed_count
    }
    
    return render(request, 'tools/my_requests.html', context)

@login_required
def manage_request(request, request_id, action):
    """Gestionar solicitudes (aprobar/rechazar)"""
    rental_request = get_object_or_404(RentalRequest, id=request_id)
    
    # Verificar que el usuario es el propietario de la herramienta
    if rental_request.tool.owner != request.user:
        messages.error(request, 'No tienes permisos para gestionar esta solicitud.')
        return redirect('my_requests')
    
    if action == 'approve':
        rental_request.approve()
        messages.success(request, 'Solicitud aprobada correctamente.')
    elif action == 'reject':
        reason = request.POST.get('reason', '')
        rental_request.reject(reason)
        messages.success(request, 'Solicitud rechazada.')
    elif action == 'complete':
        rental_request.complete()
        messages.success(request, 'Alquiler marcado como completado.')
    
    return redirect('my_requests')

@login_required
@role_required('provider', 'both')
def my_tools(request):
    """Herramientas del usuario (solo para proveedores)"""
    
    tools = Tool.objects.filter(owner=request.user).order_by('-created_at')
    categories = ToolCategory.objects.all()
    
    # Contadores por estado
    available_tools_count = tools.filter(status='available').count()
    rented_tools_count = tools.filter(status='rented').count()
    
    # Calificación promedio del usuario
    user_ratings = Rating.objects.filter(rated_user=request.user)
    average_rating = user_ratings.aggregate(Avg('rating'))['rating__avg']
    if average_rating:
        average_rating = round(average_rating, 1)
    
    # Aplicar filtros si existen
    category_filter = request.GET.get('category')
    status_filter = request.GET.get('status')
    search_query = request.GET.get('search')
    
    if category_filter:
        tools = tools.filter(category_id=category_filter)
    
    if status_filter:
        tools = tools.filter(status=status_filter)
    
    if search_query:
        tools = tools.filter(
            Q(name__icontains=search_query) | 
            Q(description__icontains=search_query)
        )
    
    # Paginación
    tools_page = paginate_queryset(tools, request)
    
    context = {
        'tools': tools_page,
        'categories': categories,
        'available_tools_count': available_tools_count,
        'rented_tools_count': rented_tools_count,
        'average_rating': average_rating,
        'selected_category': category_filter,
        'selected_status': status_filter,
        'search_query': search_query
    }
    
    return render(request, 'tools/my_tools.html', context)

@login_required
@role_required('provider', 'both')
def edit_tool(request, tool_id):
    """Editar una herramienta existente"""
    tool = get_object_or_404(Tool, id=tool_id, owner=request.user)
    
    if request.method == 'POST':
        try:
            tool.name = request.POST.get('name')
            tool.description = request.POST.get('description')
            tool.category_id = request.POST.get('category')
            tool.condition = request.POST.get('condition')
            tool.status = request.POST.get('availability', 'available')
            tool.daily_rate = float(request.POST.get('daily_rate', 0.01))
            tool.deposit_required = float(request.POST.get('deposit_required', 0))
            tool.location = request.POST.get('location', 'Por definir')
            
            # Procesar nueva imagen si se proporciona
            if request.FILES.getlist('images'):
                image_file = request.FILES.getlist('images')[0]
                import os
                media_root = os.path.join('static', 'media', 'tools')
                os.makedirs(media_root, exist_ok=True)
                
                image_name = f"{request.user.id}_{tool.name.replace(' ', '_')}_{image_file.name}"
                image_path = os.path.join(media_root, image_name)
                
                with open(image_path, 'wb+') as destination:
                    for chunk in image_file.chunks():
                        destination.write(chunk)
                
                tool.main_image = f'/static/media/tools/{image_name}'
            
            tool.save()
            messages.success(request, 'Herramienta actualizada correctamente.')
            return redirect('my_tools')
            
        except Exception as e:
            messages.error(request, f'Error al actualizar la herramienta: {str(e)}')
    
    categories = ToolCategory.objects.all()
    context = {
        'tool': tool,
        'categories': categories
    }
    return render(request, 'tools/edit_tool.html', context)

@login_required
@role_required('provider', 'both')
def delete_tool(request, tool_id):
    """Eliminar una herramienta"""
    tool = get_object_or_404(Tool, id=tool_id, owner=request.user)
    
    if request.method == 'POST':
        try:
            # Verificar si la herramienta está en alquiler
            if tool.status == 'rented':
                messages.error(request, 'No se puede eliminar una herramienta que está en alquiler.')
                return redirect('my_tools')
            
            # Eliminar la herramienta
            tool.delete()
            messages.success(request, 'Herramienta eliminada correctamente.')
            return redirect('my_tools')
            
        except Exception as e:
            messages.error(request, f'Error al eliminar la herramienta: {str(e)}')
            return redirect('my_tools')
    
    return redirect('my_tools')

@login_required
@role_required('provider', 'both')
def add_tool(request):
    """Agregar nueva herramienta"""
    
    if request.method == 'POST':
        try:
            name = request.POST.get('name')
            description = request.POST.get('description')
            category_id = request.POST.get('category')
            condition = request.POST.get('condition')
            status = request.POST.get('availability', 'available')
            daily_rate = request.POST.get('daily_rate')
            deposit_required = request.POST.get('deposit_required', 0)
            location = request.POST.get('location')
            
            # Validaciones básicas (que los campos no esten vacios)
            if not all([name, description, category_id, condition, daily_rate, location]):
                messages.error(request, 'Todos los campos obligatorios son requeridos.')
                return redirect('add_tool')
            
            # Validar que daily_rate sea un número positivo
            try:
                daily_rate = float(daily_rate)
                if daily_rate <= 0:
                    messages.error(request, 'El precio diario debe ser mayor a 0.')
                    return redirect('add_tool')
            except ValueError:
                messages.error(request, 'El precio diario debe ser un número válido.')
                return redirect('add_tool')
            
            # Procesar imágenes
            main_image = None
            if request.FILES.getlist('images'):
                image_file = request.FILES.getlist('images')[0]  # Tomamos la primera imagen
                # Crear el directorio media/tools si no existe
                import os
                media_root = os.path.join('static', 'media', 'tools')
                os.makedirs(media_root, exist_ok=True)
                
                # Guardar la imagen
                image_name = f"{request.user.id}_{name.replace(' ', '_')}_{image_file.name}"
                image_path = os.path.join(media_root, image_name)
                
                with open(image_path, 'wb+') as destination:
                    for chunk in image_file.chunks():
                        destination.write(chunk)
                
                # Guardar la URL relativa
                main_image = f'/static/media/tools/{image_name}'
            
            category = ToolCategory.objects.get(id=category_id)
            tool = Tool.objects.create(
                owner=request.user,
                name=name,
                description=description,
                category=category,
                condition=condition,
                status=status,
                daily_rate=daily_rate,
                deposit_required=float(deposit_required) if deposit_required else 0,
                location=location,
                main_image=main_image
            )
            messages.success(request, 'Herramienta agregada correctamente.')
            return redirect('my_tools')
        except ToolCategory.DoesNotExist:
            messages.error(request, 'La categoría seleccionada no es válida.')
        except Exception as e:
            messages.error(request, f'Error al crear la herramienta: {str(e)}')
    
    categories = ToolCategory.objects.all()
    context = {'categories': categories}
    return render(request, 'tools/add_tool.html', context)

@login_required
def create_rating(request, request_id):
    """Crear una calificación para un usuario después de un alquiler completado"""
    rental_request = get_object_or_404(RentalRequest, id=request_id)
    
    # Verificar que el alquiler esté completado
    if rental_request.status != 'completed':
        messages.error(request, 'Solo puedes calificar alquileres completados.')
        return redirect('my_requests')
    
    # Determinar quién califica a quién
    if request.user == rental_request.requester:
        # El cliente califica al proveedor
        rated_user = rental_request.tool.owner
    elif request.user == rental_request.tool.owner:
        # El proveedor califica al cliente
        rated_user = rental_request.requester
    else:
        messages.error(request, 'No tienes permisos para calificar este alquiler.')
        return redirect('my_requests')
    
    # Verificar si ya existe una calificación
    existing_rating = Rating.objects.filter(
        rater=request.user,
        rental_request=rental_request
    ).first()
    
    if existing_rating:
        messages.warning(request, 'Ya has calificado este alquiler.')
        return redirect('my_requests')
    
    if request.method == 'POST':
        try:
            rating_value = int(request.POST.get('rating'))
            comment = request.POST.get('comment', '')
            
            # Validar rating
            if rating_value < 1 or rating_value > 5:
                messages.error(request, 'La calificación debe estar entre 1 y 5.')
                return redirect('create_rating', request_id=request_id)
            
            # Crear la calificación
            Rating.objects.create(
                rater=request.user,
                rated_user=rated_user,
                rental_request=rental_request,
                rating=rating_value,
                comment=comment
            )
            
            messages.success(request, f'Calificación enviada correctamente para {rated_user.username}.')
            return redirect('my_requests')
            
        except ValueError:
            messages.error(request, 'Calificación inválida.')
        except Exception as e:
            messages.error(request, f'Error al crear la calificación: {str(e)}')
    
    context = {
        'rental_request': rental_request,
        'rated_user': rated_user
    }
    return render(request, 'tools/create_rating.html', context)

@login_required
def user_ratings(request, user_id):
    """Ver todas las calificaciones de un usuario"""
    user = get_object_or_404(User, id=user_id)
    ratings = Rating.objects.filter(rated_user=user).order_by('-created_at')
    
    # Calcular estadísticas
    from django.db.models import Avg, Count
    stats = ratings.aggregate(
        average=Avg('rating'),
        total=Count('id')
    )
    
    # Contar por estrellas
    rating_counts = {
        5: ratings.filter(rating=5).count(),
        4: ratings.filter(rating=4).count(),
        3: ratings.filter(rating=3).count(),
        2: ratings.filter(rating=2).count(),
        1: ratings.filter(rating=1).count(),
    }
    
    # Paginación
    ratings_page = paginate_queryset(ratings, request)
    
    context = {
        'rated_user': user,
        'ratings': ratings_page,
        'average_rating': round(stats['average'], 1) if stats['average'] else 0,
        'total_ratings': stats['total'],
        'rating_counts': rating_counts
    }
    
    return render(request, 'tools/user_ratings.html', context)


@login_required
@role_required('provider', 'both')
def provider_ratings(request):
    """Vista para que un proveedor vea las calificaciones que otorgó y las que recibió"""
    # Ratings otorgadas por el proveedor (como rater)
    ratings_given_qs = Rating.objects.filter(rater=request.user).select_related('rated_user', 'rental_request__tool').order_by('-created_at')

    # Ratings recibidas por el proveedor (como rated_user)
    ratings_received_qs = Rating.objects.filter(rated_user=request.user).select_related('rater', 'rental_request__tool').order_by('-created_at')

    per_page = get_per_page(request)

    # Paginación independiente para cada lista (parámetros GET: given_page, received_page)
    given_page_num = request.GET.get('given_page', 1)
    received_page_num = request.GET.get('received_page', 1)

    given_paginator = Paginator(ratings_given_qs, per_page)
    received_paginator = Paginator(ratings_received_qs, per_page)

    try:
        given_page_obj = given_paginator.page(given_page_num)
    except PageNotAnInteger:
        given_page_obj = given_paginator.page(1)
    except EmptyPage:
        given_page_obj = given_paginator.page(given_paginator.num_pages)

    try:
        received_page_obj = received_paginator.page(received_page_num)
    except PageNotAnInteger:
        received_page_obj = received_paginator.page(1)
    except EmptyPage:
        received_page_obj = received_paginator.page(received_paginator.num_pages)

    context = {
        'ratings_given': given_page_obj,
        'ratings_received': received_page_obj,
    }

    return render(request, 'tools/provider_ratings.html', context)
