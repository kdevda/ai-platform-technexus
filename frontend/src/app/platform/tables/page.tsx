'use client';

import React, { useState, useEffect } from 'react';
import PlatformLayout from '@/components/platform/PlatformLayout';
import Link from 'next/link';

interface Table {
  id: string;
  name: string;
  description: string;
  recordCount: number;
  icon: React.ReactNode;
}

const TablesPage: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would fetch from your backend API
        // const response = await axios.get('/api/tables');
        
        // For demo purposes, setting some sample data
        const sampleTables: Table[] = [
          {
            id: '1',
            name: 'Users',
            description: 'User accounts and profiles',
            recordCount: 25,
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )
          },
          {
            id: '2',
            name: 'Applications',
            description: 'Loan applications submitted by users',
            recordCount: 48,
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )
          },
          {
            id: '3',
            name: 'Loans',
            description: 'Active and paid loans',
            recordCount: 32,
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )
          },
          {
            id: '4',
            name: 'Payments',
            description: 'Payment records and transactions',
            recordCount: 156,
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )
          }
        ];
        
        setTables(sampleTables);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tables:', err);
        setLoading(false);
      }
    };
    
    fetchTables();
  }, []);
  
  return (
    <PlatformLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-black">Tables</h1>
            <p className="text-gray-600 mt-1">View and manage your data tables</p>
          </div>
          
          <button 
            className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => console.log('Create Table')}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Table
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tables.map((table) => (
              <Link 
                key={table.id} 
                href={`/platform/tables/${table.id}`}
                className="bg-white rounded-xl shadow hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                <div className="p-6 flex items-start justify-between">
                  <div className="bg-gray-100 p-3 rounded-lg text-gray-800">
                    {table.icon}
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                    {table.recordCount} records
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2 flex-grow">
                  <h3 className="text-lg font-semibold text-black mb-2">{table.name}</h3>
                  <p className="text-gray-600 text-sm">{table.description}</p>
                </div>
                <div className="px-6 py-4 bg-gray-50 text-sm font-medium text-blue-600 flex justify-between items-center border-t border-gray-100">
                  <span>View Table</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PlatformLayout>
  );
};

export default TablesPage; 