'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLoan } from '@/context/LoanContext';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const LoanDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const loanId = params.id as string;
  const { state: authState } = useAuth();
  const { state: loanState, getLoan, updateLoan } = useLoan();
  const { isAuthenticated, user, loading: authLoading } = authState;
  const { currentLoan, loading: loanLoading, error } = loanState;
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated && loanId) {
      getLoan(loanId);
    }
  }, [isAuthenticated, loanId, getLoan]);

  const handleStatusUpdate = async (status: string) => {
    if (!currentLoan) return;
    
    setIsUpdating(true);
    try {
      await updateLoan(currentLoan._id, status);
      setIsUpdating(false);
    } catch (error) {
      console.error('Error updating loan status:', error);
      setIsUpdating(false);
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

  if (loanLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </Layout>
    );
  }

  if (!currentLoan) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            Loan not found
          </div>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </Layout>
    );
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'approved':
        return 'bg-green-200 text-green-800';
      case 'active':
        return 'bg-blue-200 text-blue-800';
      case 'rejected':
        return 'bg-red-200 text-red-800';
      case 'closed':
        return 'bg-gray-200 text-gray-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isAdmin = user?.role === 'admin';

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard" className="text-blue-600 hover:underline flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Loan Details</h1>
              <span
                className={`py-1 px-3 rounded-full text-xs ${getStatusBadgeClass(currentLoan.status)}`}
              >
                {currentLoan.status.charAt(0).toUpperCase() + currentLoan.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Loan Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Loan ID</p>
                    <p className="font-medium">{currentLoan._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium text-xl">
                      ${currentLoan.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Purpose</p>
                    <p className="font-medium">{currentLoan.purpose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Term</p>
                    <p className="font-medium">{currentLoan.term} months</p>
                  </div>
                  {currentLoan.interestRate && (
                    <div>
                      <p className="text-sm text-gray-500">Interest Rate</p>
                      <p className="font-medium">{currentLoan.interestRate}%</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Dates & Status</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Application Date</p>
                    <p className="font-medium">{formatDate(currentLoan.createdAt)}</p>
                  </div>
                  {currentLoan.startDate && (
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">{formatDate(currentLoan.startDate)}</p>
                    </div>
                  )}
                  {currentLoan.endDate && (
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium">{formatDate(currentLoan.endDate)}</p>
                    </div>
                  )}
                  {currentLoan.collateral && (
                    <div>
                      <p className="text-sm text-gray-500">Collateral</p>
                      <p className="font-medium">{currentLoan.collateral}</p>
                    </div>
                  )}
                  {currentLoan.collateralValue && (
                    <div>
                      <p className="text-sm text-gray-500">Collateral Value</p>
                      <p className="font-medium">
                        ${currentLoan.collateralValue.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isAdmin && currentLoan.status === 'pending' && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Admin Actions</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleStatusUpdate('approved')}
                    disabled={isUpdating}
                    className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                      isUpdating ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isUpdating ? 'Processing...' : 'Approve Loan'}
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('rejected')}
                    disabled={isUpdating}
                    className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                      isUpdating ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isUpdating ? 'Processing...' : 'Reject Loan'}
                  </button>
                </div>
              </div>
            )}

            {isAdmin && currentLoan.status === 'approved' && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Admin Actions</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleStatusUpdate('active')}
                    disabled={isUpdating}
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isUpdating ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isUpdating ? 'Processing...' : 'Activate Loan'}
                  </button>
                </div>
              </div>
            )}

            {isAdmin && currentLoan.status === 'active' && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Admin Actions</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleStatusUpdate('closed')}
                    disabled={isUpdating}
                    className={`px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
                      isUpdating ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isUpdating ? 'Processing...' : 'Close Loan'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoanDetailPage; 