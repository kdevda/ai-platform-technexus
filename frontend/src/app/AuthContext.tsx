"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
  roles?: string[];
}

// Define auth state
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Define action types
type AuthAction =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAIL'; payload: string }
  | { type: 'REGISTER_REQUEST' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAIL'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null
      };
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Create context
interface AuthContextProps {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for stored token on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        
        // Set default auth header
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const user = response.data.data;
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set default auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'LOGIN_FAIL', payload: errorMessage });
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: 'REGISTER_REQUEST' });
    try {
      const response = await axios.post('/api/auth/register', { name, email, password });
      const user = response.data.data;
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set default auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'REGISTER_FAIL', payload: errorMessage });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: 'LOGOUT' });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Add this inside the AuthProvider component, before the return statement
  const hasRole = (role: string): boolean => {
    if (!state.user) return false;
    
    // If the user has the exact role
    if (state.user.role === role) return true;
    
    // If the user has roles array and it includes the requested role
    if (state.user.roles && Array.isArray(state.user.roles)) {
      return state.user.roles.includes(role);
    }
    
    return false;
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout, clearError, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 