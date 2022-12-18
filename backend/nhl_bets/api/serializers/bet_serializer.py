from rest_framework.serializers import ModelSerializer
from .game_serializer import GameSerializer
from ..models import Bet

class BetSerializer(ModelSerializer):
  game = GameSerializer(many=False)

  class Meta:
    model = Bet
    fields = '__all__'