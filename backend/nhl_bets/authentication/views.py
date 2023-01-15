from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers.user_serializer import UserSerializer

# Create your views here.
def get_user(request, id):
    pass

@api_view(('POST',))
def login(request):
    username = request.data['username']
    password = request.data['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        auth_login(request._request, user)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=200)
    else:
        return Response({'message': 'invalid credentials'}, status=401)
        # No backend authenticated the credentials

@api_view(('POST',))
def logout(request):
  auth_logout(request)
  return Response({'message': 'logged out'}, status=200)

@api_view(('POST',))
def signup(request):
    username = request.data['username']
    password = request.data['password']
    email = request.data['email']

    user = User.objects.filter(username=username)
    if user.exists():
        serializer = UserSerializer(user.first(), many=False)
        return Response(serializer.data, status=200)
    
    user = User.objects.create_user(username, email, password)
    auth_login(request._request, user)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data, status=201)

@api_view(('GET',))
def get_current_user(request):
    if request.user.id is None:
        return Response({'message': 'not logged in'}, status=401)
    else:
        serializer = UserSerializer(request.user, many=False)
        return Response(serializer.data, status=200)

@api_view(('GET',))
def get_users(request):
    if request.user.id is None:
        return Response({'message': 'not logged in'}, status=401)

    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=200)