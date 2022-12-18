from django.urls import path

from . import views

urlpatterns = [
    path('teams', views.get_teams, name='teams'),
    path('team', views.get_team, name='team'),
    path('games/update/<str:date>', views.update_games, name='games_by_date'),
    path('games/update', views.update_games, name='games'),
    path('games/<str:date>', views.get_games_by_date, name='games_by_date'),
    path('games', views.get_games, name='games'),
    path('bets/<int:game>/<str:pick>', views.update_bets, name='bet'),
    path('bets/<int:game>', views.bets_path, name='bets'),
]