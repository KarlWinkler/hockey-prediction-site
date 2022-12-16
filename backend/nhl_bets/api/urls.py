from django.urls import path

from . import views

urlpatterns = [
    path('teams', views.get_teams, name='teams'),
    path('team', views.get_team, name='team'),
    path('games/update/<str:date>', views.update_games, name='games_by_date'),
    path('games/update', views.update_games, name='games'),
    path('games/<str:date>', views.get_games_by_date, name='games_by_date'),
    path('games', views.get_games, name='games'),
    # path('game/<integer:id>', views.get_game, name='game'),
    # path('game/<integer:id>/bets', views.get_game_bets, name='game_bets'),
    # path('bets', views.get_bets, name='bets'),
    # path('bet/<integer:id>', views.get_bets, name='bet'),
]