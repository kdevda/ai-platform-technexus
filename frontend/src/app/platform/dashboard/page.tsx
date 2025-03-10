'use client';

import React, { useEffect, useState, Suspense, useMemo, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLoan } from '@/context/LoanContext';
import Link from 'next/link';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { LineChart, BarChart, PieChart } from '@/components/charts';
import { getChartData } from '@/lib/chartData';
import dynamic from 'next/dynamic';
import { Spinner } from '@/components/ui/Spinner';

// Dynamically import the AIAgentWidget to prevent SSR issues
const AIAgentWidget = dynamic(
  () => import('@/components/widgets/AIAgentWidget'),
  { ssr: false }
);

// Chart component that's rendered client-side only
const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return <div className="h-60 flex items-center justify-center"><Spinner /></div>;
  }
  
  return <>{children}</>;
};

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
        <div className="bg-white rounded-xl shadow-2xl w-80 flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-blue-900 text-white p-4 flex justify-between items-center rounded-t-xl">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-medium">Technexus AI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 p-4 max-h-[400px] overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-700">How can I help?</h4>
                <p className="text-sm">Ask me about loans, payments, or applications</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender !== 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex-shrink-0 flex items-center justify-center mr-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  )}
                  <div className={`rounded-2xl px-4 py-2 max-w-[75%] shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-800 border border-gray-100'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center ml-2">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 bg-white">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-full pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                autoFocus
                onClick={(e) => e.currentTarget.focus()}
              />
              <button 
                type="submit" 
                className="absolute right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-900 text-white p-4 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 animate-pulse"
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

// Replace the DashboardCharts component with more useful widgets
const DashboardContent = () => {
  // Get data from the parent component
  const { state: { loans = [] } } = useLoan();
  const { state: { user } } = useAuth();
  const activeLoans = loans.filter((loan) => loan.status === 'active').length;
  const pendingLoans = loans.filter((loan) => loan.status === 'pending').length;
  const totalLoanAmount = loans.reduce((total, loan) => total + (loan.amount || 0), 0);

  // Mock activities data
  const activities = [
    { id: 1, type: 'payment', description: 'Payment received for Loan #1234', time: '09:30 AM', status: 'completed' },
    { id: 2, type: 'application', description: 'New application submitted', time: '10:15 AM', status: 'pending' },
    { id: 3, type: 'loan', description: 'Loan #5678 approved', time: '11:45 AM', status: 'completed' },
    { id: 4, type: 'document', description: 'Document verification pending for Loan #9012', time: '01:30 PM', status: 'pending' },
    { id: 5, type: 'message', description: 'New message from John regarding application #3456', time: '02:20 PM', status: 'unread' },
    { id: 6, type: 'payment', description: 'Upcoming payment reminder for Loan #2345', time: '04:15 PM', status: 'pending' },
    { id: 7, type: 'application', description: 'Application #4567 under review', time: 'Yesterday', status: 'pending' },
    { id: 8, type: 'loan', description: 'Rate change notification for Loan #6789', time: 'Yesterday', status: 'completed' },
  ];

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="loans">Loans</TabsTrigger>
        <TabsTrigger value="applications">Applications</TabsTrigger>
        <TabsTrigger value="activities">Activities</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4 text-black">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Loans
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loans.length}</div>
              <p className="text-xs text-muted-foreground">
                {loans.length > 0 ? '+1 from last month' : 'No loans yet'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Loans
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeLoans}</div>
              <p className="text-xs text-muted-foreground">
                {pendingLoans} pending approval
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Applications
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loans.length}</div>
              <p className="text-xs text-muted-foreground">
                {loans.length > 0 ? `Last: ${loans[0]?.purpose}` : 'No loans yet'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Amount
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalLoanAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across all loans
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Activities & Notifications Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className={`rounded-full p-2 ${
                      activity.status === 'completed' ? 'bg-green-100' : 
                      activity.status === 'pending' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      {activity.type === 'payment' && (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {activity.type === 'application' && (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {activity.type === 'loan' && (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {activity.type === 'document' && (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {activity.type === 'message' && (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View all activities
                </button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <span className="font-medium">Attention!</span> Payment due in 3 days for Loan #1234.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        <span className="font-medium">New Feature!</span> AI Assistant is now available to help you manage your loans.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        <span className="font-medium">Success!</span> Your last payment has been processed successfully.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View all notifications
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="loans" className="space-y-4 text-black">
        <Card>
          <CardHeader>
            <CardTitle>Your Loans</CardTitle>
          </CardHeader>
          <CardContent>
            {loans.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">You don't have any loans yet.</p>
                <button className="mt-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                  Apply for a loan
                </button>
              </div>
            ) : (
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Purpose
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loans.map((loan) => (
                      <tr key={loan._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {loan._id.substring(0, 8)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${loan.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            loan.status === 'approved' ? 'bg-green-100 text-green-800' :
                            loan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            loan.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {loan.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.purpose}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(loan.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="applications" className="space-y-4 text-black">
        <Card>
          <CardHeader>
            <CardTitle>Your Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {loans.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">You don't have any applications yet.</p>
                <button 
                  className="mt-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                  onClick={() => alert('Create new application functionality coming soon')}
                >
                  Create new application
                </button>
              </div>
            ) : (
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loans.map((loan) => (
                      <tr key={loan._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {loan._id.substring(0, 8)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.purpose}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(loan.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="activities" className="space-y-4 text-black">
        <Card>
          <CardHeader>
            <CardTitle>All Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className={`rounded-full p-2 ${
                    activity.status === 'completed' ? 'bg-green-100' : 
                    activity.status === 'pending' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {activity.type === 'payment' && (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {activity.type === 'application' && (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    {activity.type === 'loan' && (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {activity.type === 'document' && (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    {activity.type === 'message' && (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {activity.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

const PlatformDashboard: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: loanState, getLoans } = useLoan();
  const { user } = authState;
  const { loans, loading: loanLoading } = loanState;
  
  // Add a ref to track if we've already loaded data
  const isFirstLoad = useRef(false);
  
  // Application states
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [newApplication, setNewApplication] = useState<{name: string; amount?: string}>({
    name: '',
    amount: '',
  });
  
  // Mock loan data for development
  const [mockLoans, setMockLoans] = useState<any[]>([]);
  
  // Get the loans to use for chart data (real or mock)
  const loansForCharts = loans.length > 0 ? loans : mockLoans;
  
  // Chat states
  const [chatMessages, setChatMessages] = useState<Array<{sender: string; text: string}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Use useMemo to cache chart data and prevent unnecessary recalculations
  const { barChartData, lineChartData, pieChartData } = useMemo(() => {
    console.log('Generating chart data...');
    return getChartData();
  }, []);
   
  // Extract the data arrays for simple charts with null checks
  const lineData = lineChartData?.datasets?.[0]?.data || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const lineLabels = lineChartData?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   
  const pieData = pieChartData?.datasets?.[0]?.data || [25, 25, 25, 25];
  const pieLabels = pieChartData?.labels || ['Active', 'Completed', 'Pending', 'Defaulted'];
   
  const barData = barChartData?.datasets?.[0]?.data || [10, 20, 30, 40, 50, 60];
  const barLabels = barChartData?.labels || ['Personal', 'Business', 'Education', 'Home', 'Vehicle', 'Medical'];
  
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
    // Track if the component is mounted to prevent state updates after unmount
    let isMounted = true;
    
    // Function to fetch all necessary data
    const fetchDashboardData = async () => {
      // Only fetch loans if we don't already have them and we're not already loading them
      if (loans.length === 0 && !loanLoading && !isFirstLoad.current) {
        console.log('Fetching loans...');
        getLoans();
        
        // Mark that we've already initiated loading
        isFirstLoad.current = true;
      }
      
      // Fetch applications
      if (isMounted) {
        setLoadingApplications(true);
        try {
          // Always use mock data instead of making the failing API call
          setApplications([
            { id: '1', name: 'Home Loan Application', createdAt: '2023-03-01T12:00:00Z', updatedAt: '2023-03-01T12:00:00Z' },
            { id: '2', name: 'Business Expansion Loan', createdAt: '2023-02-25T10:30:00Z', updatedAt: '2023-02-25T10:30:00Z' },
            { id: '3', name: 'Personal Loan Request', createdAt: '2023-02-20T15:45:00Z', updatedAt: '2023-02-20T15:45:00Z' },
            { id: '4', name: 'Education Loan', createdAt: '2023-02-15T09:15:00Z', updatedAt: '2023-02-15T09:15:00Z' },
            { id: '5', name: 'Vehicle Financing', createdAt: '2023-02-10T11:20:00Z', updatedAt: '2023-02-10T11:20:00Z' },
          ]);
        } catch (error: any) {
          console.error('Error fetching applications:', error);
          if (isMounted) {
            setApplications([]);
          }
        } finally {
          if (isMounted) {
            setLoadingApplications(false);
          }
        }
      }
      
      // Set mock loan data if loans array is empty and we have a user
      if (loans.length === 0 && user?._id && isMounted) {
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
      }
    };
    
    fetchDashboardData();
    
    // Cleanup function to prevent setting state after unmount
    return () => {
      isMounted = false;
    };
  }, [loans.length, loanLoading, user?._id, getLoans]); // Use only needed dependencies and rely on ref to prevent repeats
  
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

  const userRole = user?.role || 'No role found';
  const hasAdminRole = user?.roles?.includes('ADMIN') || false;
  console.log('User info:', { 
    user,
    role: userRole,
    hasAdminRole,
    roles: user?.roles
  });

  return (
    <div className="text-gray-800">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowApplicationModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              New Application
            </button>
          </div>
        </div>

        {/* AI Assistant Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2">
            <ChartContainer>
              <DashboardContent />
            </ChartContainer>
          </div>
          
          {/* AI Assistant Column */}
          <div className="col-span-1">
            <div className="h-full">
              <AIAgentWidget 
                agentId="loan-assistant-agent"
                title="Loan Assistant"
                initialHeight={650}
                width="full"
                position="center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* New Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">New Application</h3>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
    </div>
  );
};

export default PlatformDashboard; 