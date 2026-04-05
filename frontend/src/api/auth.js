import api from './axios';

export const loginUser = async (username, password) => {
  const response = await api.post('/workshop/login/', { username, password });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post('/workshop/logout/');
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/workshop/user/');
  return response.data;
};
