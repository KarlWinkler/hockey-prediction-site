from rest_framework.serializers import ModelSerializer
from .team_serializer import TeamSerializer
from ..models import User

class UserSerializer(ModelSerializer):
  favourite_team = TeamSerializer(many=False)

  class Meta:
    model = User
    fields = '__all__'