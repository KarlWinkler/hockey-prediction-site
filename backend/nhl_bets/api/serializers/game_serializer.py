from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .team_serializer import TeamSerializer
from ..models import Game

class GameSerializer(ModelSerializer):
  home_team = TeamSerializer(many=False)
  away_team = TeamSerializer(many=False)
  winner = ReadOnlyField()

  class Meta:
    model = Game
    fields = '__all__'