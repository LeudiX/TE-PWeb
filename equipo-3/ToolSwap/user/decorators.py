from functools import wraps
from django.shortcuts import redirect
from django.contrib import messages

def role_required(*roles):
    """
    Decorador para verificar si el usuario tiene el rol requerido
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if request.user.role in roles or request.user.role == 'admin':
                return view_func(request, *args, **kwargs)
            else:
                messages.error(request, 'No tienes permisos para acceder a esta sección.')
                return redirect('home')
        return _wrapped_view
    return decorator