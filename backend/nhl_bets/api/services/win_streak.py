from ..models import Bet
from ..models import Team
from ..serializers.team_serializer import TeamSerializer

from .streaks import Streak
class WinStreak(Streak):
    def __init__(self, user, num_results=0):
        self.user = user
        self.num_results = num_results

    def get_streaks(self):
        bets = Bet.objects.filter(user=self.user, game__status='Final').order_by('-game__date')
        active_streaks = {}
        ended_streaks = {}

        for bet in bets:
            if self.bet_is_correct(bet):
                if self.picked_team(bet).id in active_streaks and active_streaks[self.picked_team(bet).id] > 0:
                    active_streaks[self.picked_team(bet).id] += 1
                elif self.picked_team(bet).id not in active_streaks:
                    active_streaks[self.picked_team(bet).id] = 1
            else:
                if self.picked_team(bet).id in active_streaks and active_streaks[self.picked_team(bet).id] > 0:
                   ended_streaks[self.picked_team(bet).id] = active_streaks[self.picked_team(bet).id]
                active_streaks[self.picked_team(bet).id] = -1
            if self.no_active_streaks(active_streaks):
                break

        active_streaks = {key: value for key, value in active_streaks.items() if value > 0}
        print(ended_streaks)

        return {**active_streaks, **ended_streaks}
