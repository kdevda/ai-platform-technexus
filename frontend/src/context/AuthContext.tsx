"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState } from '@/types';
import { loginUser, registerUser, getUserProfile } from '@/utils/api';

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
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Create context
const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  hasRole: (role: string) => boolean;
}>({
  state: initialState,
  login: async () => { throw new Error('login function not implemented'); },
  register: async () => {},
  logout: () => {},
  clearError: () => {},
  hasRole: () => false,
});

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
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

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in
  useEffect(() => {
    const loadUser = async () => {
      try {
        // First, try to get token directly
        const tokenFromStorage = localStorage.getItem('token');
        
        // Debug token status
        console.log('Auth check - Token in localStorage:', tokenFromStorage ? 
          `Found (length: ${tokenFromStorage.length})` : 'Not found');
        
        // Then try to get user data that should include the token
        const userFromStorage = localStorage.getItem('user');
        console.log('Auth check - User in storage:', userFromStorage ? 'Found' : 'Not found');
        
        // If we have a token but no user data, try to fetch user profile
        if (tokenFromStorage && !userFromStorage) {
          console.log('Auth check - Token found but no user data, fetching profile...');
          try {
            const userData = await getUserProfile(tokenFromStorage);
            if (userData) {
              // Save the complete user data with token
              const userWithToken = { ...userData, token: tokenFromStorage };
              localStorage.setItem('user', JSON.stringify(userWithToken));
              
              dispatch({
                type: 'LOGIN_SUCCESS',
                payload: userWithToken,
              });
              console.log('Auth check - Successfully fetched and stored user profile');
              return;
            }
          } catch (profileError) {
            console.error('Auth check - Failed to fetch user profile with token:', profileError);
            // Continue to try the user data approach
          }
        }
        
        // If we have user data
        if (userFromStorage) {
          try {
            const user = JSON.parse(userFromStorage);
            console.log('Auth check - Parsed user:', user ? 
              `Email: ${user.email}, Token exists: ${!!user.token}` : 'Failed to parse user');
            
            // If user exists but has no token, try to get it from localStorage directly
            if (user && !user.token && tokenFromStorage) {
              console.log('Auth check - Adding token from localStorage to user object');
              user.token = tokenFromStorage;
            }
            
            if (user && user.token) {
              // Store token separately for easier access
              if (!tokenFromStorage) {
                console.log('Auth check - Saving token to localStorage from user object');
                localStorage.setItem('token', user.token);
              }
              
              try {
                // Only validate the token if it's different from what we already tried
                if (user.token !== tokenFromStorage || !tokenFromStorage) {
                  console.log('Auth check - Validating token by fetching user profile');
                  const updatedUser = await getUserProfile(user.token);
                  if (updatedUser) {
                    console.log('Auth check - User profile validation successful:', updatedUser.email);
                    
                    // Keep the token when updating user data
                    const mergedUser = { ...updatedUser, token: user.token };
                    localStorage.setItem('user', JSON.stringify(mergedUser));
                    
                    dispatch({
                      type: 'LOGIN_SUCCESS',
                      payload: mergedUser,
                    });
                    return;
                  }
                } else {
                  // Use stored user data without validation
                  console.log('Auth check - Using previously fetched user data');
                  dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: user,
                  });
                  return;
                }
              } catch (profileError) {
                console.error('Auth check - Error validating user token:', profileError);
                
                // If token validation fails, try using the stored user data anyway
                console.log('Auth check - Using stored user data despite validation failure');
                dispatch({
                  type: 'LOGIN_SUCCESS',
                  payload: user,
                });
                return;
              }
            } else {
              // No valid token found
              console.warn('Auth check - User found but no valid token available');
              dispatch({ type: 'LOGIN_FAIL', payload: 'No valid authentication token found' });
            }
          } catch (parseError) {
            console.error('Auth check - Error parsing user from localStorage:', parseError);
            localStorage.removeItem('user');
            dispatch({ type: 'LOGIN_FAIL', payload: 'Invalid user data in storage' });
          }
        } else {
          // No user or token found
          console.log('Auth check - No authentication data found');
          dispatch({ type: 'LOGIN_FAIL', payload: 'No authentication data found' });
        }
      } catch (error) {
        console.error('Auth check - Unexpected error:', error);
        dispatch({ type: 'LOGIN_FAIL', payload: 'Unexpected authentication error' });
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'LOGIN_REQUEST' });
      console.log('Login - Attempting to log in user:', email);
      
      const user = await loginUser(email, password);
      
      // Verify we have a valid user object with token
      if (!user) {
        throw new Error('Login returned empty user data');
      }
      
      if (!user.token) {
        throw new Error('Login successful but no authentication token received');
      }
      
      console.log('Login - Success, storing authentication data');
      
      // Clear any existing auth data first to prevent conflicts
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Store the token separately for easier access
      localStorage.setItem('token', user.token);
      
      // Store the full user object with token
      const userJson = JSON.stringify(user);
      localStorage.setItem('user', userJson);
      
      // Verify data was saved correctly
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (!savedToken || !savedUser) {
        console.error('Login - Failed to store authentication data in localStorage');
        throw new Error('Failed to save authentication data. Please check browser storage settings.');
      }
      
      console.log('Login - Authentication data stored successfully');
      
      // Update auth state
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return user;
    } catch (error: unknown) {
      console.error('Login - Error during login process:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({ type: 'LOGIN_FAIL', payload: errorMessage });
      throw error;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      dispatch({ type: 'REGISTER_REQUEST' });
      const user = await registerUser(name, email, password);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({ type: 'REGISTER_FAIL', payload: errorMessage });
    }
  };

  // Logout function
  const logout = () => {
    console.log('Logging out user and clearing all storage');
    
    // Clear all storage to ensure complete logout
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      console.log('All auth data cleared from storage');
    }
    
    dispatch({ type: 'LOGOUT' });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Use a memoized version of hasRole to prevent repeated checks
  const roleCache = new Map<string, boolean>();
  
  const hasRole = (role: string): boolean => {
    // First check if we have a cached result
    const cacheKey = `${state.user?._id || 'no-user'}-${role}`;
    if (roleCache.has(cacheKey)) {
      return roleCache.get(cacheKey)!;
    }
    
    // Only log on the first check for this role
    console.log('Checking role access for:', role);
    
    if (!state.user) {
      roleCache.set(cacheKey, false);
      return false;
    }
    
    let result = false;
    
    // Check legacy role field - case insensitive
    if (state.user.role && typeof state.user.role === 'string' && 
        state.user.role.toLowerCase() === role.toLowerCase()) {
      result = true;
    }
    
    // Check roles array - case insensitive
    else if (Array.isArray(state.user.roles) && state.user.roles.length > 0) {
      result = state.user.roles.some(
        r => typeof r === 'string' && r.toLowerCase() === role.toLowerCase()
      );
    }
    
    // During development, always allow admin access
    if (process.env.NODE_ENV === 'development' && role.toLowerCase() === 'admin') {
      result = true;
    }
    
    // Cache the result
    roleCache.set(cacheKey, result);
    return result;
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout, clearError, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext); 