from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Game, Team
from .serializers.games_serializer import GameSerializer
import requests

# Create your views here.
@api_view(('GET',))
def get_teams(request):
  teams = requests.get('https://statsapi.web.nhl.com/api/v1/teams')
  return Response(teams.json(), status=200)

@api_view(('GET',))
def get_team(request, id):
    return Response('one Team', status=200)

@api_view(('GET',))
def get_games(request):
    games = Game.objects.all()
    serializer = GameSerializer(games, many=True)
    return Response(serializer.data, status=200)

@api_view(('GET',))
def get_games_by_date(request, date):
    games = Game.objects.filter(date__contains=date)
    serializer = GameSerializer(games, many=True)
    return Response(serializer.data, status=200)

@api_view(('POST',))
def update_games(request, date=''):
    games = requests.get(f'https://statsapi.web.nhl.com/api/v1/schedule?date={date}')
    for date in games.json()['dates']:
        for game in date['games']:
            create_or_update_game(game)
    return Response(games.json(), status=200)

def create_or_update_game(game):
    if Game.objects.filter(game_id=game['gamePk']).exists():
        game = Game.objects.get(game_id=game['gamePk'])
        game.game_id = game['gamePk']
        game.date = game['gameDate']
        game.status = game['status']['detailedState']
        game.home_team = Team.objects.get(nhl_id=game['teams']['home']['team']['id'])
        game.away_team = Team.objects.get(nhl_id=game['teams']['away']['team']['id'])
        game.save()
    else:
        game = Game.objects.create(
            game_id=game['gamePk'],
            date=game['gameDate'][0:10],
            status=game['status']['detailedState'],
            home_team=Team.objects.get(nhl_id=game['teams']['home']['team']['id']),
            away_team=Team.objects.get(nhl_id=game['teams']['away']['team']['id'])
        )
        game.save()
    return game
