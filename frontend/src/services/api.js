import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
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






