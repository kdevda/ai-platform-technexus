import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to inject auth token
apiClient.interceptors.request.use(
  (config) => {
    // Try different storage mechanisms for the token
    let token = null;
    
    // Try localStorage first
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
      
      // If not in localStorage, try sessionStorage
      if (!token) {
        token = sessionStorage.getItem('token');
        if (token) {
          console.log('Found token in sessionStorage, saving to localStorage');
          localStorage.setItem('token', token);
        }
      }
    }
    
    // If token exists, add to headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.debug(`Adding auth token to request: ${config.url} (token length: ${token.length})`);
    } else {
      console.warn(`No auth token available for request: ${config.url}`);
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Log detailed error information
    console.error('API Error Response:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
      headers: error.response?.headers
    });
    
    // Handle auth errors
    if (error.response?.status === 401) {
      console.warn('Authentication error intercepted:', error.response.data);
      
      // Only clear localStorage for specific auth errors, not all 401s
      const errorData = error.response?.data as Record<string, any>;
      if (typeof window !== 'undefined' && 
          errorData?.message && 
          typeof errorData.message === 'string' && 
          (errorData.message.includes('token') || errorData.message.includes('not authorized'))) {
        
        console.log('Auth error details:', errorData);
        
        // Check if token exists before clearing
        const hasToken = localStorage.getItem('token') !== null;
        if (hasToken) {
          console.log('Clearing auth data due to token error');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        } else {
          console.log('No token to clear - already missing');
        }
        
        // Don't redirect immediately, let the component handle it
        console.log('401 error, but not forcing navigation - component will handle');
      }
    } else if (error.response?.status === 500) {
      console.error('Server error (500) details:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

// Generic request method with types
export async function apiRequest<T = any>(
  method: string,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await apiClient.request({
      method,
      url,
      data,
      ...config,
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract detailed error information
      const status = error.response?.status;
      const statusText = error.response?.statusText;
      const responseData = error.response?.data;
      
      // Construct a meaningful error message
      let errorMessage = 'An API error occurred';
      
      if (status) {
        errorMessage = `${status} ${statusText || ''}: `;
        
        // Try to extract the most specific error message
        if (responseData) {
          if (typeof responseData === 'object') {
            if (responseData.message && typeof responseData.message === 'string') {
              errorMessage += responseData.message;
            } else if (responseData.error && typeof responseData.error === 'string') {
              errorMessage += responseData.error;
            } else {
              errorMessage += JSON.stringify(responseData).substring(0, 100);
            }
          } else if (typeof responseData === 'string') {
            errorMessage += responseData;
          }
        }
      } else {
        // Network errors or other non-response errors
        errorMessage = error.message || 'Network or connection error';
      }
      
      console.error(`API Error (${url}):`, errorMessage);
      throw new Error(errorMessage);
    }
    throw error;
  }
}

// Export convenience methods
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => 
    apiRequest<T>('GET', url, undefined, config),
    
  post: <T = any>(url: string, data: any, config?: AxiosRequestConfig) => 
    apiRequest<T>('POST', url, data, config),
    
  put: <T = any>(url: string, data: any, config?: AxiosRequestConfig) => 
    apiRequest<T>('PUT', url, data, config),
    
  patch: <T = any>(url: string, data: any, config?: AxiosRequestConfig) => 
    apiRequest<T>('PATCH', url, data, config),
    
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => 
    apiRequest<T>('DELETE', url, undefined, config),
}; 