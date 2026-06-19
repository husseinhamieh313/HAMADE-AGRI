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

// Messages (contact form submissions)
export const getMessages = () => api.get('/messages').then((r) => r.data);
export const createMessage = (data) => api.post('/messages', data).then((r) => r.data);
export const updateMessageStatus = (id, status) => api.put(`/messages/${id}`, { status }).then((r) => r.data);
export const deleteMessage = (id) => api.delete(`/messages/${id}`).then((r) => r.data);

// Reviews (per-product)
export const getReviews = (productId) => api.get('/reviews', { params: { productId } }).then((r) => r.data);
export const getReviewsSummary = () => api.get('/reviews/summary').then((r) => r.data);
export const getAllReviews = () => api.get('/reviews/all').then((r) => r.data);
export const createReview = (data) => api.post('/reviews', data).then((r) => r.data);
export const deleteReview = (id) => api.delete(`/reviews/${id}`).then((r) => r.data);

// Testimonials (site-wide, not tied to a product)
export const getTestimonials = () => api.get('/testimonials').then((r) => r.data);
export const createTestimonial = (data) => api.post('/testimonials', data).then((r) => r.data);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`).then((r) => r.data);

export default api;