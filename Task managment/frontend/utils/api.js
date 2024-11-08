import axios from 'axios';

// Create a single axios instance with a base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (data) => api.post('/auth/login', data);

export const register = async (data) => {
  try {
    const response = await api.post('/auth/register', data);
    return response; 
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Registration failed');
    } else {
      throw new Error('Network error');
    }
  }
};
const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); 
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createTask = async (taskData) => {
  return api.post('/tasks', taskData, {
    headers: getAuthHeaders(),
  });
};

export const updateTask = async (taskId, updatedData) => {
  return api.put(`/tasks/${taskId}`, updatedData, {
    headers: getAuthHeaders(),
  });
};

export const deleteTask = async (taskId) => {
  return api.delete(`/tasks/${taskId}`, {
    headers: getAuthHeaders(),
  });
};

export const getTasks = async () => {
  return api.get('/tasks/user', {
    headers: getAuthHeaders(),
  });
};

export default api;
