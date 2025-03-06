'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { LoanProvider } from '@/context/LoanContext';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <LoanProvider>{children}</LoanProvider>
    </AuthProvider>
  );
};

export default Providers; 