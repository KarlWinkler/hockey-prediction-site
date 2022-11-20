from django.db import models
from django.conf import settings

# Create your models here.
class Game(models.Model):
    date = models.DateField()
    home_team = models.CharField(max_length=50)
    away_team = models.CharField(max_length=50)
    home_score = models.IntegerField()
    away_score = models.IntegerField()
    result_in = models.IntegerField() # 0 = regulation, 1 = overtime, 2 = shootout

    def __str__(self):
        return self.home_team + ' vs ' + self.away_team

class Team(models.Model):
    name = models.CharField(max_length=50)
    abbreviation = models.CharField(max_length=3)
    nhl_id = models.IntegerField()

    def __str__(self):
        return self.name

class Bet(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bet_amount = models.IntegerField() # in points
    result = models.CharField(max_length=50) # win, lose, pending
    team = models.CharField(max_length=50) # home or away

    def __str__(self):
        return self.user + ' bet ' + self.home_score + ' - ' + self.away_score + ' on ' + self.game

