from ...models import Bet
from ...models import Team
from ...serializers.team_serializer import TeamSerializer

class Streak:
    def __init__(self, user, num_results=0):
        self.user = user
        self.num_results = num_results

    def get_streak_by_team(self, team, streak):
        # get bets where the game is final and the team is the home or away team
        bets = Bet.objects.filter(user=self.user, game__status='Final', game__home_team=team).order_by('-game__date') | Bet.objects.filter(user=self.user, game__status='Final', game__away_team=team).order_by('-game__date')

        return streak(bets)

    def get_streaks(self):
        bets = Bet.objects.filter(user=self.user, game__status='Final').order_by('-game__date')
        active_streaks = {}
        ended_streaks = {}

        return {**active_streaks, **ended_streaks}

    def bet_is_correct(self, bet):
        if bet.game.winner == bet.pick:
            return True
        return False

    def picked_team(self, bet):
        if bet.pick == 'home':
            return bet.game.home_team
        return bet.game.away_team

    def other_team(self, bet):
        if bet.pick == 'home':
            return bet.game.away_team
        return bet.game.home_team

    def no_active_streaks(self, streaks):
        if len(streaks) != Team.objects.count():
            return False

        for streak in streaks:
            if streak > 0:
                return False

        return True

    def __str__(self):
        return f'Loss Streak: {self.get_loss_streak()}'

    def toJSON(self):
        return {
            'user_id': self.user.id,
            'streaks': self.streak_to_json(),
        }

    # def streak_to_json(self):
    #     streaks = self.get_streaks()
    #     streaks_array = []

    #     for streak in streaks:
    #         streaks_array.append({
    #             'team': TeamSerializer(Team.objects.get(pk=streak), many=False).data,
    #             'streak': streaks[streak],
    #         })

    #         streaks_array.sort(key=lambda x: x['streak'], reverse=True)

    #     if self.num_results > 0:
    #         return streaks_array[:self.num_results]

    #     return streaks_array

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
