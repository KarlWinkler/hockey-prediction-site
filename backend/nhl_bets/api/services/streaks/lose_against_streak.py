from ...models import Bet
from ...models import Team
from ...serializers.team_serializer import TeamSerializer

from .streaks import Streak
class LoseAgainstStreak(Streak):
    def __init__(self, user, num_results=None):
        self.user = user
        self.num_results = num_results

    # def get_streaks(self):

        # bets = Bet.objects.filter(user=self.user, game__status='Final').order_by('-game__date')
        # active_streaks = {}
        # ended_streaks = {}

        # for bet in bets:
        #     if not self.bet_is_correct(bet):
        #         if self.other_team(bet).id in active_streaks and active_streaks[self.other_team(bet).id] > 0:
        #             active_streaks[self.other_team(bet).id] += 1
        #         elif self.other_team(bet).id not in active_streaks:
        #             active_streaks[self.other_team(bet).id] = 1
        #     else:
        #         if self.other_team(bet).id in active_streaks and active_streaks[self.other_team(bet).id] > 0:
        #            ended_streaks[self.other_team(bet).id] = active_streaks[self.other_team(bet).id]
        #         active_streaks[self.other_team(bet).id] = -1
        #     if self.no_active_streaks(active_streaks):
        #         break

        # active_streaks = {key: value for key, value in active_streaks.items() if value > 0}
        # print(ended_streaks)

        # return {**active_streaks, **ended_streaks}
    
    def calculate_streak(self, bets):
        streak = 0

        for bet in bets:
            if not self.bet_is_correct(bet):
                streak += 1
            else:
                break

        return streak
            
    def streak_to_json(self):
      teams = Team.objects.all()

      streaks = []

      inx = 0
      for team in teams:
          streaks.append({ "team": TeamSerializer(Team.objects.get(pk=team.id), many=False).data, "streak": self.get_streak_by_team(team, self.calculate_streak) })
          inx += 1

      streaks.sort(key=lambda x: x['streak'], reverse=True)

      if self.num_results:
          streaks = streaks[:self.num_results]

      return streaks
