'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLoan } from '@/context/LoanContext';
import Layout from '@/components/layout/Layout';

const LoanApplicationPage: React.FC = () => {
  const { state: authState } = useAuth();
  const { applyForLoan } = useLoan();
  const { isAuthenticated, loading: authLoading } = authState;
  const router = useRouter();
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    term: '12',
    collateral: '',
    collateralValue: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid loan amount';
    }
    
    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Please specify the purpose of the loan';
    }
    
    if (!formData.term || isNaN(Number(formData.term)) || Number(formData.term) <= 0) {
      newErrors.term = 'Please select a valid loan term';
    }
    
    if (!formData.collateral.trim()) {
      newErrors.collateral = 'Please specify collateral for the loan';
    }
    
    if (!formData.collateralValue || isNaN(Number(formData.collateralValue)) || Number(formData.collateralValue) <= 0) {
      newErrors.collateralValue = 'Please enter a valid collateral value';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await applyForLoan({
        amount: Number(formData.amount),
        purpose: formData.purpose,
        term: Number(formData.term),
        collateral: formData.collateral,
        collateralValue: Number(formData.collateralValue),
      });
      
      router.push('/platform/dashboard');
    } catch (error) {
      console.error('Error applying for loan:', error);
      setErrors({ submit: 'Failed to submit loan application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || !isAuthenticated) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6">Apply for a Loan</h1>
          
          {errors.submit && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {errors.submit}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
                Loan Amount ($)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.amount ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="Enter loan amount"
                min="1"
                step="0.01"
              />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="purpose" className="block text-gray-700 font-medium mb-2">
                Loan Purpose
              </label>
              <textarea
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.purpose ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="Describe the purpose of this loan"
                rows={3}
              />
              {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="term" className="block text-gray-700 font-medium mb-2">
                Loan Term (months)
              </label>
              <select
                id="term"
                name="term"
                value={formData.term}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.term ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
              >
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
                <option value="36">36 months</option>
                <option value="48">48 months</option>
                <option value="60">60 months</option>
              </select>
              {errors.term && <p className="text-red-500 text-sm mt-1">{errors.term}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="collateral" className="block text-gray-700 font-medium mb-2">
                Collateral Description
              </label>
              <input
                type="text"
                id="collateral"
                name="collateral"
                value={formData.collateral}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.collateral ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="Describe your collateral (e.g., Vehicle, Property)"
              />
              {errors.collateral && <p className="text-red-500 text-sm mt-1">{errors.collateral}</p>}
            </div>
            
            <div className="mb-8">
              <label htmlFor="collateralValue" className="block text-gray-700 font-medium mb-2">
                Collateral Value ($)
              </label>
              <input
                type="number"
                id="collateralValue"
                name="collateralValue"
                value={formData.collateralValue}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.collateralValue ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="Enter the value of your collateral"
                min="1"
                step="0.01"
              />
              {errors.collateralValue && <p className="text-red-500 text-sm mt-1">{errors.collateralValue}</p>}
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => router.push('/platform/dashboard')}
                className="px-6 py-2 mr-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoanApplicationPage; 