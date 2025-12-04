from django.urls import path
from . import views

urlpatterns = [
    path('tools/', views.tools_list, name='tools_list'),
    path('tools/<int:tool_id>/', views.tool_detail, name='tool_detail'),
    path('tools/<int:tool_id>/request/', views.request_rental, name='request_rental'),
    path('my-requests/', views.my_requests, name='my_requests'),
    path('requests/<int:request_id>/<str:action>/', views.manage_request, name='manage_request'),
    path('my-tools/', views.my_tools, name='my_tools'),
    path('add-tool/', views.add_tool, name='add_tool'),
    path('edit-tool/<int:tool_id>/', views.edit_tool, name='edit_tool'),
    path('delete-tool/<int:tool_id>/', views.delete_tool, name='delete_tool'),
    path('rate/<int:request_id>/', views.create_rating, name='create_rating'),
    path('user/<int:user_id>/ratings/', views.user_ratings, name='user_ratings'),
    path('provider/ratings/', views.provider_ratings, name='provider_ratings'),
    # Also expose the provider ratings under /tools/provider/ratings/ for compatibility
    path('tools/provider/ratings/', views.provider_ratings, name='provider_ratings_tools_prefix'),
]