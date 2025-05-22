import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';


const api = {
  getAllTodos: () => axios.get(`${API_URL}/todos`),
  
  createTodo: (todo) => axios.post(`${API_URL}/todos`, todo),
  
  updateTodo: (id, todo) => axios.put(`${API_URL}/todos/${id}`, todo),
  
  deleteTodo: (id) => axios.delete(`${API_URL}/todos/${id}`),
  
  summarizeTodos: () => axios.post(`${API_URL}/summarize`)
};

export default api;