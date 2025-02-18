import axios from "axios";

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

// Axios 기본 설정
axios.defaults.withCredentials = true;
axios.defaults.headers.common["X-CSRFToken"] = getCookie("csrftoken");

// ✅ Todo 목록 가져오기
export const getTodos = async () => {
  const response = await axios.get("/api/todos/");
  return response.data;
};

// ✅ Todo 생성
export const createTodo = async (item) => {
  const response = await axios.post("/api/todos/", item, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// ✅ Todo 업데이트
export const updateTodo = async (id, item) => {
  const response = await axios.put(`/api/todos/${id}/`, item, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// ✅ Todo 삭제
export const deleteTodo = async (id) => {
  await axios.delete(`/api/todos/${id}/`);
};