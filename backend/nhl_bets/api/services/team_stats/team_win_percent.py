from ...models import Bet, Team

class TeamWinPercent:
    def __init__(self, user_id, team_id):
        self.user_id = user_id
        self.team_id = team_id
        self.bets =(Bet.objects
                       .final()
                       .filter(user_id=user_id, game__home_team_id=team_id)
                       .exclude(pick='away')
                       .order_by('-game__date')
                |   Bet.objects
                       .final()
                       .filter(user_id=user_id, game__away_team_id=team_id)
                       .exclude(pick='home')
                       .order_by('-game__date'))
        self.total_bets = len(self.bets)
        self.total_wins = len([bet for bet in self.bets if bet.win])
        self.total_losses = len([bet for bet in self.bets if not(bet.win)])
        self.win_percent = self.total_wins / self.total_bets if self.total_bets > 0 else 0
    
    def __str__(self):
        return f'Win Percent: {self.win_percent}'

    def toJSON(self):
        return {
            'user_id': self.user_id,
            'team_id': self.team_id,
            'total_bets': self.total_bets,
            'total_wins': self.total_wins,
            'total_losses': self.total_losses,
            'win_percent': self.win_percent,
        }

    def picked_team(self, bet):
        if bet.pick == 'home':
            return bet.game.home_team
        return bet.game.away_team