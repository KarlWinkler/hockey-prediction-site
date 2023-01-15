from django.db import models
from django.conf import settings

# Create your models here.

class Icon(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.name

class Team(models.Model):
    name = models.CharField(max_length=50)
    abbreviation = models.CharField(max_length=3)
    nhl_id = models.IntegerField()
    official_site_url = models.CharField(max_length=100)
    icon = models.ForeignKey(Icon, on_delete=models.PROTECT)

    def __str__(self):
        return self.name

class User(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    favourite_team = models.ForeignKey(Team, on_delete=models.PROTECT, blank=True, null=True)

    def __str__(self):
        return self.user.username

# use websockets to tell people when someone has added them as a friend
# then they can reciprocate
# unidirectional model
class Friend(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='%(class)s_user')
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='%(class)s_friend')

    def __str__(self):
        return self.user.user.username + ' + ' + self.friend.user.username

class Game(models.Model):
    date = models.DateTimeField()
    game_id = models.IntegerField()
    status = models.CharField(max_length=50)
    home_team = models.ForeignKey(Team, on_delete=models.PROTECT, related_name='%(class)s_home_team')
    away_team = models.ForeignKey(Team, on_delete=models.PROTECT, related_name='%(class)s_away_team')
    home_score = models.IntegerField(blank=True, null=True)
    away_score = models.IntegerField(blank=True, null=True)
    result_in = models.IntegerField(blank=True, null=True) # 0 = regulation, 1 = overtime, 2 = shootout
    season = models.CharField(max_length=50)

    @property
    def winner(self):
        if self.home_score != None and self.away_score != None:
            if self.home_score > self.away_score:
                return 'home'
            elif self.away_score > self.home_score:
                return 'away'
            else:
                return None

    def __str__(self):
        return self.home_team.name + ' vs ' + self.away_team.name

class Bet(models.Model):
    game = models.ForeignKey(Game, on_delete=models.PROTECT)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    bet_amount = models.IntegerField() # in points (unimplemented)
    pick = models.CharField(max_length=16, default='home') # home or away

    @property
    def win(self):
        if self.game.winner != None:
            if self.game.winner == self.pick:
                return True
            else:
                return False


    def __str__(self):
        return self.user.first_name + ' bet for ' + str(self.game.game_id)

