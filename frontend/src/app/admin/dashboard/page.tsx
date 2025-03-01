'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLoan } from '@/context/LoanContext';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const AdminDashboard: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: loanState, getLoans } = useLoan();
  const { isAuthenticated, user, loading: authLoading } = authState;
  const { loans, loading: loanLoading } = loanState;
  const router = useRouter();
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    } else if (!authLoading && isAuthenticated && user?.role !== 'admin') {
      router.push('/platform/dashboard');
    }
  }, [authLoading, isAuthenticated, router, user]);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      getLoans();
    }
  }, [isAuthenticated, user, getLoans]);

  const filteredLoans = () => {
    if (filter === 'all') {
      return loans;
    }
    return loans.filter((loan) => loan.status === filter);
  };

  const getStatusCount = (status: string) => {
    return loans.filter((loan) => loan.status === status).length;
  };

  if (authLoading || !isAuthenticated || user?.role !== 'admin') {
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
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-gray-600 mb-6">
            Manage loan applications and monitor loan statuses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div 
              onClick={() => setFilter('all')}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                filter === 'all' 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <h2 className="font-semibold text-lg mb-2">All Loans</h2>
              <p className="text-3xl font-bold">{loans.length}</p>
            </div>
            <div 
              onClick={() => setFilter('pending')}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                filter === 'pending' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-yellow-50 hover:bg-yellow-100'
              }`}
            >
              <h2 className="font-semibold text-lg mb-2">Pending</h2>
              <p className={`text-3xl font-bold ${filter !== 'pending' ? 'text-yellow-600' : ''}`}>
                {getStatusCount('pending')}
              </p>
            </div>
            <div 
              onClick={() => setFilter('approved')}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                filter === 'approved' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-50 hover:bg-green-100'
              }`}
            >
              <h2 className="font-semibold text-lg mb-2">Approved</h2>
              <p className={`text-3xl font-bold ${filter !== 'approved' ? 'text-green-600' : ''}`}>
                {getStatusCount('approved')}
              </p>
            </div>
            <div 
              onClick={() => setFilter('active')}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                filter === 'active' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-50 hover:bg-blue-100'
              }`}
            >
              <h2 className="font-semibold text-lg mb-2">Active</h2>
              <p className={`text-3xl font-bold ${filter !== 'active' ? 'text-blue-600' : ''}`}>
                {getStatusCount('active')}
              </p>
            </div>
            <div 
              onClick={() => setFilter('closed')}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                filter === 'closed' 
                  ? 'bg-gray-600 text-white' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <h2 className="font-semibold text-lg mb-2">Closed</h2>
              <p className={`text-3xl font-bold ${filter !== 'closed' ? 'text-gray-600' : ''}`}>
                {getStatusCount('closed')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {filter === 'all' ? 'All Loans' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Loans`}
            </h2>
          </div>

          {loanLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredLoans().length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">User</th>
                    <th className="py-3 px-6 text-left">Amount</th>
                    <th className="py-3 px-6 text-left">Purpose</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Created</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {filteredLoans().map((loan) => (
                    <tr key={loan._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 font-medium">
                        {loan._id.substring(0, 8)}...
                      </td>
                      <td className="py-3 px-6">
                        {loan.user.substring(0, 8)}...
                      </td>
                      <td className="py-3 px-6">
                        ${loan.amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="py-3 px-6">
                        {loan.purpose.length > 30
                          ? `${loan.purpose.substring(0, 30)}...`
                          : loan.purpose}
                      </td>
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
              <p className="text-gray-500">No loans found with the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard; 