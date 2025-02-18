import axios from "axios";

// ✅ Django 백엔드 API URL 설정 (Docker 환경에서는 "http://django-todo-app:8000" 사용 가능)
const API_BASE_URL = "http://localhost:8000"; // 로컬 개발 환경
// const API_BASE_URL = "http://django-todo-app:8000"; // Docker Compose 내부 네트워크

// CSRF 토큰 가져오기
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

// ✅ Axios 기본 설정
const api = axios.create({
  baseURL: API_BASE_URL, // Django API의 기본 URL 설정
  withCredentials: true,
  headers: {
    "X-CSRFToken": getCookie("csrftoken"),
    "Content-Type": "application/json",
  },
});

// ✅ Todo 목록 가져오기
export const getTodos = async () => {
  try {
    const response = await api.get("/api/todos/");
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    throw error;
  }
};

// ✅ Todo 생성
export const createTodo = async (item) => {
  try {
    const response = await api.post("/api/todos/", item);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error.message);
    throw error;
  }
};

// ✅ Todo 업데이트
export const updateTodo = async (id, item) => {
  try {
    const response = await api.put(`/api/todos/${id}/`, item);
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error.message);
    throw error;
  }
};

// ✅ Todo 삭제
export const deleteTodo = async (id) => {
  try {
    await api.delete(`/api/todos/${id}/`);
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    throw error;
  }
};