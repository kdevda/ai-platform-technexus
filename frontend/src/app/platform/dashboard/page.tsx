'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useAuth } from '@/app/AuthContext';
import { useLoan } from '@/context/LoanContext';
import PlatformLayout from '@/components/platform/PlatformLayout';
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

// Charts component
const DashboardCharts = () => {
  // Get chart data
  const { barChartData, lineChartData, pieChartData } = getChartData();
  
  // Add null checks and default values to prevent errors
  const lineData = lineChartData?.datasets?.[0]?.data || [];
  const lineLabels = lineChartData?.labels || [];
  
  const pieData = pieChartData?.datasets?.[0]?.data || [];
  const pieLabels = pieChartData?.labels || [];
  
  const barData = barChartData?.datasets?.[0]?.data || [];
  const barLabels = barChartData?.labels || [];
  
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="loans">Loans</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
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
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +4 since last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Payments
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
              <div className="text-2xl font-bold">12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Loan Disbursements</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer>
                <LineChart data={lineData} labels={lineLabels} />
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Loan Types</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer>
                <PieChart data={pieData} labels={pieLabels} />
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="loans" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Loan Distribution by Category</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer>
              <BarChart data={barData} labels={barLabels} />
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="payments" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Payment Collection</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer>
              <LineChart data={lineData} labels={lineLabels} />
            </ChartContainer>
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
        user: { _id: user?.id || '' },
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
        user: { _id: user?.id || '' },
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
        user: { _id: user?.id || '' },
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
        user: { _id: user?.id || '' },
        interestRate: 5.9,
        term: 60,
        collateral: 'Vehicle',
        collateralValue: 18000,
        startDate: '2023-03-01T00:00:00Z',
        endDate: '2028-03-01T00:00:00Z',
        updatedAt: '2023-02-15T09:15:00Z'
      },
    ];
    
    if (loans.length === 0 && !loanLoading) {
      setMockLoans(mockLoanData);
    }
  }, [getLoans, loanLoading, loans]);
  
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
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        
        {/* AI Assistant Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2">
            <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner /></div>}>
              <DashboardCharts />
            </Suspense>
          </div>
          
          {/* AI Assistant Column */}
          <div className="col-span-1">
            <AIAgentWidget 
              agentId="loan-assistant-agent"
              title="Loan Assistant"
              description="Ask me any questions about loans, payments, or application status."
              initialHeight={600}
              width="full"
              position="center"
            />
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