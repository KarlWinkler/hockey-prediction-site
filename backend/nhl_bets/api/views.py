from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .decorators.timezone import with_timezone
from django.utils.dateparse import parse_datetime
from .models import Game, Team, Bet
from .services.bet_stats.win_percent import WinPercent
from .services.bet_stats.extra_time_percent import ExtraTimePercent
from .services.bet_stats.record_by_day import RecordByDay
from .services.bet_stats.by_score_delta import ByScoreDelta
from .services.streaks.loss_streak import LossStreak
from .services.streaks.win_streak import WinStreak
from .services.streaks.lose_against_streak import LoseAgainstStreak
from .services.streaks.win_against_streak import WinAgainstStreak
from .services.team_stats.team_win_percent import TeamWinPercent
from .services.date_service import DateService
from django.contrib.auth.models import User
from .models import User as AppUser
from .serializers.team_serializer import TeamSerializer
from .serializers.game_serializer import GameSerializer
from .serializers.bet_serializer import BetSerializer
from .serializers.user_serializer import UserSerializer
import requests
from datetime import datetime
from datetime import timedelta
from django.utils import timezone


# Create your views here.
@api_view(('GET',))
def get_teams(request):
  teams = Team.objects.all().order_by('name')
  serializer = TeamSerializer(teams, many=True)
  return Response(serializer.data, status=200)

@api_view(('GET',))
def get_team_stats(request, id):
    team_id = id
    user = request.user
    team = get_object_or_404(Team, pk=id)
    serialized_team = TeamSerializer(team, many=False)
    win_percent = TeamWinPercent(user.id, team_id).toJSON()
    return Response({**serialized_team.data, **win_percent}, status=200)

@api_view(('GET',))
def get_games(request):
    games = Game.objects.all()
    serializer = GameSerializer(games, many=True)
    return Response(serializer.data, status=200)

@api_view(('GET',))
def get_games_by_date(request, date):
    parsed_date = parse_datetime(date)
    print(parsed_date)
    beginning_of_day = DateService(parsed_date).start_of_day()
    end_of_day = DateService(parsed_date).end_of_day()
    print(beginning_of_day, end_of_day)
    # stupid syntax for ordering by ascending or descending
    # https://stackoverflow.com/questions/9834038/django-order-by-query-set-ascending-and-descending
    games = Game.objects.filter(date__range=(beginning_of_day, end_of_day)).order_by('date')
    serializer = GameSerializer(games, many=True)
    return Response(serializer.data, status=200)

@api_view(('POST',))
def update_games(request, date=''):
    games = requests.get(f'https://statsapi.web.nhl.com/api/v1/schedule?date={date}&expand=schedule.linescore')
    for date in games.json()['dates']:
        for game in date['games']:
            create_or_update_game(game)
    return Response(games.json(), status=200)

def create_or_update_game(game):
    timezone_aware_date = timezone.make_aware(datetime.strptime(game['gameDate'], '%Y-%m-%dT%H:%M:%SZ'))
    if Game.objects.filter(game_id=game['gamePk']).exists():
        _game=Game.objects.get(game_id=game['gamePk'])
        _game.game_id=game['gamePk']
        _game.date=timezone_aware_date
        _game.status=game['status']['detailedState']
        _game.away_score=game['teams']['away']['score']
        _game.home_score=game['teams']['home']['score']
        _game.home_team=Team.objects.get(nhl_id=game['teams']['home']['team']['id'])
        _game.away_team=Team.objects.get(nhl_id=game['teams']['away']['team']['id'])
        _game.season=game['season']
        
        if _game.status == 'Final':
          _game.result_in = result_in_game(game)
    else:
        _game = Game.objects.create(
            game_id=game['gamePk'],
            date=timezone_aware_date,
            status=game['status']['detailedState'],
            home_team=Team.objects.get(nhl_id=game['teams']['home']['team']['id']),
            away_team=Team.objects.get(nhl_id=game['teams']['away']['team']['id']),
            away_score=game['teams']['away']['score'],
            home_score=game['teams']['home']['score'],
            season=game['season']
        )
    
    _game.save()
    return _game

def result_in_game(game):
    return game['linescore']['currentPeriod'] - 3

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

@with_timezone
@api_view(('GET',))
def bet_stats(request):
    
    date_from, date_to = get_date_range(request)
    win_percent = WinPercent(request.user.id, date_from, DateService(date_to).end_of_day())
    record_per_day = RecordByDay(request.user.id, date_from, date_to)
    et_percent = ExtraTimePercent(request.user.id, date_from, DateService(date_to).end_of_day())
    return Response({ **win_percent.toJSON(), **record_per_day.toJSON(), **by_score_deltas(request, date_from, date_to), **et_percent.toJSON() }, status=200)

def by_score_deltas(request, date_from, date_to):
    score_delta_list = [ByScoreDelta(request.user.id, date_from, DateService(date_to).end_of_day(), delta).toJSON() for delta in range(1, 6)]
    gt_range = ByScoreDelta(request.user.id, date_from, DateService(date_to).end_of_day(), 6, 'gte').toJSON()

    score_delta_list.append(gt_range)
    return { 'by_score_deltas': score_delta_list }

@api_view(('GET',))
def loss_streak(request):
    num_results=int(request.GET.get('num_results', 0))
    streaks = LossStreak(request.user, num_results).toJSON()
    return Response(streaks, status=200)

@api_view(('GET',))
def win_streak(request):
    num_results=int(request.GET.get('num_results', 0))
    streaks = WinStreak(request.user, num_results).toJSON()
    return Response(streaks, status=200)

@api_view(('GET',))
def lose_against_streak(request):
    num_results=int(request.GET.get('num_results', 0))
    streaks = LoseAgainstStreak(request.user, num_results).toJSON()
    return Response(streaks, status=200)

@api_view(('GET',))
def win_against_streak(request):
    num_results=int(request.GET.get('num_results', 0))
    streaks = WinAgainstStreak(request.user, num_results).toJSON()
    return Response(streaks, status=200)

@api_view(('POST',))
def set_favourite_team(request, id):
    if request.user.id is None:
        return Response({'message': 'not logged in'}, status=401)

    user = create_or_get_app_user(request.user)

    user.favourite_team_id = id
    user.save()

    serializer = UserSerializer(user)
    return Response(serializer.data, status=200)

@api_view(('GET',))
def get_user(request):
    if request.user.id is None:
        return Response({'message': 'not logged in'}, status=401)

    user = create_or_get_app_user(request.user)

    if user.favourite_team is None:
        return Response({'message': 'no favourite team set'}, status=200)

    serializer = UserSerializer(user)
    return Response(serializer.data, status=200)

def create_or_get_app_user(user):
    '''
      tries to find an existing user, if not found, creates a new one
    '''
    app_user = AppUser.objects.filter(user_id=user.id)
    if app_user.exists():
        app_user = app_user[0]
    else:
        app_user = AppUser.objects.create(
            user=user,
        )
    app_user.save()
    return app_user

def get_date_range(request):
    date_from=request.GET.get('from', '')
    date_to=request.GET.get('to', '')
    if date_to == '':
        date_to = timezone.localdate().strftime('%Y-%m-%d')
    if date_from == '':
        date_from = (parse_datetime(date_to) - timedelta(days=7)).strftime('%Y-%m-%d')

    date_from=timezone.make_aware(datetime.strptime(date_from, '%Y-%m-%d'))
    date_to= timezone.make_aware(datetime.strptime(date_to, '%Y-%m-%d'))

    if date_to < date_from:
        date_from, date_to = date_to, date_from

    return date_from, date_to
