import React, { createContext, useContext, useReducer } from 'react';
import { Loan, LoanState } from '@/types';
import * as api from '@/utils/api';
import { useAuth } from './AuthContext';

// Define action types
type LoanAction =
  | { type: 'LOAN_REQUEST' }
  | { type: 'GET_LOANS_SUCCESS'; payload: Loan[] }
  | { type: 'GET_LOAN_SUCCESS'; payload: Loan }
  | { type: 'CREATE_LOAN_SUCCESS'; payload: Loan }
  | { type: 'UPDATE_LOAN_SUCCESS'; payload: Loan }
  | { type: 'LOAN_FAIL'; payload: string }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: LoanState = {
  loans: [],
  currentLoan: null,
  loading: false,
  error: null,
};

// Create context
const LoanContext = createContext<{
  state: LoanState;
  getLoans: () => Promise<void>;
  getLoan: (id: string) => Promise<void>;
  submitLoan: (loanData: {
    amount: number;
    interestRate: number;
    term: number;
    purpose: string;
  }) => Promise<void>;
  applyForLoan: (loanData: {
    amount: number;
    purpose: string;
    term: number;
    collateral: string;
    collateralValue: number;
  }) => Promise<void>;
  updateLoan: (id: string, status: string, startDate?: Date, endDate?: Date) => Promise<void>;
  clearError: () => void;
}>({
  state: initialState,
  getLoans: async () => {},
  getLoan: async () => {},
  submitLoan: async () => {},
  applyForLoan: async () => {},
  updateLoan: async () => {},
  clearError: () => {},
});

// Reducer function
const loanReducer = (state: LoanState, action: LoanAction): LoanState => {
  switch (action.type) {
    case 'LOAN_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_LOANS_SUCCESS':
      return {
        ...state,
        loans: action.payload,
        loading: false,
        error: null,
      };
    case 'GET_LOAN_SUCCESS':
      return {
        ...state,
        currentLoan: action.payload,
        loading: false,
        error: null,
      };
    case 'CREATE_LOAN_SUCCESS':
      return {
        ...state,
        loans: [...state.loans, action.payload],
        currentLoan: action.payload,
        loading: false,
        error: null,
      };
    case 'UPDATE_LOAN_SUCCESS':
      return {
        ...state,
        loans: state.loans.map((loan) =>
          loan._id === action.payload._id ? action.payload : loan
        ),
        currentLoan: action.payload,
        loading: false,
        error: null,
      };
    case 'LOAN_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
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
export const LoanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(loanReducer, initialState);
  const { state: authState } = useAuth();

  // Get all loans
  const getLoans = async () => {
    if (!authState.user?.token) return;

    try {
      dispatch({ type: 'LOAN_REQUEST' });
      const loans = await api.getLoans(authState.user.token);
      dispatch({ type: 'GET_LOANS_SUCCESS', payload: loans });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({ type: 'LOAN_FAIL', payload: errorMessage });
    }
  };

  // Get a single loan by ID
  const getLoan = async (id: string) => {
    if (!authState.user?.token) return;

    try {
      dispatch({ type: 'LOAN_REQUEST' });
      const loan = await api.getLoanById(authState.user.token, id);
      dispatch({ type: 'GET_LOAN_SUCCESS', payload: loan });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({ type: 'LOAN_FAIL', payload: errorMessage });
    }
  };

  // Submit a new loan application
  const submitLoan = async (loanData: {
    amount: number;
    interestRate: number;
    term: number;
    purpose: string;
  }) => {
    if (!authState.user?.token) return;

    try {
      dispatch({ type: 'LOAN_REQUEST' });
      const loan = await api.createLoan(authState.user.token, loanData);
      dispatch({ type: 'CREATE_LOAN_SUCCESS', payload: loan });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({ type: 'LOAN_FAIL', payload: errorMessage });
    }
  };

  // Apply for a loan (user)
  const applyForLoan = async (loanData: {
    amount: number;
    purpose: string;
    term: number;
    collateral: string;
    collateralValue: number;
  }) => {
    if (!authState.user?.token) return;

    try {
      dispatch({ type: 'LOAN_REQUEST' });
      const loan = await api.applyForLoan(authState.user.token, loanData);
      dispatch({ type: 'CREATE_LOAN_SUCCESS', payload: loan });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({ type: 'LOAN_FAIL', payload: errorMessage });
    }
  };

  // Update loan status (admin only)
  const updateLoan = async (id: string, status: string, startDate?: Date, endDate?: Date) => {
    if (!authState.user?.token) return;

    try {
      dispatch({ type: 'LOAN_REQUEST' });
      const loan = await api.updateLoanStatus(authState.user.token, id, status, startDate, endDate);
      dispatch({ type: 'UPDATE_LOAN_SUCCESS', payload: loan });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({ type: 'LOAN_FAIL', payload: errorMessage });
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <LoanContext.Provider
      value={{
        state,
        getLoans,
        getLoan,
        submitLoan,
        applyForLoan,
        updateLoan,
        clearError,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};

// Custom hook to use loan context
export const useLoan = () => useContext(LoanContext); 