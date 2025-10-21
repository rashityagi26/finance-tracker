import axios from 'axios';

// Use relative URL for proxy, or absolute URL for direct connection
const API_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export const transactionAPI = {
  // Get all transactions
  getAll: () => api.get('/transactions'),
  
  // Get single transaction
  getById: (id) => api.get(`/transactions/${id}`),
  
  // Create new transaction
  create: (transaction) => api.post('/transactions', transaction),
  
  // Update transaction
  update: (id, transaction) => api.put(`/transactions/${id}`, transaction),
  
  // Delete transaction
  delete: (id) => api.delete(`/transactions/${id}`),
};

export default api;






