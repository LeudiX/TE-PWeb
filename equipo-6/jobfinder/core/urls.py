from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    
    # Autenticación
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    
    # Ofertas de trabajo
    path('offers/', views.job_offers, name='job_offers'),
    path('offers/<int:pk>/', views.job_offer_detail, name='job_offer_detail'),
    path('offers/create/', views.create_job_offer, name='create_job_offer'),
    path('offers/<int:pk>/apply/', views.apply_to_offer, name='apply_to_offer'),
    
    # Postulaciones
    path('my-applications/', views.my_applications, name='my_applications'),
    path('company/dashboard/', views.company_dashboard, name='company_dashboard'),
    path('offer/<int:offer_pk>/applications/', views.application_list, name='application_list'),
    path('application/<int:pk>/update-status/', views.update_application_status, name='update_application_status'),
    
    # Consultas
    path('stats/offers-by-category/', views.offers_by_category, name='offers_by_category'),
    path('stats/recent-offers/', views.recent_offers, name='recent_offers'),
    path('stats/expiring-offers/', views.offers_expiring_soon, name='offers_expiring_soon'),
]