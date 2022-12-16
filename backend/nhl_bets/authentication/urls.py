from django.urls import path
from . import views

urlpatterns = [
    path('user/<str:id>', views.get_user, name='user'),
    path('login', views.login, name='login'),
    path('signup', views.signup, name='signup'),
    path('logout', views.logout, name='logout'),
    path('user', views.get_current_user, name='current_user'),
]