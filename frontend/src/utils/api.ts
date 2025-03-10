import { User, Loan } from '@/types';

// Define fallback API URL in case environment variable is undefined
const DEFAULT_API_URL = 'http://localhost:5000';

// Ensure the API URL has the correct format
export const API_URL = (() => {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;
  
  // Display warning in development if using the default URL
  if (!process.env.NEXT_PUBLIC_API_URL && process.env.NODE_ENV === 'development') {
    console.warn(
      'Warning: NEXT_PUBLIC_API_URL is not set in your environment variables. ' +
      `Using default API URL: ${DEFAULT_API_URL}`
    );
  }
  
  // Log the configured API URL for debugging
  console.log(`API URL configured as: ${configuredUrl}`);
  
  return configuredUrl;
})();

// Debug utility to log API requests
const logApiRequest = (method: string, endpoint: string, data?: any) => {
  const shouldLog = process.env.NODE_ENV === 'development' || process.env.DEBUG === 'true';
  if (shouldLog) {
    console.log(`API Request: ${method} ${API_URL}${endpoint}`, data ? { data } : '');
  }
};

// Helper function to handle API errors
const handleApiError = async (error: unknown, response?: Response): Promise<string> => {
  console.error('API Error:', error);
  
  // If we have a response object, try to get more detailed error information
  if (response) {
    try {
      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        return errorData.message || 'Server error with JSON response';
      } else {
        // If not JSON, get the text content for debugging
        const textContent = await response.text();
        console.error('Non-JSON response:', textContent.substring(0, 200) + '...');
        return `Server returned non-JSON response (${response.status}): ${response.statusText}`;
      }
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      return `Failed to parse server response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`;
    }
  }
  
  // Handle axios-style errors
  if (
    error && 
    typeof error === 'object' && 
    'response' in error && 
    error.response && 
    typeof error.response === 'object' && 
    'data' in error.response && 
    error.response.data && 
    typeof error.response.data === 'object' && 
    'message' in error.response.data
  ) {
    return error.response.data.message as string;
  }
  
  return error instanceof Error ? error.message : 'An unexpected error occurred';
};

// Auth API calls
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const endpoint = '/api/users/login';
    logApiRequest('POST', endpoint, { email });
    
    console.log(`Attempting login for ${email} to ${API_URL}${endpoint}`);
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log(`Login response status: ${response.status}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Invalid server response' }));
      console.error('Login failed:', errorData);
      throw new Error(errorData.message || `Login failed with status ${response.status}`);
    }

    const user = await response.json().catch(() => {
      console.error('Failed to parse login response as JSON');
      throw new Error('Invalid response format from server');
    });
    
    console.log('Login successful, user data received:', {
      id: user._id,
      email: user.email,
      hasToken: !!user.token
    });
    
    if (!user.token) {
      console.error('No token received from server');
      throw new Error('Authentication failed: No token received');
    }
    
    // Store user data in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      
      // Also save token separately for easier access
      if (user.token) {
        console.log(`Saving token to localStorage (length: ${user.token.length})`);
        localStorage.setItem('token', user.token);
        
        // Redundant storage in sessionStorage as backup
        sessionStorage.setItem('token', user.token);
      } else {
        console.warn('Login successful but no token received from server');
      }
    }
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    const errorMessage = await handleApiError(error);
    throw new Error(errorMessage);
  }
};

export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  try {
    const endpoint = '/api/users';
    logApiRequest('POST', endpoint, { name, email });
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    const errorMessage = await handleApiError(error);
    throw new Error(errorMessage);
  }
};

export const getUserProfile = async (token: string): Promise<User> => {
  try {
    const endpoint = '/api/users/profile';
    logApiRequest('GET', endpoint);
    console.log('Fetching user profile with token starting with:', token.substring(0, 10) + '...');
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Profile response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'No JSON response' }));
      console.error('Profile fetch error:', errorData);
      throw new Error(errorData.message || 'Failed to fetch user profile');
    }

    const userData = await response.json();
    console.log('User profile fetched successfully:', userData.email);
    return userData;
  } catch (error) {
    console.error('Profile fetch exception:', error);
    const errorMessage = await handleApiError(error);
    throw new Error(errorMessage);
  }
};

// Loan API calls
export const applyForLoan = async (
  token: string,
  loanData: { 
    amount: number; 
    purpose: string; 
    term: number; 
    collateral: string;
    collateralValue: number;
  }
): Promise<Loan> => {
  try {
    const endpoint = '/api/loans';
    logApiRequest('POST', endpoint, loanData);
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(loanData),
    });

    if (!response.ok) {
      const errorMessage = await handleApiError(null, response);
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    const errorMessage = await handleApiError(error);
    throw new Error(errorMessage);
  }
};

export const createLoan = async (
  token: string,
  loanData: { amount: number; interestRate: number; term: number; purpose: string }
): Promise<Loan> => {
  try {
    const endpoint = '/api/loans';
    logApiRequest('POST', endpoint, loanData);
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(loanData),
    });

    if (!response.ok) {
      const errorMessage = await handleApiError(null, response);
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    const errorMessage = await handleApiError(error);
    throw new Error(errorMessage);
  }
};

export const getLoans = async (token: string): Promise<Loan[]> => {
  try {
    const endpoint = '/api/loans';
    logApiRequest('GET', endpoint);
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await handleApiError(null, response);
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    const errorMessage = await handleApiError(error);
    throw new Error(errorMessage);
  }
};

export const getLoanById = async (token: string, id: string): Promise<Loan> => {
  try {
    const endpoint = `/api/loans/${id}`;
    logApiRequest('GET', endpoint);
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await handleApiError(null, response);
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    const errorMessage = await handleApiError(error);
    throw new Error(errorMessage);
  }
};

export const updateLoanStatus = async (
  token: string,
  id: string,
  status: string,
  startDate?: Date,
  endDate?: Date
): Promise<Loan> => {
  try {
    const endpoint = `/api/loans/${id}`;
    logApiRequest('PUT', endpoint, { status, startDate, endDate });
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, startDate, endDate }),
    });

    if (!response.ok) {
      const errorMessage = await handleApiError(null, response);
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    const errorMessage = await handleApiError(error);
    throw new Error(errorMessage);
  }
}; 