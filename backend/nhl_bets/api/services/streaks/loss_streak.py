from ...models import Bet
from ...models import Team
from ...serializers.team_serializer import TeamSerializer

from .streaks import Streak
class LossStreak(Streak):
    def __init__(self, user, num_results=0):
        self.user = user
        self.num_results = num_results

        
    def calculate_team_streak(self, team):
        streak = 0

        bets = (Bet.objects
                   .final()
                   .filter(user=self.user, game__home_team=team)
                   .exclude(pick='away')
                   .order_by('-game__date')
                   | Bet.objects
                        .final()
                        .filter(user=self.user, game__away_team=team)
                        .exclude(pick='home')
                        .order_by('-game__date'))

        for bet in bets:
            if not self.bet_is_correct(bet):
                streak += 1
            else:
                break

        return streak
