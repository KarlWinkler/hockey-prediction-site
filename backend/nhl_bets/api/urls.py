from django.urls import path

from . import views

urlpatterns = [
    path('teams', views.get_teams, name='teams'),
    path('teams/stats/<int:id>', views.get_team_stats, name='team_stats'),
    path('games/update/<str:date>', views.update_games, name='games_by_date'),
    path('games/update', views.update_games, name='games'),
    path('games/<str:date>', views.get_games_by_date, name='games_by_date'),
    path('games', views.get_games, name='games'),
    path('bets/<int:game>/<str:pick>', views.update_bets, name='bet'),
    path('bets/delete/<int:game>', views.delete_bet, name='bets'),
    path('bets', views.get_bets, name='bets'),
    path('bets/stats', views.bet_stats, name='bet_stats'),
    path('bets/loss_streak', views.loss_streak, name='loss_streak'),
    path('bets/win_streak', views.win_streak, name='win_streak'),
    path('bets/lose_against_streak', views.lose_against_streak, name='lose_against_streak'),
    path('bets/win_against_streak', views.win_against_streak, name='win_against_streak'),
    path('user', views.get_user, name='user'),
    path('user/favourite_team/<int:id>', views.set_favourite_team, name='favourite_team'),
    path('user/friends', views.get_friends, name='friends'),
]