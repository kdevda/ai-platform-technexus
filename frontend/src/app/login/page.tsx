'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const { state, login, clearError } = useAuth();
  const { isAuthenticated, loading, error } = state;
  const router = useRouter();

  // Clear any local errors when auth state changes
  useEffect(() => {
    if (error) {
      setLocalLoading(false);
    }
  }, [error]);

  // Handle redirect after successful authentication
  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push('/platform/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    clearError();
    setLocalError(null);
    
    // Set local loading state 
    setLocalLoading(true);
    
    try {
      await login(email, password);
      // If login is successful, we'll be redirected by the above useEffect
    } catch (error) {
      console.error('Login error:', error);
      setLocalError(error instanceof Error ? error.message : 'Login failed. Please try again.');
      setLocalLoading(false);
    }
  };

  // Determine if we should show loading state - either from local state or auth context
  const isLoading = localLoading || loading;

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh] bg-grid-black">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black">Login to Technexus</h1>
            <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
          </div>
          
          {/* Show either auth context error or local error */}
          {(error || localError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              <div className="flex justify-between">
                <p>{error || localError}</p>
                <button
                  onClick={() => {
                    clearError();
                    setLocalError(null);
                  }}
                  className="text-sm underline"
                  aria-label="Close error message"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
                required
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-black border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <Link href="/forgot-password" className="text-gray-700 hover:text-black">
                  Forgot your password?
                </Link>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
          
          {/*<div className="mt-8 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-black font-medium hover:underline">
                Register here
              </Link>
            </p>
          </div>*/}
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage; 