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
            
    def test_todo_retrieval(self):
        """ Test if the Todo object can be retrieved from the database """
        retrieved_todo = Todo.objects.get(id=self.todo.id)
        self.assertEqual(retrieved_todo.title, "Test Todo")
        self.assertEqual(retrieved_todo.description, "This is a test todo item")
        self.assertFalse(retrieved_todo.completed)
        


    def test_toggle_complete(self):
        """ Test if toggle_complete() correctly updates completed status """
        self.todo.toggle_complete()
        self.assertTrue(self.todo.completed)  # `completed` 상태가 True로 변경되었는지 확인

        self.todo.toggle_complete()
        self.assertFalse(self.todo.completed)  # 다시 실행했을 때 False로 변경되는지 확인

    def test_get_summary(self):
        """ Test if get_summary() returns the correct format """
        summary = self.todo.get_summary()
        self.assertEqual(summary, "Test Todo - Not Completed")  # 초기 상태 확인

        self.todo.toggle_complete()
        summary = self.todo.get_summary()
        self.assertEqual(summary, "Test Todo - Completed")  # 상태 변경 후 확인