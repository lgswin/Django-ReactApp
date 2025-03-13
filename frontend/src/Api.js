import axios from "axios";

// Set Django backend API URL (Use "http://django-todo-app:8000" in a Docker environment)
const API_BASE_URL = "http://localhost:8000"; // Local development environment
// const API_BASE_URL = "http://django-todo-app:8000"; // Docker Compose internal network

// Get CSRF token
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Axios default configuration
const api = axios.create({
  baseURL: API_BASE_URL, // Set the base URL for the Django API
  withCredentials: true,
  headers: {
    "X-CSRFToken": getCookie("csrftoken"),
    "Content-Type": "application/json",
  },
});

// Fetch the list of todos
export const getTodos = async () => {
  try {
    const response = await api.get("/api/todos/");
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    throw error;
  }
};

// Create a new todo
export const createTodo = async (item) => {
  try {
    const response = await api.post("/api/todos/", item);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error.message);
    throw error;
  }
};

// Update a todo
export const updateTodo = async (id, item) => {
  try {
    const response = await api.put(`/api/todos/${id}/`, item);
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error.message);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    await api.delete(`/api/todos/${id}/`);
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    throw error;
  }
};