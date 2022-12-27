from ..models import Bet

class LossStreak:
    def __init__(self, user):
        self.user = user

    def get_loss_streak(self):
        bets = Bet.objects.filter(user=self.user)
        losses = [bet for bet in self.bets if not(bet.win)]
        if bets:
            return bets.count()
        return 0

    def count_loss_streaks(self):
        bets = Bet.objects.filter(user=self.user).order_by('game__date')
        active_streaks = {}
        streaks = {}

        for bet in bets:
            if not self.bet_is_correct(bet):
                active_streaks[self.winning_team(bet.game).id] += 1
            else:
                streaks[self.winning_team(bet.game).id] = active_streaks[self.winning_team(bet.game).id]
                del active_streaks[self.winning_team(bet.game).id]
            if not active_streaks:
                break

        return streaks

    def bet_is_correct(self, bet):
        if bet.game.winner == bet.pick:
            return True
        return False

    def winning_team(self, game):
        if game.winner == 'Home':
            return game.home_team
        return game.away_team
