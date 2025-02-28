'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLoan } from '@/context/LoanContext';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const Dashboard: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: loanState, getLoans } = useLoan();
  const { isAuthenticated, user, loading: authLoading } = authState;
  const { loans, loading: loanLoading } = loanState;
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      getLoans();
    }
  }, [isAuthenticated, getLoans]);

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
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h1>
          <p className="text-gray-600 mb-6">
            Manage your loans and track your financial progress all in one place.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="font-semibold text-lg mb-2">Active Loans</h2>
              <p className="text-3xl font-bold text-blue-600">
                {loans.filter((loan) => loan.status === 'active').length}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h2 className="font-semibold text-lg mb-2">Approved Loans</h2>
              <p className="text-3xl font-bold text-green-600">
                {loans.filter((loan) => loan.status === 'approved').length}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h2 className="font-semibold text-lg mb-2">Pending Loans</h2>
              <p className="text-3xl font-bold text-yellow-600">
                {loans.filter((loan) => loan.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Your Loans</h2>
            <Link
              href="/loans/apply"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Apply for a Loan
            </Link>
          </div>

          {loanLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : loans.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Amount</th>
                    <th className="py-3 px-6 text-left">Purpose</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Term</th>
                    <th className="py-3 px-6 text-left">Created</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {loans.map((loan) => (
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
                          href={`/loans/${loan._id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
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
                href="/loans/apply"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Apply for Your First Loan
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 