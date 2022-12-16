from django.db import models
from django.conf import settings

# Create your models here.

class Team(models.Model):
    name = models.CharField(max_length=50)
    abbreviation = models.CharField(max_length=3)
    nhl_id = models.IntegerField()
    official_site_url = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Game(models.Model):
    date = models.DateField()
    game_id = models.IntegerField()
    status = models.CharField(max_length=50)
    home_team = models.ForeignKey(Team, on_delete=models.PROTECT, related_name='%(class)s_home_team')
    away_team = models.ForeignKey(Team, on_delete=models.PROTECT, related_name='%(class)s_away_team')
    home_score = models.IntegerField(blank=True, null=True)
    away_score = models.IntegerField(blank=True, null=True)
    result_in = models.IntegerField(blank=True, null=True) # 0 = regulation, 1 = overtime, 2 = shootout

    def __str__(self):
        return self.home_team + ' vs ' + self.away_team

class Bet(models.Model):
    game = models.ForeignKey(Game, on_delete=models.PROTECT)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    bet_amount = models.IntegerField() # in points
    result = models.CharField(max_length=50) # win, lose, pending
    team = models.CharField(max_length=50) # home or away

    def __str__(self):
        return self.user + ' bet ' + self.home_score + ' - ' + self.away_score + ' on ' + self.game

