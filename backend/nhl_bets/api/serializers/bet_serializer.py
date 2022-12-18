from rest_framework.serializers import ModelSerializer
from ..models import Bet

class BetSerializer(ModelSerializer):

  class Meta:
    model = Bet
    fields = '__all__'