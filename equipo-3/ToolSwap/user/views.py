from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth import update_session_auth_hash
from django.contrib import messages
from django.db.models import Q, Avg
from django.utils import timezone
from tools.models import Tool, RentalRequest, Rating
from .models import User, RoleChangeRequest
from .decorators import role_required

# Create your views here.
@login_required
def profile(request):
    """Vista del perfil del usuario"""
    user = request.user
    
    # Estadísticas relevantes según el rol del usuario
    stats = {
        'average_rating': Rating.objects.filter(rated_user=user).aggregate(Avg('rating'))['rating__avg'] or 0
    }
    
    # Agregar estadísticas específicas según el rol
    if user.role in ['provider', 'both', 'admin']:
        stats['tools_owned'] = Tool.objects.filter(owner=user).count()
    
    if user.role in ['client', 'both', 'admin']:
        stats['tools_rented'] = RentalRequest.objects.filter(requester=user, status='approved').count()
    
    # Solicitudes pendientes para todos los roles
    stats['pending_requests'] = RentalRequest.objects.filter(
        Q(requester=user, status='pending') | 
        Q(tool__owner=user, status='pending')
    ).count()
    
    context = {
        'user': user,
        'stats': stats
    }
    
    return render(request, 'profile.html', context)

@login_required
def edit_profile(request):
    """Vista para editar el perfil del usuario"""
    user = request.user
    
    if request.method == 'POST':
        try:
            # Actualizar información personal
            user.first_name = request.POST.get('first_name', '').strip()
            user.last_name = request.POST.get('last_name', '').strip()
            user.username = request.POST.get('username', '').strip()
            user.email = request.POST.get('email', '').strip()
            user.phone = request.POST.get('phone', '').strip()
            user.address = request.POST.get('address', '').strip()
            user.role = request.POST.get('role')
            
            # Actualizar foto de perfil
            # Prioridad: archivo subido > URL > mantener actual
            if request.FILES.get('profile_picture_file'):
                # Procesar archivo subido
                import os
                from django.core.files.storage import FileSystemStorage
                
                profile_pic = request.FILES['profile_picture_file']
                
                # Validar tamaño (5MB)
                if profile_pic.size > 5 * 1024 * 1024:
                    messages.error(request, 'La imagen es demasiado grande. Máximo 5MB.')
                    return render(request, 'edit_profile.html', {'user': user})
                
                # Validar tipo
                allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
                if profile_pic.content_type not in allowed_types:
                    messages.error(request, 'Formato de imagen no válido. Usa JPG, PNG, GIF o WebP.')
                    return render(request, 'edit_profile.html', {'user': user})
                
                # Crear directorio si no existe
                media_root = os.path.join('static', 'media', 'profiles')
                os.makedirs(media_root, exist_ok=True)
                
                # Guardar archivo con nombre único
                file_extension = os.path.splitext(profile_pic.name)[1]
                file_name = f"user_{user.id}_profile{file_extension}"
                file_path = os.path.join(media_root, file_name)
                
                # Eliminar archivo anterior si existe
                if user.profile_picture and user.profile_picture.startswith('/static/media/profiles/'):
                    old_file = user.profile_picture.replace('/static/', '')
                    old_file_path = os.path.join('static', old_file.replace('/static/', ''))
                    if os.path.exists(old_file_path):
                        try:
                            os.remove(old_file_path)
                        except:
                            pass
                
                # Guardar nuevo archivo
                with open(file_path, 'wb+') as destination:
                    for chunk in profile_pic.chunks():
                        destination.write(chunk)
                
                user.profile_picture = f'/static/media/profiles/{file_name}'
            elif request.POST.get('profile_picture_url'):
                # Usar URL proporcionada
                profile_picture_url = request.POST.get('profile_picture_url', '').strip()
                user.profile_picture = profile_picture_url if profile_picture_url else None
            # Si no hay archivo ni URL, mantener la actual (no hacer nada)
            
            # Validar username único
            if User.objects.filter(username=user.username).exclude(id=user.id).exists():
                messages.error(request, 'El nombre de usuario ya está en uso.')
                return render(request, 'edit_profile.html', {'user': user})
            
            # Validar email único
            if User.objects.filter(email=user.email).exclude(id=user.id).exists():
                messages.error(request, 'El email ya está en uso.')
                return render(request, 'edit_profile.html', {'user': user})
            
            # Cambiar contraseña si se proporcionó
            current_password = request.POST.get('current_password', '').strip()
            new_password = request.POST.get('new_password', '').strip()
            confirm_password = request.POST.get('confirm_password', '').strip()
            
            if current_password or new_password or confirm_password:
                # Verificar que se proporcionaron todos los campos
                if not all([current_password, new_password, confirm_password]):
                    messages.error(request, 'Debes completar todos los campos de contraseña.')
                    return render(request, 'edit_profile.html', {'user': user})
                
                # Verificar contraseña actual
                if not user.check_password(current_password):
                    messages.error(request, 'La contraseña actual es incorrecta.')
                    return render(request, 'edit_profile.html', {'user': user})
                
                # Verificar que las contraseñas coincidan
                if new_password != confirm_password:
                    messages.error(request, 'Las contraseñas nuevas no coinciden.')
                    return render(request, 'edit_profile.html', {'user': user})
                
                # Verificar longitud mínima
                if len(new_password) < 8:
                    messages.error(request, 'La contraseña debe tener al menos 8 caracteres.')
                    return render(request, 'edit_profile.html', {'user': user})
                
                # Cambiar contraseña
                user.set_password(new_password)
                user.save()
                
                # Mantener la sesión activa después de cambiar contraseña
                update_session_auth_hash(request, user)
                messages.success(request, 'Perfil actualizado exitosamente. Tu contraseña ha sido cambiada.')
            else:
                # Solo guardar cambios de perfil
                user.save()
                messages.success(request, 'Perfil actualizado exitosamente.')
            
            return redirect('profile')
            
        except Exception as e:
            messages.error(request, f'Error al actualizar el perfil: {str(e)}')
            return render(request, 'edit_profile.html', {'user': user})
    
    return render(request, 'edit_profile.html', {'user': user})

@role_required('admin')
def admin_user_list(request):
    """Vista para listar todos los usuarios (solo admin)"""
    from tools.utils import paginate_queryset
    
    users = User.objects.all().order_by('username')
    
    # Paginación
    users_page = paginate_queryset(users, request)
    
    return render(request, 'admin/user_list.html', {'users': users_page})

@role_required('admin')
def admin_edit_user(request, user_id):
    """Vista para editar usuario (solo admin)"""
    user_to_edit = get_object_or_404(User, id=user_id)
    
    if request.method == 'POST':
        # Actualizar los datos del usuario
        user_to_edit.username = request.POST.get('username')
        user_to_edit.email = request.POST.get('email')
        user_to_edit.role = request.POST.get('role')
        user_to_edit.is_active = request.POST.get('is_active') == 'on'
        
        try:
            user_to_edit.save()
            messages.success(request, f'Usuario {user_to_edit.username} actualizado exitosamente.')
            return redirect('admin_user_list')
        except Exception as e:
            messages.error(request, f'Error al actualizar usuario: {str(e)}')
    
    return render(request, 'admin/user_edit.html', {'user_to_edit': user_to_edit})

@role_required('admin')
def admin_delete_user(request, user_id):
    """Vista para eliminar usuario (solo admin)"""
    if request.method == 'POST':
        user_to_delete = get_object_or_404(User, id=user_id)
        username = user_to_delete.username
        
        try:
            user_to_delete.delete()
            messages.success(request, f'Usuario {username} eliminado exitosamente.')
        except Exception as e:
            messages.error(request, f'Error al eliminar usuario: {str(e)}')
    
    return redirect('admin_user_list')


# ==================== VISTAS DE CAMBIO DE ROL ====================

@login_required
def request_role_change(request):
    """Vista para que los usuarios soliciten cambio de rol"""
    # Verificar si ya tiene una solicitud pendiente
    pending_request = RoleChangeRequest.objects.filter(
        user=request.user,
        status='pending'
    ).first()
    
    if request.method == 'POST':
        if pending_request:
            messages.warning(request, 'Ya tienes una solicitud de cambio de rol pendiente.')
            return redirect('request_role_change')
        
        requested_role = request.POST.get('requested_role')
        reason = request.POST.get('reason', '').strip()
        
        # Validaciones
        if not requested_role or requested_role not in ['provider', 'client', 'both']:
            messages.error(request, 'Debes seleccionar un rol válido.')
            return redirect('request_role_change')
        
        if requested_role == request.user.role:
            messages.error(request, 'El rol solicitado es el mismo que tu rol actual.')
            return redirect('request_role_change')
        
        if not reason:
            messages.error(request, 'Debes proporcionar una razón para el cambio de rol.')
            return redirect('request_role_change')
        
        # Crear solicitud
        RoleChangeRequest.objects.create(
            user=request.user,
            current_role=request.user.role,
            requested_role=requested_role,
            reason=reason
        )
        
        messages.success(request, 'Tu solicitud de cambio de rol ha sido enviada al administrador.')
        return redirect('request_role_change')
    
    # Obtener historial de solicitudes del usuario
    user_requests = RoleChangeRequest.objects.filter(user=request.user).order_by('-created_at')
    
    context = {
        'pending_request': pending_request,
        'user_requests': user_requests,
    }
    
    return render(request, 'role_change/request_role_change.html', context)


@role_required('admin')
def admin_role_requests(request):
    """Vista para que el admin gestione solicitudes de cambio de rol"""
    from tools.utils import paginate_queryset
    
    # Filtros
    status_filter = request.GET.get('status', 'pending')
    
    # Obtener solicitudes según filtro
    if status_filter == 'all':
        requests = RoleChangeRequest.objects.all()
    else:
        requests = RoleChangeRequest.objects.filter(status=status_filter)
    
    # Paginación
    requests_page = paginate_queryset(requests, request)
    
    # Estadísticas
    stats = {
        'pending': RoleChangeRequest.objects.filter(status='pending').count(),
        'approved': RoleChangeRequest.objects.filter(status='approved').count(),
        'rejected': RoleChangeRequest.objects.filter(status='rejected').count(),
        'total': RoleChangeRequest.objects.count(),
    }
    
    context = {
        'requests': requests_page,
        'stats': stats,
        'status_filter': status_filter,
    }
    
    return render(request, 'role_change/admin_role_requests.html', context)


@role_required('admin')
def approve_role_request(request, request_id):
    """Vista para aprobar una solicitud de cambio de rol"""
    if request.method == 'POST':
        role_request = get_object_or_404(RoleChangeRequest, id=request_id)
        
        if role_request.status != 'pending':
            messages.warning(request, 'Esta solicitud ya ha sido procesada.')
            return redirect('admin_role_requests')
        
        admin_response = request.POST.get('admin_response', '').strip()
        
        # Aprobar solicitud
        role_request.approve(request.user, admin_response)
        
        messages.success(request, f'Solicitud aprobada. El usuario {role_request.user.username} ahora es {role_request.get_requested_role_display()}.')
        return redirect('admin_role_requests')
    
    return redirect('admin_role_requests')


@role_required('admin')
def reject_role_request(request, request_id):
    """Vista para rechazar una solicitud de cambio de rol"""
    if request.method == 'POST':
        role_request = get_object_or_404(RoleChangeRequest, id=request_id)
        
        if role_request.status != 'pending':
            messages.warning(request, 'Esta solicitud ya ha sido procesada.')
            return redirect('admin_role_requests')
        
        admin_response = request.POST.get('admin_response', '').strip()
        
        if not admin_response:
            messages.error(request, 'Debes proporcionar una razón para rechazar la solicitud.')
            return redirect('admin_role_requests')
        
        # Rechazar solicitud
        role_request.reject(request.user, admin_response)
        
        messages.success(request, f'Solicitud rechazada. Se ha notificado al usuario {role_request.user.username}.')
        return redirect('admin_role_requests')
    
    return redirect('admin_role_requests')
