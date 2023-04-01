from rest_framework.serializers import ModelSerializer
from .team_serializer import TeamSerializer
from authentication.serializers.user_serializer import UserSerializer as AuthUserSerializer
from ..models import User

class UserSerializer(ModelSerializer):
  favourite_team = TeamSerializer(many=False)
  user = AuthUserSerializer(many=False)

  class Meta:
    model = User
    fields = '__all__'