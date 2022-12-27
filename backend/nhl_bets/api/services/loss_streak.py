from ..models import Bet
from ..models import Team
from ..serializers.team_serializer import TeamSerializer

class LossStreak:
    def __init__(self, user, num_results=0):
        self.user = user
        self.num_results = num_results

    def get_loss_streaks(self):
        bets = Bet.objects.filter(user=self.user, game__status='Final').order_by('-game__date')
        active_streaks = {}
        ended_streaks = {}

        for bet in bets:
            if not self.bet_is_correct(bet):
                if self.picked_team(bet).id in active_streaks and active_streaks[self.picked_team(bet).id] > 0:
                    active_streaks[self.picked_team(bet).id] += 1
                else:
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

    def bet_is_correct(self, bet):
        if bet.game.winner == bet.pick:
            return True
        return False

    def picked_team(self, bet):
        if bet.pick == 'home':
            return bet.game.home_team
        return bet.game.away_team

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
            'loss_streaks': self.streak_to_json(),
        }

    def streak_to_json(self):
        streaks = self.get_loss_streaks()
        streaks_array = []

        for streak in streaks:
            streaks_array.append({
                'team': TeamSerializer(Team.objects.get(pk=streak), many=False).data,
                'streak': streaks[streak],
            })

            streaks_array.sort(key=lambda x: x['streak'], reverse=True)

        if self.num_results > 0:
            return streaks_array[:self.num_results]

        return streaks_array