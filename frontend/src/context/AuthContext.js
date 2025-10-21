import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        isAuthenticated: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
        loading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set axios default header with token
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Load user from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setAuthToken(token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: JSON.parse(user),
      });
    }
  }, []);

  // Login user
  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await axios.post('/api/auth/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { token, ...userData } = response.data;
      
      // Store token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Set axios header
      setAuthToken(token);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: userData,
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: message,
      });
      return { success: false, error: message };
    }
  };

  // Register user
  const register = async (name, email, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await axios.post('/api/auth/register', { name, email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { token, ...userData } = response.data;
      
      // Store token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Set axios header
      setAuthToken(token);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: userData,
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: message,
      });
      return { success: false, error: message };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
    dispatch({ type: 'LOGOUT' });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
