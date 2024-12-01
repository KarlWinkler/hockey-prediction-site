from ...models import Bet, Game

class ByScoreDelta:
    def __init__(self, user_id, start_date, end_date, delta, conditional='eq'):
        self.user_id = user_id
        self.start_date = start_date
        self.end_date = end_date
        self.delta = delta
        self.conditional = conditional
        self.bets = Bet.objects.filter(user_id=user_id, game__status__in=Game.final_states(), game__date__range=(start_date, end_date))
        self.total_bets = self.bets.count()
        bets_at_delta = [bet for bet in self.bets if self.valid_condition(bet, delta, conditional)]
        self.total_bets_at_delta = len(bets_at_delta)

        self.bets = bets_at_delta

        self.total_wins = len([bet for bet in self.bets if bet.win])
        self.total_losses = len([bet for bet in self.bets if not(bet.win)])
        self.win_percent = self.total_wins / self.total_bets_at_delta if self.total_bets_at_delta > 0 else 0
    
    def __str__(self):
        return f'Win Percent: {self.win_percent}'

    def toJSON(self):
        return {
            'user_id': self.user_id,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'total_bets': self.total_bets_at_delta,
            'delta': self.delta,
            'total_wins_with_delta': self.total_wins,
            'total_losses_with_delta': self.total_losses,
            'win_percent': self.win_percent,
            'conditional': self.conditional
        }

    def valid_condition(self, bet, delta, conditional):
        if conditional == 'eq':
          return abs(bet.game.away_score - bet.game.home_score) == delta
        elif conditional == 'gt':
          return abs(bet.game.away_score - bet.game.home_score) > delta
        elif conditional == 'lt':
          return abs(bet.game.away_score - bet.game.home_score) < delta
        elif conditional == 'gte':
          return abs(bet.game.away_score - bet.game.home_score) >= delta
        elif conditional == 'lte':
          return abs(bet.game.away_score - bet.game.home_score) <= delta
        else:
          return False
