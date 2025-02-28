import { User, Loan, Payment } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to handle API errors
const handleApiError = (error: any): string => {
  console.error('API Error:', error);
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return error.message || 'An unexpected error occurred';
};

// Auth API calls
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to login');
    }

    return await response.json();
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to register');
    }

    return await response.json();
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getUserProfile = async (token: string): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get user profile');
    }

    return await response.json();
  } catch (error) {
    throw new Error(handleApiError(error));
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
    const response = await fetch(`${API_URL}/loans/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(loanData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to apply for loan');
    }

    return await response.json();
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const createLoan = async (
  token: string,
  loanData: { amount: number; interestRate: number; term: number; purpose: string }
): Promise<Loan> => {
  try {
    const response = await fetch(`${API_URL}/loans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(loanData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create loan');
    }

    return await response.json();
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getLoans = async (token: string): Promise<Loan[]> => {
  try {
    const response = await fetch(`${API_URL}/loans`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get loans');
    }

    return await response.json();
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getLoanById = async (token: string, id: string): Promise<Loan> => {
  try {
    const response = await fetch(`${API_URL}/loans/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get loan');
    }

    return await response.json();
  } catch (error) {
    throw new Error(handleApiError(error));
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
    const response = await fetch(`${API_URL}/loans/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, startDate, endDate }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update loan status');
    }

    return await response.json();
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}; 