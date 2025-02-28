'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLoan } from '@/context/LoanContext';
import PlatformLayout from '@/components/platform/PlatformLayout';
import Link from 'next/link';

const PlatformDashboard: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: loanState, getLoans } = useLoan();
  const { user } = authState;
  const { loans, loading: loanLoading } = loanState;

  useEffect(() => {
    getLoans();
  }, [getLoans]);

  // Calculate loan statistics
  const activeLoans = loans.filter((loan) => loan.status === 'active').length;
  const approvedLoans = loans.filter((loan) => loan.status === 'approved').length;
  const pendingLoans = loans.filter((loan) => loan.status === 'pending').length;
  
  // Calculate total loan amount
  const totalLoanAmount = loans.reduce((total, loan) => total + loan.amount, 0);

  return (
    <PlatformLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Loan Amount</p>
                <p className="text-2xl font-bold">${totalLoanAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Active Loans</p>
                <p className="text-2xl font-bold">{activeLoans}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Pending Loans</p>
                <p className="text-2xl font-bold">{pendingLoans}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Approved Loans</p>
                <p className="text-2xl font-bold">{approvedLoans}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Loans */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Loans</h2>
            <Link href="/platform/loans" className="text-blue-600 hover:text-blue-800 text-sm">
              View All
            </Link>
          </div>
          
          <div className="p-6">
            {loanLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : loans.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Amount</th>
                      <th className="py-3 px-6 text-left">Purpose</th>
                      <th className="py-3 px-6 text-left">Status</th>
                      <th className="py-3 px-6 text-left">Term</th>
                      <th className="py-3 px-6 text-left">Created</th>
                      <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {loans.slice(0, 5).map((loan) => (
                      <tr key={loan._id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6">
                          ${loan.amount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="py-3 px-6">{loan.purpose}</td>
                        <td className="py-3 px-6">
                          <span
                            className={`py-1 px-3 rounded-full text-xs ${
                              loan.status === 'approved'
                                ? 'bg-green-200 text-green-800'
                                : loan.status === 'pending'
                                ? 'bg-yellow-200 text-yellow-800'
                                : loan.status === 'active'
                                ? 'bg-blue-200 text-blue-800'
                                : loan.status === 'rejected'
                                ? 'bg-red-200 text-red-800'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                          >
                            {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-6">{loan.term} months</td>
                        <td className="py-3 px-6">
                          {new Date(loan.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-6">
                          <Link
                            href={`/platform/loans/${loan._id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You don&apos;t have any loans yet.</p>
                <Link
                  href="/platform/loans/apply"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Apply for Your First Loan
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/platform/loans/apply" 
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              <div className="p-2 rounded-full bg-blue-100 text-blue-500 mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Apply for Loan</p>
                <p className="text-sm text-gray-500">Request a new loan</p>
              </div>
            </Link>
            
            <Link 
              href="/platform/payments" 
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100"
            >
              <div className="p-2 rounded-full bg-green-100 text-green-500 mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Make Payment</p>
                <p className="text-sm text-gray-500">Pay your loan installment</p>
              </div>
            </Link>
            
            <Link 
              href="/platform/profile" 
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100"
            >
              <div className="p-2 rounded-full bg-purple-100 text-purple-500 mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Update Profile</p>
                <p className="text-sm text-gray-500">Manage your account</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
};

export default PlatformDashboard; 