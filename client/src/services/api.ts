import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Add Interceptor to attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('experiencia_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchActivities = () => api.get('/activities');
export const fetchBookings = () => api.get('/bookings');
export const fetchStays = () => api.get('/stays');
export const fetchTransports = () => api.get('/transports');
export const fetchProducts = () => api.get('/products');
export const fetchBlogs = () => api.get('/blogs');
export const fetchMapLocations = () => api.get('/map-locations');

export const createActivity = (data: any) => api.post('/activities', data);
export const updateActivity = (id: string, data: any) => api.put(`/activities/${id}`, data);
export const createBooking = (data: any) => api.post('/bookings', data);
export const createBlog = (data: any) => api.post('/blogs', data);
export const createMapLocation = (data: any) => api.post('/map-locations', data);
export const deleteMapLocation = (id: string) => api.delete(`/map-locations/${id}`);

// Auth Endpoints
export const login = (data: any) => api.post('/auth/login', data);
export const register = (data: any) => api.post('/auth/register', data);
export const verifyOTP = (data: { email: string, code: string }) => api.post('/auth/verify-otp', data);
export const resendOTP = (data: { email: string }) => api.post('/auth/resend-otp', data);
export const getMe = () => api.get('/auth/me');

export default api;
