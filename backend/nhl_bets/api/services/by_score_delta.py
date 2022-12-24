from ..models import Bet
from django.utils import timezone
from .date_service import DateService

class ByScoreDelta:
    def __init__(self, user_id, start_date, end_date, delta):
        self.user_id = user_id
        self.start_date = start_date
        self.end_date = end_date
        self.delta = delta
        self.bets = Bet.objects.filter(user_id=user_id, game__status='Final', game__date__range=(start_date, end_date))
        self.total_bets = self.bets.count()

        self.bets = [bet for bet in self.bets if abs(bet.game.away_score - bet.game.home_score) == delta]

        self.total_wins = len([bet for bet in self.bets if bet.win])
        self.total_losses = len([bet for bet in self.bets if not(bet.win)])
        self.win_percent = self.total_wins / self.total_bets if self.total_bets > 0 else 0
    
    def __str__(self):
        return f'Win Percent: {self.win_percent}'

    def toJSON(self):
        return {
            'user_id': self.user_id,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'total_bets': self.total_bets,
            'delta': self.delta,
            'total_wins_with_delta': self.total_wins,
            'total_losses_with_delta': self.total_losses,
            'win_percent': self.win_percent,
        }