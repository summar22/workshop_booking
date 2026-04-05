import api from './axios';

export const getWorkshopPublicStats = async (params = {}) => {
  const response = await api.get('/statistics/public/', { params });
  return response.data;
};

export const getWorkshopTypes = async () => {
  const response = await api.get('/workshop/workshop-types/');
  return response.data;
};

export const getStates = async () => {
  const response = await api.get('/workshop/states/');
  return response.data;
};
