export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  roles?: string[];
  token?: string;
  phone?: string;
  address?: string;
}

export interface Loan {
  _id: string;
  user: string;
  amount: number;
  interestRate: number;
  term: number;
  purpose: string;
  collateral?: string;
  collateralValue?: number;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'closed';
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  _id: string;
  loan: string;
  user: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'credit_card' | 'debit_card' | 'bank_transfer' | 'cash' | 'other';
  status: 'pending' | 'completed' | 'failed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoanState {
  loans: Loan[];
  currentLoan: Loan | null;
  loading: boolean;
  error: string | null;
}

export interface PaymentState {
  payments: Payment[];
  loading: boolean;
  error: string | null;
} 