from ...models import Bet, Team

class TeamWinPercent:
    def __init__(self, user_id, team_id):
        self.user_id = user_id
        self.team_id = team_id
        self.bets = Bet.objects.filter(user_id=user_id, game__status='Final')
        self.team_bets = [bet for bet in self.bets if self.picked_team(bet) == Team.objects.get(id=team_id)]
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
            'total_bets': self.total_bets,
            'total_wins': self.total_wins,
            'total_losses': self.total_losses,
            'win_percent': self.win_percent,
        }

    def picked_team(self, bet):
        if bet.pick == 'home':
            return bet.game.home_team
        return bet.game.away_team