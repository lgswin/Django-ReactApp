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
        self.completed = not self.completed
        self.save()

    def get_summary(self):
        """ Returns a summary of the Todo item """
        return f"{self.title} - {'Completed' if self.completed else 'Not Completed'}"