from ...models import Bet, Team

class TeamWinPercent:
    def __init__(self, user_id, team_id, start_date, end_date):
        self.user_id = user_id
        self.team_id = team_id
        self.start_date = start_date
        self.end_date = end_date
        self.user_bets = Bet.objects.filter(user_id=user_id, game__status='Final', game__date__range=(start_date, end_date))
        self.team_bets = [bet for bet in self.user_bets if bet.game.home_team_id == team_id or bet.game.away_team_id == team_id]
        self.total_bets = len(self.team_bets)
        self.total_wins = len([bet for bet in self.team_bets if bet.win])
        self.total_losses = len([bet for bet in self.team_bets if not(bet.win)])
        self.win_percent = self.total_wins / self.total_bets if self.total_bets > 0 else 0
    
    def __str__(self):
        return f'Win Percent: {self.win_percent}'

    def toJSON(self):
        return {
            'user_id': self.user_id,
            'team_id': self.team_id,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'total_bets': self.total_bets,
            'total_wins': self.total_wins,
            'total_losses': self.total_losses,
            'win_percent': self.win_percent,
        }
