from ...models import Bet
from ...models import Team
from ...serializers.team_serializer import TeamSerializer

from .streaks import Streak
class LoseAgainstStreak(Streak):
    def __init__(self, user, num_results=None):
        self.user = user
        self.num_results = num_results
    
    def calculate_streak(self, bets):
        streak = 0

        for bet in bets:
            if not self.bet_is_correct(bet):
                streak += 1
            else:
                break

        return streak
