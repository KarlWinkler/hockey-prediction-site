from rest_framework.serializers import ModelSerializer, StringRelatedField
from ..models import Game, Team

class GameSerializer(ModelSerializer):
  home_team = StringRelatedField(many=False)
  away_team = StringRelatedField(many=False)

  class Meta:
    model = Game
    fields = '__all__'