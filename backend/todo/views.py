from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer
from rest_framework.response import Response
from rest_framework import status

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

    @method_decorator(csrf_exempt)  # CSRF Exception
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @method_decorator(csrf_exempt)  # CSRF Exception
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @method_decorator(csrf_exempt)  # CSRF Exception
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)