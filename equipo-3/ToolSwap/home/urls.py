from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('queries/most-requested/', views.most_requested_tools, name='most_requested_tools'),
    path('queries/available-by-price/', views.available_tools_by_price, name='available_tools_by_price'),
    path('queries/provider-ratings/', views.provider_average_rating, name='provider_average_rating'),
    path('queries/provider-ratings/<int:user_id>/', views.provider_average_rating, name='provider_rating_detail'),
    path('queries/high-rated-tools/', views.tools_by_category_high_rating, name='tools_by_category_high_rating'),
    path('queries/high-rated-tools/<int:category_id>/', views.tools_by_category_high_rating, name='tools_by_category_high_rating_filtered'),
    path('queries/rental-history/', views.rental_history, name='rental_history'),
    path('queries/rental-history/<int:user_id>/', views.rental_history, name='rental_history_user'),
]
