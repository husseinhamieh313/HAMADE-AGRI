import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Products
export const getProducts = (params) => api.get('/products', { params }).then((r) => r.data);
export const getProduct = (id) => api.get(`/products/${id}`).then((r) => r.data);
export const createProduct = (data) => api.post('/products', data).then((r) => r.data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data).then((r) => r.data);
export const deleteProduct = (id) => api.delete(`/products/${id}`).then((r) => r.data);

// Auth
export const login = (credentials) => api.post('/auth/login', credentials).then((r) => r.data);
export const register = (data) => api.post('/auth/register', data).then((r) => r.data);

// Users
export const getUsers = () => api.get('/users').then((r) => r.data);
export const createUser = (data) => api.post('/users', data).then((r) => r.data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data).then((r) => r.data);
export const deleteUser = (id) => api.delete(`/users/${id}`).then((r) => r.data);

// Orders
export const getOrders = () => api.get('/orders').then((r) => r.data);
export const createOrder = (data) => api.post('/orders', data).then((r) => r.data);
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}`, { status }).then((r) => r.data);

// Settings
export const getSettings = () => api.get('/settings').then((r) => r.data);
export const updateSettings = (data) => api.put('/settings', data).then((r) => r.data);

export default api;
