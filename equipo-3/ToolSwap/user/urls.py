from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.profile, name='profile'),
    path('profile/edit/', views.edit_profile, name='edit_profile'),
    path('management/users/', views.admin_user_list, name='admin_user_list'),
    path('management/users/<int:user_id>/edit/', views.admin_edit_user, name='admin_edit_user'),
    path('management/users/<int:user_id>/delete/', views.admin_delete_user, name='admin_delete_user'),
    
    # Cambio de rol
    path('role-change/request/', views.request_role_change, name='request_role_change'),
    path('role-change/admin/', views.admin_role_requests, name='admin_role_requests'),
    path('role-change/<int:request_id>/approve/', views.approve_role_request, name='approve_role_request'),
    path('role-change/<int:request_id>/reject/', views.reject_role_request, name='reject_role_request'),
]