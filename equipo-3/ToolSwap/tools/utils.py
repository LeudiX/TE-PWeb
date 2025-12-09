"""
Utilidades para el módulo de herramientas
"""
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


def get_per_page(request, default=10):
    """
    Obtiene el número de items por página desde los parámetros GET.
    Valida que sea un valor permitido.
    
    Args:
        request: HttpRequest object
        default: Valor por defecto si no se especifica (default: 10)
    
    Returns:
        int: Número de items por página
    """
    per_page = request.GET.get('per_page', default)
    try:
        per_page = int(per_page)
        # Validar que esté en los valores permitidos
        if per_page not in [3, 5, 10, 15, 25, 50]:
            per_page = default
    except (ValueError, TypeError):
        per_page = default
    
    return per_page


def paginate_queryset(queryset, request, per_page=None):
    """
    Pagina un queryset con manejo de errores.
    
    Args:
        queryset: QuerySet a paginar
        request: HttpRequest object
        per_page: Items por página (si es None, se obtiene de request.GET)
    
    Returns:
        Page object con los items paginados
    """
    if per_page is None:
        per_page = get_per_page(request)
    
    paginator = Paginator(queryset, per_page)
    page = request.GET.get('page', 1)
    
    try:
        page_obj = paginator.page(page)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)
    
    return page_obj
