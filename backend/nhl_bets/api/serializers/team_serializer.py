from rest_framework.serializers import ModelSerializer
from .icon_serializer import IconSerializer
from ..models import Team

class TeamSerializer(ModelSerializer):
  icon = IconSerializer(many=False)

  class Meta:
    model = Team
    fields = '__all__'