import axios from 'axios';

// Force the correct API URL - ignore environment variable
const API_URL = 'http://localhost:5000/api';

console.log('API_URL configured as:', API_URL);
console.log('Environment check:', process.env.REACT_APP_API_URL);
console.log('Using hardcoded URL to override environment variable');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('Axios instance created with baseURL:', api.defaults.baseURL);

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token added to request:', token.substring(0, 20) + '...');
    } else {
      console.log('No token found in localStorage');
    }
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    console.log('Full URL:', config.baseURL + config.url);
    console.log('Request headers:', config.headers);
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
    console.error('Error Status:', error.response?.status);
    console.error('Error Config:', error.config);
    
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






