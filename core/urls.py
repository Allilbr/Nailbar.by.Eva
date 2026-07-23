"""
URL configuration for core project.
"""
from django.contrib import admin
from django.urls import path
from catalog import views  

urlpatterns = [
    path('admin/', admin.site.urls),  
    path('', views.home_page, name='home'),
    path('api/booking/', views.create_booking, name='create_booking'),
    path('add-review/', views.add_review, name='add_review'), 
]