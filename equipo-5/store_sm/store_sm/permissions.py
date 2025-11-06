from rest_framework.permissions import BasePermission

class EsAlmacenero(BasePermission):
    def has_permission(self, request, view):
        return request.user.grups.filter(name='Almacenero').exists()
    
class EsVendedor(BasePermission):
    def has_permission(self, request, view):
        return request.user.grups.filter(name='Vendedor').exists()