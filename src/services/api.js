import axios from 'axios';

const API = axios.create({
  baseURL: 'https://gearforge-server-production.up.railway.app/api',
});

// Attach token to every request automatically
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('gearforge_user') || 'null');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const productAPI = {
  getAll: (params) => API.get('/products', { params }),
  getById: (id) => API.get(`/products/${id}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.put(`/products/${id}`, data),
  delete: (id) => API.delete(`/products/${id}`),
};

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  profile: () => API.get('/auth/profile'),
};

export const cartAPI = {
  get: () => API.get('/cart'),
  add: (data) => API.post('/cart', data),
  update: (id, data) => API.put(`/cart/${id}`, data),
  remove: (id) => API.delete(`/cart/${id}`),
};

export const orderAPI = {
  create: (data) => API.post('/orders', data),
  getMyOrders: () => API.get('/orders'),
  getById: (id) => API.get(`/orders/${id}`),
  getAll: () => API.get('/orders/admin/all'),
  updateStatus: (id, data) => API.put(`/orders/${id}`, data),
};

export default API;