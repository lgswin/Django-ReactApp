from django.db import models

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title
    
    def toggle_complete(self):
        """ Toggle the completed status of the todo item """
        pass  # 실제 구현 없음

    def get_summary(self):
        """ Returns a summary of the Todo item """
        pass  # 실제 구현 없음