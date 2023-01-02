from ..models import Bet, Game

class ExtraTimePercent:
    def __init__(self, user_id, start_date, end_date):
        self.user_id = user_id
        self.start_date = start_date
        self.end_date = end_date
        self.bets = Bet.objects.filter(user_id=user_id, game__status='Final', game__date__range=(start_date, end_date))
        self.et_bets = [bet for bet in self.bets if bet.game.result_in > 0]
        self.total_bets = self.bets.count()
        self.et_bet_count = len(self.et_bets)
        self.et_losses = len([bet for bet in self.et_bets if not(bet.win)])


        self.et_percent = self.et_losses / self.total_bets if self.total_bets > 0 else 0
    
    def __str__(self):
        return f'Win Percent: {self.win_percent}'

    def toJSON(self):
        return {
            'et_total_bets': self.et_bet_count,
            'et_total_losses': self.et_losses,
            'et_percent': self.et_percent,
        }
