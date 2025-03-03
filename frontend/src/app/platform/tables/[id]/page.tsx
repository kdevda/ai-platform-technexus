'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PlatformLayout from '@/components/platform/PlatformLayout';
import Link from 'next/link';
import axios from 'axios';

// Interfaces
interface TableRecord {
  id: string;
  [key: string]: any;
}

interface TableInfo {
  id: string;
  name: string;
  description?: string;
}

const TableView: React.FC = () => {
  const params = useParams();
  const tableId = params.id as string;
  
  const [tableInfo, setTableInfo] = useState<TableInfo | null>(null);
  const [records, setRecords] = useState<TableRecord[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real app, this would fetch from your backend API
        // const tableResponse = await axios.get(`/api/tables/${tableId}`);
        // const recordsResponse = await axios.get(`/api/tables/${tableId}/records`);
        
        // For demo purposes, setting some sample data based on tableId
        let sampleTableInfo: TableInfo;
        let sampleRecords: TableRecord[] = [];
        let sampleColumns: string[] = [];
        
        switch(tableId) {
          case '1': // Users
            sampleTableInfo = { id: '1', name: 'Users', description: 'User accounts' };
            sampleColumns = ['id', 'name', 'email', 'role', 'created'];
            sampleRecords = [
              { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', created: '2023-01-15' },
              { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', created: '2023-02-20' },
              { id: '3', name: 'Michael Johnson', email: 'michael@example.com', role: 'User', created: '2023-03-05' },
              { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'Manager', created: '2023-04-10' },
              { id: '5', name: 'David Brown', email: 'david@example.com', role: 'User', created: '2023-05-25' },
            ];
            break;
          case '2': // Applications
            sampleTableInfo = { id: '2', name: 'Applications', description: 'Loan applications' };
            sampleColumns = ['id', 'name', 'amount', 'status', 'submitted'];
            sampleRecords = [
              { id: '1', name: 'Home Loan', amount: '$250,000', status: 'Approved', submitted: '2023-06-10' },
              { id: '2', name: 'Auto Loan', amount: '$35,000', status: 'Pending', submitted: '2023-07-15' },
              { id: '3', name: 'Business Loan', amount: '$100,000', status: 'Rejected', submitted: '2023-08-20' },
              { id: '4', name: 'Personal Loan', amount: '$15,000', status: 'Approved', submitted: '2023-09-25' },
              { id: '5', name: 'Education Loan', amount: '$50,000', status: 'Pending', submitted: '2023-10-30' },
            ];
            break;
          case '3': // Loans
            sampleTableInfo = { id: '3', name: 'Loans', description: 'Active loans' };
            sampleColumns = ['id', 'type', 'amount', 'interest', 'term', 'status'];
            sampleRecords = [
              { id: '1', type: 'Mortgage', amount: '$320,000', interest: '3.5%', term: '30 years', status: 'Active' },
              { id: '2', type: 'Auto', amount: '$28,000', interest: '4.2%', term: '5 years', status: 'Active' },
              { id: '3', type: 'Personal', amount: '$12,000', interest: '6.9%', term: '3 years', status: 'Paid' },
              { id: '4', type: 'Business', amount: '$75,000', interest: '5.1%', term: '10 years', status: 'Active' },
              { id: '5', type: 'Student', amount: '$45,000', interest: '2.8%', term: '15 years', status: 'Active' },
            ];
            break;
          case '4': // Payments
            sampleTableInfo = { id: '4', name: 'Payments', description: 'Payment records' };
            sampleColumns = ['id', 'loanId', 'amount', 'date', 'method', 'status'];
            sampleRecords = [
              { id: '1', loanId: 'L-1001', amount: '$1,250', date: '2023-11-01', method: 'ACH', status: 'Completed' },
              { id: '2', loanId: 'L-1002', amount: '$450', date: '2023-11-05', method: 'Credit Card', status: 'Completed' },
              { id: '3', loanId: 'L-1001', amount: '$1,250', date: '2023-12-01', method: 'ACH', status: 'Pending' },
              { id: '4', loanId: 'L-1003', amount: '$350', date: '2023-11-15', method: 'Bank Transfer', status: 'Completed' },
              { id: '5', loanId: 'L-1004', amount: '$780', date: '2023-11-22', method: 'Check', status: 'Completed' },
            ];
            break;
          default:
            sampleTableInfo = { id: tableId, name: 'Unknown Table', description: 'Table not found' };
            sampleColumns = ['id', 'name'];
            sampleRecords = [];
        }
        
        setTableInfo(sampleTableInfo);
        setColumns(sampleColumns);
        setRecords(sampleRecords);
      } catch (err) {
        console.error('Error fetching table data:', err);
        setError('Failed to load table data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTableData();
  }, [tableId]);
  
  if (loading) {
    return (
      <PlatformLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      </PlatformLayout>
    );
  }
  
  if (error || !tableInfo) {
    return (
      <PlatformLayout>
        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-700">{error || 'Table not found'}</p>
          <Link href="/platform/dashboard" className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-lg">
            Return to Dashboard
          </Link>
        </div>
      </PlatformLayout>
    );
  }
  
  return (
    <PlatformLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-black">{tableInfo.name}</h1>
            {tableInfo.description && (
              <p className="text-gray-600 mt-1">{tableInfo.description}</p>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button 
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center"
              onClick={() => console.log('Export')}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
            
            <button 
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={() => console.log('Add New')}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New
            </button>
          </div>
        </div>
        
        {records.length > 0 ? (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 text-black text-sm leading-normal">
                    {columns.map((column, index) => (
                      <th 
                        key={column} 
                        className={`py-3 px-6 text-left font-semibold ${
                          index === 0 ? 'rounded-tl-lg' : ''
                        } ${
                          index === columns.length - 1 ? 'rounded-tr-lg' : ''
                        }`}
                      >
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                      </th>
                    ))}
                    <th className="py-3 px-6 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-black text-sm">
                  {records.map((record, recordIndex) => (
                    <tr 
                      key={record.id} 
                      className={`hover:bg-gray-50 ${
                        recordIndex === records.length - 1 ? 'border-b-0' : 'border-b border-gray-200'
                      }`}
                    >
                      {columns.map((column) => (
                        <td key={`${record.id}-${column}`} className="py-3 px-6">
                          {record[column]}
                        </td>
                      ))}
                      <td className="py-3 px-6">
                        <div className="flex space-x-2">
                          <button 
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded-lg text-xs"
                            onClick={() => console.log(`View ${record.id}`)}
                          >
                            View
                          </button>
                          <button 
                            className="text-green-600 hover:text-green-900 bg-green-50 px-2 py-1 rounded-lg text-xs"
                            onClick={() => console.log(`Edit ${record.id}`)}
                          >
                            Edit
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded-lg text-xs"
                            onClick={() => console.log(`Delete ${record.id}`)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
              <div className="text-gray-600 text-sm">
                Showing <span className="font-semibold">{records.length}</span> of <span className="font-semibold">{records.length}</span> records
              </div>
              
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No records found</h3>
            <p className="text-gray-500 mb-6">This table doesn't have any records yet.</p>
            <button 
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center mx-auto"
              onClick={() => console.log('Add First Record')}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add First Record
            </button>
          </div>
        )}
      </div>
    </PlatformLayout>
  );
};

export default TableView; 