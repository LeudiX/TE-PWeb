from rest_framework.permissions import BasePermission

class EsAlmacenero(BasePermission):
    def has_permission(self, request, view):
        if request.user.role =='Almacenero' or request.user.role =='Admin':
            return True
        return False
    
class EsVendedor(BasePermission):
    def has_permission(self, request, view):
        if request.user.role =='Vendedor' or request.user.role =='Admin':
            return True
        return False

class EsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role =='Admin'
      
