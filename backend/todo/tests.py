from django.test import TestCase
from .models import Todo

class TodoModelTestCase(TestCase):
    """ Unit test for Todo model """

    def setUp(self):
        """ Create a sample Todo object before each test """
        self.todo = Todo.objects.create(
            title="Test Todo",
            description="This is a test todo item",
            completed=False
        )

    def test_todo_creation(self):
        """ Test if the Todo object is created correctly """
        self.assertEqual(self.todo.title, "Test Todo")
        self.assertEqual(self.todo.description, "This is a test todo item")
        self.assertFalse(self.todo.completed)

    def test_todo_update(self):
        """ Test if the Todo object can be updated """
        self.todo.title = "Updated Todo"
        self.todo.completed = True
        self.todo.save()

        updated_todo = Todo.objects.get(id=self.todo.id)
        self.assertEqual(updated_todo.title, "Updated Todo")
        self.assertTrue(updated_todo.completed)

    def test_todo_deletion(self):
        """ Test if the Todo object can be deleted """
        todo_id = self.todo.id
        self.todo.delete()
        with self.assertRaises(Todo.DoesNotExist):
            Todo.objects.get(id=todo_id)