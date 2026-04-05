import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add CSRF token to every request
api.interceptors.request.use(async (config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
    try {
      const resp = await axios.get('/api/workshop/csrf/', { withCredentials: true });
      config.headers['X-CSRFToken'] = resp.data.csrfToken;
    } catch (e) {
      // If CSRF fetch fails, continue anyway
    }
  }
  return config;
});

export default api;
