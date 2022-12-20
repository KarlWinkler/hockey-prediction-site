from ..models import Bet

class WinPercent:
    def __init__(self, user_id, start_date, end_date):
        self.user_id = user_id
        self.start_date = start_date
        self.end_date = end_date
        self.bets = Bet.objects.filter(user_id=user_id, game__date__range=(start_date, end_date))
        self.total_bets = self.bets.count()
        self.total_wins = len([bet for bet in self.bets if bet.win])
        self.total_losses = len([bet for bet in self.bets if not(bet.win)])
        self.win_percent = self.total_wins / self.total_bets
    
    def __str__(self):
        return f'Win Percent: {self.win_percent}'

    def toJSON(self):
        return {
            'user_id': self.user_id,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'total_bets': self.total_bets,
            'total_wins': self.total_wins,
            'total_losses': self.total_losses,
            'win_percent': self.win_percent,
        }
