from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils.dateparse import parse_datetime
from .models import Game, Team, Bet
from .services.win_percent import WinPercent
from .services.record_by_day import RecordByDay
from django.contrib.auth.models import User
from .serializers.game_serializer import GameSerializer
from .serializers.bet_serializer import BetSerializer
import requests
import datetime

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
    parsed_date = parse_datetime(date)
    print(parsed_date)
    beginning_of_day = parsed_date.combine(parsed_date, parsed_date.min.time(), parsed_date.tzinfo)
    end_of_day = parsed_date.combine(parsed_date, parsed_date.max.time(), parsed_date.tzinfo)
    print(beginning_of_day, end_of_day)
    # stupid syntax for ordering by ascending or descending
    # https://stackoverflow.com/questions/9834038/django-order-by-query-set-ascending-and-descending
    games = Game.objects.filter(date__range=(beginning_of_day, end_of_day)).order_by('date')
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
        _game=Game.objects.get(game_id=game['gamePk'])
        _game.game_id=game['gamePk']
        _game.date=parse_datetime(game['gameDate'])
        _game.status=game['status']['detailedState']
        _game.away_score=game['teams']['away']['score']
        _game.home_score=game['teams']['home']['score']
        _game.home_team=Team.objects.get(nhl_id=game['teams']['home']['team']['id'])
        _game.away_team=Team.objects.get(nhl_id=game['teams']['away']['team']['id'])
    else:
        _game = Game.objects.create(
            game_id=game['gamePk'],
            date=parse_datetime(game['gameDate']),
            status=game['status']['detailedState'],
            home_team=Team.objects.get(nhl_id=game['teams']['home']['team']['id']),
            away_team=Team.objects.get(nhl_id=game['teams']['away']['team']['id'])
        )
    
    _game.save()
    return _game

@api_view(('POST',))
def update_bets(request, game, pick):
    if request.user.id is None:
        return Response({'message': 'not logged in'}, status=401)

    if Game.objects.get(pk=game).date < timezone.now():
        return Response({'message': 'game already started'}, status=403)

    create_or_update_bet(request, game, pick)
    return Response('updated bets', status=200)

def create_or_update_bet(request, game, pick):
    matching_bet=Bet.objects.filter(game_id=game, user_id=request.user.id)
    if matching_bet.exists():
        bet=matching_bet[0]
        bet.pick=pick
    else:
        bet = Bet.objects.create(
            game=Game.objects.get(pk=game),
            user=User.objects.get(pk=request.user.id),
            pick=pick,
            bet_amount=1,
        )
    bet.save()
    return bet

@api_view(('GET',))
def get_bets(request):
    games = request.GET.get('games', None)
    if games in [None, '']:
        games = []
    else:
        games = games.split(',')

    bets = Bet.objects.filter(game_id__in=games, user_id=request.user.id)
    serializer = BetSerializer(bets, many=True)
    return Response(serializer.data, status=200)

@api_view(('DELETE',))
def delete_bet(request, game):
    if request.user.id is None:
        return Response({'message': 'not logged in'}, status=401)

    if Game.objects.get(pk=game).date < timezone.now():
        return Response({'message': 'game already started'}, status=403)

    bet = Bet.objects.filter(game_id=game, user_id=request.user.id)
    bet.delete()
    return Response('deleted bet', status=200)

@api_view(('GET',))
def bet_stats(request):
    date_from=parse_datetime(request.GET.get('from', None))
    date_to=parse_datetime(request.GET.get('to', None))
    win_percent = WinPercent(request.user.id, date_from, date_to)
    record_per_day = RecordByDay(request.user.id, date_from, date_to)
    return Response({ **win_percent.toJSON(), **record_per_day.toJSON() }, status=200)