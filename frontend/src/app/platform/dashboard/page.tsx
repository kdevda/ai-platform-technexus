'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLoan } from '@/context/LoanContext';
import PlatformLayout from '@/components/platform/PlatformLayout';
import Link from 'next/link';
import axios from 'axios';

// Interfaces
interface Application {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  amount?: string;
}

// AI Chat Widget Component
const AIChatWidget = ({ messages, input, setInput, handleSubmit }: {
  messages: Array<{ sender: string; text: string; }>;
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Mobile version (bubble)
  const MobileChat = () => (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-xl w-80 flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-black text-white p-4 flex justify-between items-center rounded-t-xl">
            <h3 className="font-medium">Technexus AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 p-4 max-h-80 bg-white">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-xl px-4 py-2 max-w-3/4 ${
                  msg.sender === 'user' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-200 text-black'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-l-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
              autoFocus
              onClick={(e) => e.currentTarget.focus()}
            />
            <button 
              type="submit" 
              className="bg-black text-white px-4 py-2 rounded-r-xl hover:bg-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile bubble chat */}
      <MobileChat />
    </>
  );
};

const PlatformDashboard: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: loanState, getLoans } = useLoan();
  const { user } = authState;
  const { loans, loading: loanLoading } = loanState;
  
  // Add state for applications
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [newApplication, setNewApplication] = useState<{name: string; amount?: string}>({
    name: '',
    amount: '',
  });
  
  // Add state for mock loans
  const [mockLoans, setMockLoans] = useState<any[]>([]);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'How can I assist you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  
  // Handle chat submit
  const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Add user message
    setChatMessages([...chatMessages, { sender: 'user', text: chatInput }]);
    setChatInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: 'ai', 
        text: "I'm your Technexus AI assistant. I'm here to help with any questions about your loans or the platform." 
      }]);
    }, 1000);
  };
  
  // Chat content component
  const ChatContent = () => (
    <>
      <div className="flex-1 p-4 flex-grow bg-white h-full" style={{ minHeight: "200px", height: "calc(100% - 74px)" }}>
        {chatMessages.map((msg, index) => (
          <div key={index} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-xl px-4 py-2 max-w-3/4 ${
              msg.sender === 'user' 
                ? 'bg-black text-white' 
                : 'bg-gray-200 text-black'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleChatSubmit} className="border-t border-gray-200 p-4 flex">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-l-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
          autoFocus
          onClick={(e) => e.currentTarget.focus()}
        />
        <button 
          type="submit" 
          className="bg-black text-white px-4 py-2 rounded-r-xl hover:bg-gray-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>
    </>
  );
  
  useEffect(() => {
    // Only fetch loans once when the component mounts
    getLoans();
    
    // Fetch applications
    const fetchApplications = async () => {
      setLoadingApplications(true);
      try {
        const res = await axios.get('/api/applications');
        setApplications(res.data);
      } catch (error: any) {
        // Don't log 404 errors as they're expected when endpoint doesn't exist
        if (error.response && error.response.status === 404) {
          console.log('Using mock application data - API endpoint not implemented yet');
          // Provide mock data
          setApplications([
            { id: '1', name: 'Home Loan Application', createdAt: '2023-03-01T12:00:00Z', updatedAt: '2023-03-01T12:00:00Z' },
            { id: '2', name: 'Business Expansion Loan', createdAt: '2023-02-25T10:30:00Z', updatedAt: '2023-02-25T10:30:00Z' },
            { id: '3', name: 'Personal Loan Request', createdAt: '2023-02-20T15:45:00Z', updatedAt: '2023-02-20T15:45:00Z' },
            { id: '4', name: 'Education Loan', createdAt: '2023-02-15T09:15:00Z', updatedAt: '2023-02-15T09:15:00Z' },
            { id: '5', name: 'Vehicle Financing', createdAt: '2023-02-10T11:20:00Z', updatedAt: '2023-02-10T11:20:00Z' },
          ]);
        } else {
          setApplications([]);
        }
      } finally {
        setLoadingApplications(false);
      }
    };
    
    fetchApplications();
    
    // Set mock loan data if loans array is empty
    const mockLoanData = [
      { 
        _id: 'm1', 
        amount: 15000, 
        purpose: 'Home Renovation', 
        status: 'approved', 
        createdAt: '2023-03-05T12:00:00Z',
        user: { _id: user?._id || '' },
        interestRate: 5.5,
        term: 36,
        collateral: 'Property',
        collateralValue: 150000,
        startDate: '2023-03-10T00:00:00Z',
        endDate: '2026-03-10T00:00:00Z',
        updatedAt: '2023-03-05T12:00:00Z'
      },
      { 
        _id: 'm2', 
        amount: 25000, 
        purpose: 'Business Investment', 
        status: 'active', 
        createdAt: '2023-02-28T10:30:00Z',
        user: { _id: user?._id || '' },
        interestRate: 6.2,
        term: 48,
        collateral: 'Business Assets',
        collateralValue: 75000,
        startDate: '2023-03-15T00:00:00Z',
        endDate: '2027-03-15T00:00:00Z',
        updatedAt: '2023-02-28T10:30:00Z'
      },
      { 
        _id: 'm3', 
        amount: 5000, 
        purpose: 'Education Expenses', 
        status: 'pending', 
        createdAt: '2023-02-20T15:45:00Z',
        user: { _id: user?._id || '' },
        interestRate: 4.8,
        term: 24,
        collateral: 'None',
        collateralValue: 0,
        startDate: '',
        endDate: '',
        updatedAt: '2023-02-20T15:45:00Z'
      },
      { 
        _id: 'm4', 
        amount: 10000, 
        purpose: 'Vehicle Purchase', 
        status: 'active', 
        createdAt: '2023-02-15T09:15:00Z',
        user: { _id: user?._id || '' },
        interestRate: 5.9,
        term: 60,
        collateral: 'Vehicle',
        collateralValue: 18000,
        startDate: '2023-03-01T00:00:00Z',
        endDate: '2028-03-01T00:00:00Z',
        updatedAt: '2023-02-15T09:15:00Z'
      },
    ];
    
    setMockLoans(mockLoanData);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Handle application submission
  const handleApplicationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // For demo, just add to local state
      const newApp: Application = {
        id: Date.now().toString(),
        name: newApplication.name,
        amount: newApplication.amount,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setApplications([newApp, ...applications]);
      setShowApplicationModal(false);
      setNewApplication({ name: '', amount: '' });
      
      // In real implementation, would call API here
      // await axios.post('/api/applications', newApplication);
    } catch (error) {
      console.error('Error creating application:', error);
    }
  };

  // Calculate loan statistics
  const activeLoans = loans.filter((loan) => loan.status === 'active').length;
  const approvedLoans = loans.filter((loan) => loan.status === 'approved').length;
  const pendingLoans = loans.filter((loan) => loan.status === 'pending').length;
  
  // Calculate total loan amount
  const totalLoanAmount = loans.reduce((total, loan) => total + loan.amount, 0);

  // Add a state for Today's Activities
  const [activities, setActivities] = useState([
    { id: 1, type: 'payment', description: 'Payment received for Loan #1234', time: '09:30 AM', status: 'completed' },
    { id: 2, type: 'application', description: 'New application submitted', time: '10:15 AM', status: 'pending' },
    { id: 3, type: 'loan', description: 'Loan #5678 approved', time: '11:45 AM', status: 'completed' },
    { id: 4, type: 'document', description: 'Document verification pending for Loan #9012', time: '01:30 PM', status: 'pending' },
    { id: 5, type: 'message', description: 'New message from John regarding application #3456', time: '02:20 PM', status: 'unread' },
  ]);

  return (
    <PlatformLayout>
      <div className="p-6 pb-8">
        <h1 className="text-2xl font-bold mb-6 text-black">Dashboard</h1>
        
        {/* Main content grid - make space for the chat */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-black text-sm">Total Loan Amount</p>
                    <p className="text-2xl font-bold text-black">${totalLoanAmount.toLocaleString()}</p>
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
                    <p className="text-black text-sm">Active Loans</p>
                    <p className="text-2xl font-bold text-black">{activeLoans}</p>
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
                    <p className="text-black text-sm">Pending Loans</p>
                    <p className="text-2xl font-bold text-black">{pendingLoans}</p>
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
                    <p className="text-black text-sm">Approved Loans</p>
                    <p className="text-2xl font-bold text-black">{approvedLoans}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow mb-8">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-black">Recent Applications</h2>
                <div className="flex space-x-3 items-center">
                  <Link href="/platform/applications" className="text-blue-600 hover:text-blue-800 text-sm">
                    View All
                  </Link>
                  <button
                    onClick={() => setShowApplicationModal(true)}
                    className="text-white hover:bg-gray-800 bg-black px-4 py-2 rounded-lg text-sm flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    New Application
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {applications.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 text-black text-sm leading-normal">
                          <th className="py-3 px-6 text-left rounded-tl-lg">Name</th>
                          <th className="py-3 px-6 text-left">Created</th>
                          <th className="py-3 px-6 text-left rounded-tr-lg">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-black text-sm">
                        {applications.slice(0, 5).map((app, index) => (
                          <tr key={app.id} className={`hover:bg-gray-50 ${index === applications.length - 1 ? 'border-b-0' : 'border-b border-gray-200'}`}>
                            <td className="py-3 px-6">{app.name}</td>
                            <td className="py-3 px-6">
                              {new Date(app.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-6">
                              <Link
                                href={`/platform/applications/${app.id}`}
                                className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-lg"
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
                    <p className="text-black mb-4">You don&apos;t have any applications yet.</p>
                    <button
                      onClick={() => setShowApplicationModal(true)}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                    >
                      Create Your First Application
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Recent Loans */}
            <div className="bg-white rounded-xl shadow mb-8">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-black">Recent Loans</h2>
                <div className="flex space-x-3 items-center">
                  <Link href="/platform/loans" className="text-blue-600 hover:text-blue-800 text-sm">
                    View All
                  </Link>
                  <Link
                    href="/platform/loans/apply"
                    className="text-white hover:bg-gray-800 bg-black px-4 py-2 rounded-lg text-sm flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    New Loan
                  </Link>
                </div>
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
                        <tr className="bg-gray-50 text-black text-sm leading-normal">
                          <th className="py-3 px-6 text-left rounded-tl-lg">Amount</th>
                          <th className="py-3 px-6 text-left">Purpose</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-left rounded-tr-lg">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-black text-sm">
                        {loans.slice(0, 5).map((loan, index) => (
                          <tr key={loan._id} className={`hover:bg-gray-50 ${index === loans.length - 1 || index === 4 ? 'border-b-0' : 'border-b border-gray-200'}`}>
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
                            <td className="py-3 px-6">
                              <Link
                                href={`/platform/loans/${loan._id}`}
                                className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-lg"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : mockLoans.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 text-black text-sm leading-normal">
                          <th className="py-3 px-6 text-left rounded-tl-lg">Amount</th>
                          <th className="py-3 px-6 text-left">Purpose</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-left rounded-tr-lg">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-black text-sm">
                        {mockLoans.slice(0, 5).map((loan, index) => (
                          <tr key={loan._id} className={`hover:bg-gray-50 ${index === mockLoans.length - 1 || index === 4 ? 'border-b-0' : 'border-b border-gray-200'}`}>
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
                            <td className="py-3 px-6">
                              <Link
                                href={`/platform/loans/${loan._id}`}
                                className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-lg"
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
                    <p className="text-black mb-4">You don&apos;t have any loans yet.</p>
                    <Link
                      href="/platform/loans/apply"
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
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
                <h2 className="text-lg font-semibold text-black">Quick Actions</h2>
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
                    <p className="font-medium text-black">Apply for Loan</p>
                    <p className="text-sm text-black">Request a new loan</p>
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
                    <p className="font-medium text-black">Make Payment</p>
                    <p className="text-sm text-black">Pay your loan installment</p>
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
                    <p className="font-medium text-black">Update Profile</p>
                    <p className="text-sm text-black">Manage your account</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          {/* AI Chat Widget - Desktop version embedded in dashboard */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-xl shadow h-full flex flex-col sticky top-6" style={{ maxHeight: "calc(100vh - 340px)" }}>
              <div className="bg-black text-white p-4 flex justify-between items-center rounded-t-xl">
                <h3 className="font-medium">Technexus AI Assistant</h3>
              </div>
              <ChatContent />
            </div>

            {/* Today's Activities Widget */}
            <div className="bg-white rounded-xl shadow mt-6 mb-8">
              <div className="bg-white text-black p-4 flex justify-between items-center rounded-t-xl border-b border-gray-200">
                <h3 className="font-medium">Today's Activities</h3>
              </div>
              <div className="max-h-96" style={{ overflowY: "auto", overflowX: "hidden" }}>
                {activities.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {activities.map((activity) => (
                      <li key={activity.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                            activity.type === 'payment' ? 'bg-green-100 text-green-600' :
                            activity.type === 'application' ? 'bg-blue-100 text-blue-600' :
                            activity.type === 'loan' ? 'bg-purple-100 text-purple-600' :
                            activity.type === 'document' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {activity.type === 'payment' && (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                            {activity.type === 'application' && (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            )}
                            {activity.type === 'loan' && (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            )}
                            {activity.type === 'document' && (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            )}
                            {activity.type === 'message' && (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-black">{activity.description}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                          <div className="ml-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                              activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No activities recorded today</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* New Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-black">New Application</h3>
              <button 
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleApplicationSubmit}>
              <div className="mb-4">
                <label htmlFor="appName" className="block text-sm font-medium text-gray-700 mb-1">
                  Application Name
                </label>
                <input
                  type="text"
                  id="appName"
                  name="appName"
                  value={newApplication.name}
                  onChange={(e) => setNewApplication({...newApplication, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (Optional)
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={newApplication.amount || ''}
                  onChange={(e) => setNewApplication({...newApplication, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Create Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Mobile Chat Widget */}
      <AIChatWidget messages={chatMessages} input={chatInput} setInput={setChatInput} handleSubmit={handleChatSubmit} />
    </PlatformLayout>
  );
};

export default PlatformDashboard; 