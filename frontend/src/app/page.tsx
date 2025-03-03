"use client";

import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import ContactFormModal from '@/components/ui/ContactFormModal';

export default function Home() {
  const { state } = useAuth();
  const { isAuthenticated } = state;
  const router = useRouter();
  
  // Modal states
  const [isScheduleDemoModalOpen, setIsScheduleDemoModalOpen] = useState(false);
  const [isGetStartedModalOpen, setIsGetStartedModalOpen] = useState(false);
  const [isStartTrialModalOpen, setIsStartTrialModalOpen] = useState(false);
  
  // AI Assistant showcase states
  const [activeAssistant, setActiveAssistant] = useState(0);
  const assistantOptions = [
    {
      id: 'relations',
      name: 'Relations AI Assistant',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      color: 'from-blue-500 to-indigo-600',
      description: 'Enhance customer relationships with personalized interactions and insights.',
      messages: [
        { sender: 'user', text: 'How can I improve customer retention?' },
        { sender: 'ai', text: 'Based on your customer data, I recommend personalized outreach to customers with loans maturing in the next 60 days. Your retention rates are 68% higher when engagement begins 45+ days before maturity.' }
      ]
    },
    {
      id: 'originations',
      name: 'Originations AI Assistant',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'from-green-500 to-emerald-600',
      description: 'Streamline loan applications and improve approval processes.',
      messages: [
        { sender: 'user', text: 'This applicant has a 680 credit score but unusual income patterns.' },
        { sender: 'ai', text: 'I\'ve analyzed their cash flow - while income is variable, their debt service coverage ratio is consistently above 1.5. Based on similar approved profiles, this application has a 78% approval probability.' }
      ]
    },
    {
      id: 'credit',
      name: 'Credit AI Assistant',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'from-purple-500 to-violet-600',
      description: 'Enhance risk assessment and optimize lending decisions.',
      messages: [
        { sender: 'user', text: 'How would raising our minimum credit score requirement affect our portfolio?' },
        { sender: 'ai', text: 'Increasing the minimum score from 640 to 680 would reduce approval volume by approximately 12%, but would decrease expected defaults by 22%. The projected ROI impact is +1.8% based on historical performance.' }
      ]
    },
    {
      id: 'servicing',
      name: 'Servicing AI Assistant',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'from-yellow-500 to-amber-600',
      description: 'Automate loan servicing and improve customer experience.',
      messages: [
        { sender: 'user', text: 'How many customers are at risk of missing their next payment?' },
        { sender: 'ai', text: 'Based on payment behavior patterns, 47 borrowers have a >40% chance of missing their next payment. I\'ve prepared early intervention communications for your review and created a workflow for the servicing team.' }
      ]
    },
    {
      id: 'collections',
      name: 'Collections AI Assistant',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-red-500 to-rose-600',
      description: 'Optimize recovery efforts and reduce defaults.',
      messages: [
        { sender: 'user', text: 'Which collection strategies are performing best this quarter?' },
        { sender: 'ai', text: 'The new text-first approach for 30-day delinquencies has improved recovery by 24% compared to last quarter. Based on demographic analysis, phone calls remain most effective for borrowers over 50, while digital communication works best for younger segments.' }
      ]
    },
    {
      id: 'treasury',
      name: 'Treasury AI Assistant',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      color: 'from-cyan-500 to-teal-600',
      description: 'Optimize liquidity management and financial operations.',
      messages: [
        { sender: 'user', text: 'What\'s our projected cash position for the end of the quarter?' },
        { sender: 'ai', text: 'Based on current inflows and commitments, your projected end-of-quarter cash reserve is $24.3M, which is 8% above target. There\'s an opportunity to deploy approximately $2M for higher yield without impacting liquidity requirements.' }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAssistant((current) => (current + 1) % assistantOptions.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [assistantOptions.length]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/platform/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <Layout>
      {/* Contact Form Modals */}
      <ContactFormModal 
        isOpen={isScheduleDemoModalOpen} 
        onClose={() => setIsScheduleDemoModalOpen(false)}
        heading="Schedule a Demo"
      />
      
      <ContactFormModal 
        isOpen={isGetStartedModalOpen} 
        onClose={() => setIsGetStartedModalOpen(false)}
        heading="Get Started"
      />
      
      <ContactFormModal 
        isOpen={isStartTrialModalOpen} 
        onClose={() => setIsStartTrialModalOpen(false)}
        heading="Start Free Trial"
      />
      
      {/* Hero Section with Professional Chat Interface */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Lending as a Service
                <span className="block text-black">Powered by AI</span>
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-xl">
                Streamline your loan operations with our configurable AI platform designed for enterprise financial institutions.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => setIsScheduleDemoModalOpen(true)} 
                  className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </button>
                <Link 
                  href="/solutions" 
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                >
                  Explore Solutions
                </Link>
              </div>
            </div>

            {/* Enterprise-grade Chat Interface */}
            <ChatInterface />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Enterprise AI Capabilities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines advanced AI with deep financial expertise to transform every aspect of the loan lifecycle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-700 rounded-lg flex items-center justify-center mb-5 transform transition-transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Intelligent Risk Assessment</h3>
              <p className="text-gray-600">
                Advanced algorithms analyze thousands of data points to provide accurate risk profiles and optimal pricing.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-700 rounded-lg flex items-center justify-center mb-5 transform transition-transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Automated Underwriting</h3>
              <p className="text-gray-600">
                Reduce decision time from days to minutes with AI-powered underwriting that maintains compliance.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-700 rounded-lg flex items-center justify-center mb-5 transform transition-transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Conversational AI</h3>
              <p className="text-gray-600">
                Natural language processing enables intuitive interactions for both customers and loan officers.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-700 rounded-lg flex items-center justify-center mb-5 transform transition-transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fraud Detection</h3>
              <p className="text-gray-600">
                Real-time anomaly detection identifies potential fraud before it impacts your portfolio.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-700 rounded-lg flex items-center justify-center mb-5 transform transition-transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Predictive Analytics</h3>
              <p className="text-gray-600">
                Forecast portfolio performance and identify opportunities for optimization and growth.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-700 rounded-lg flex items-center justify-center mb-5 transform transition-transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Regulatory Compliance</h3>
              <p className="text-gray-600">
                Stay compliant with automated checks and documentation for regulatory requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistants Showcase Section */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Dedicated AI Assistants</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each solution comes with a specialized AI assistant, trained on industry data and best practices to deliver exceptional results.
            </p>
          </div>
          
          <div className="relative">
            {/* Assistant Selection Tabs */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
              {assistantOptions.map((assistant, index) => (
                <button
                  key={assistant.id}
                  onClick={() => setActiveAssistant(index)}
                  className={`px-3 py-2 md:px-4 md:py-2 rounded-full flex items-center gap-2 text-sm md:text-base transition-all duration-300 ${
                    activeAssistant === index 
                      ? `bg-gradient-to-r ${assistant.color} text-white shadow-lg scale-105` 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="hidden md:inline">{assistant.icon}</span>
                  <span>{assistant.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
            
            {/* Assistant Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Assistant Info Card */}
              <div className="lg:col-span-2 bg-gradient-to-br rounded-2xl p-1 shadow-xl transform transition-all duration-500"
                style={{ 
                  backgroundImage: `linear-gradient(to bottom right, ${assistantOptions[activeAssistant].color.split(' ')[0].replace('from-', '')}, ${assistantOptions[activeAssistant].color.split(' ')[1].replace('to-', '')})`
                }}
              >
                <div className="bg-white rounded-2xl p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${assistantOptions[activeAssistant].color} flex items-center justify-center text-white mr-4`}>
                      {assistantOptions[activeAssistant].icon}
                    </div>
                    <h3 className="text-2xl font-bold">{assistantOptions[activeAssistant].name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{assistantOptions[activeAssistant].description}</p>
                  
                  <h4 className="font-semibold mb-3">Key Capabilities:</h4>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Real-time data analysis and insights',
                      'Personalized recommendations',
                      'Natural language interaction',
                      'Automated workflow actions',
                      'Continuous learning and improvement'
                    ].map((capability, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg className={`w-5 h-5 text-${assistantOptions[activeAssistant].color.split('-')[1]}-500 flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>{capability}</span>
          </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => setIsScheduleDemoModalOpen(true)}
                    className={`mt-4 px-4 py-2 bg-gradient-to-r ${assistantOptions[activeAssistant].color} text-white rounded-lg flex items-center gap-2 hover:shadow-lg transition-all`}
                  >
                    <span>Try {assistantOptions[activeAssistant].name.split(' ')[0]}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* AI Chat Demo */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transform transition-all duration-500">
                  <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 bg-gradient-to-r ${assistantOptions[activeAssistant].color} rounded-full`}></div>
                      <h3 className="font-medium">{assistantOptions[activeAssistant].name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="p-4 h-[300px] bg-gray-50">
                    <div className="space-y-4">
                      {assistantOptions[activeAssistant].messages.map((message, idx) => (
                        <div 
                          key={`${assistantOptions[activeAssistant].id}-msg-${idx}`}
                          className={`flex items-start max-w-[80%] ${message.sender === 'user' ? 'ml-auto' : ''} animate-fadeIn`}
                          style={{ animationDelay: `${idx * 0.5}s` }}
                        >
                          {message.sender === 'ai' && (
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${assistantOptions[activeAssistant].color} flex items-center justify-center text-white font-bold mr-2 flex-shrink-0`}>
                              AI
                            </div>
                          )}
                          
                          <div className={`${message.sender === 'ai' ? 'bg-white' : 'bg-gray-100'} p-3 rounded-lg shadow-sm border border-gray-200`}>
                            <p className="text-gray-800 whitespace-pre-line">{message.text}</p>
                          </div>
                          
                          {message.sender === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold ml-2 flex-shrink-0">
                              U
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* Custom typing animation for demo purposes */}
                      <div className="flex items-start max-w-[80%] animate-fadeIn">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${assistantOptions[activeAssistant].color} flex items-center justify-center text-white font-bold mr-2 flex-shrink-0`}>
                          AI
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center">
                      <input 
                        type="text" 
                        placeholder="Ask something about your loan portfolio..." 
                        className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                      <button className={`bg-gradient-to-r ${assistantOptions[activeAssistant].color} text-white py-2 px-4 rounded-r-md hover:opacity-90 transition-colors`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {assistantOptions.map((_, index) => (
                <button
                  key={`nav-${index}`}
                  onClick={() => setActiveAssistant(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeAssistant === index 
                      ? `bg-gradient-to-r ${assistantOptions[index].color}` 
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Go to assistant ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Configuration Dashboard Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Enterprise Configuration</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Tailor our AI platform to your specific business requirements</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-black text-white p-4">
              <h3 className="font-medium">AI Configuration Dashboard</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y divide-gray-200">
              {/* Risk Assessment Panel */}
              <div className="p-6">
                <h4 className="font-bold mb-4 text-gray-800">Risk Assessment</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Risk Tolerance</label>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-black h-2 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Conservative</span>
                      <span>Aggressive</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credit Score Threshold</label>
                    <div className="flex items-center">
                      <input type="text" value="680" readOnly className="w-16 border border-gray-300 rounded px-2 py-1 text-center text-black bg-gray-50" />
                      <div className="ml-2 text-sm text-gray-700">Minimum</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" checked readOnly className="h-4 w-4 text-black border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Enable AI fraud detection</label>
                  </div>
                </div>
              </div>
              
              {/* Approval Workflow Panel */}
              <div className="p-6">
                <h4 className="font-bold mb-4 text-gray-800">Approval Workflow</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Auto-approve threshold</span>
                    <span className="text-sm font-medium">$25,000</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Manual review threshold</span>
                    <span className="text-sm font-medium">$100,000</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Executive approval</span>
                    <span className="text-sm font-medium">$250,000+</span>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex items-center">
                      <input type="checkbox" checked readOnly className="h-4 w-4 text-black border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-700">Enable parallel processing</label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* AI Parameters Panel */}
              <div className="p-6">
                <h4 className="font-bold mb-4 text-gray-800">AI Parameters</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Model Confidence</label>
                    <select className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 text-black bg-gray-50">
                      <option>High (95%+)</option>
                      <option>Medium (85%+)</option>
                      <option>Low (75%+)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Sources</label>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <input type="checkbox" checked readOnly className="h-4 w-4 text-black border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Credit bureaus</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" checked readOnly className="h-4 w-4 text-black border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Banking history</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" checked readOnly className="h-4 w-4 text-black border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Alternative data</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Performance Metrics Panel */}
              <div className="p-6">
                <h4 className="font-bold mb-4 text-gray-800">Performance Metrics</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Approval Rate</span>
                      <span className="text-sm font-medium text-green-600">72.4%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-[72%]"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Default Rate</span>
                      <span className="text-sm font-medium text-red-600">2.1%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full w-[2%]"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Processing Time</span>
                      <span className="text-sm font-medium text-black">4.2 hrs</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-black h-2 rounded-full w-[35%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Ready to transform your loan operations?</h2>
            <p className="text-gray-600 text-lg mb-8">
              Join leading financial institutions that have increased efficiency by 35% and reduced risk by 25% with our AI-powered platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setIsStartTrialModalOpen(true)}
                className="px-8 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
              >
                Start Free Trial
              </button>
              <Link 
                href="/contact" 
                className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Chat Interface Component with auto-scrolling and smooth animations
function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hello, I'm your loan management assistant. How can I help you today?", delay: 0 },
    { id: 2, sender: 'user', text: "I need to analyze our current loan portfolio performance.", delay: 0.5 },
    { id: 3, sender: 'ai', text: "I've analyzed your loan portfolio and identified the following insights:\n• Your delinquency rate is 2.3%, below industry average of 3.1%\n• Approval efficiency has increased by 18% this quarter\n• Risk-adjusted return is 7.2%, exceeding targets by 0.8%", delay: 1 },
    { id: 4, sender: 'user', text: "What actions do you recommend based on this data?", delay: 1.5 },
    { id: 5, sender: 'ai', text: "Based on the data, I recommend the following actions:\n1. Increase marketing for high-performing loan products\n2. Optimize underwriting criteria for mid-tier applicants\n3. Implement early intervention for loans showing early warning signs", delay: 2 },
    { id: 6, sender: 'user', text: "Can you show me the projected impact of these changes?", delay: 2.5 },
    { id: 7, sender: 'ai', text: "Here are the projected impacts over the next quarter:\n• Revenue increase: 12-15%\n• Delinquency rate reduction: 0.4%\n• Customer satisfaction improvement: 8%\n• Operational cost reduction: 7%", delay: 3 },
    { id: 8, sender: 'user', text: "What resources would we need to implement these changes?", delay: 3.5 },
  ]);
  
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Function to show typing indicator and then add new message
  const addMessageWithTypingIndicator = (message: any) => {
    setIsTyping(true);
    
    // Scroll to bottom when typing indicator appears
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
    
    // After "typing" delay, add the actual message
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, message]);
      setVisibleMessages(prev => [...prev, message.id]);
      
      // Scroll to bottom when message appears
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }, 1500);
  };
  
  // Initial animation of messages appearing
  useEffect(() => {
    const showMessages = async () => {
      for (let i = 0; i < messages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 700));
        setVisibleMessages(prev => [...prev, messages[i].id]);
        
        // Scroll to bottom when new message appears
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }
      
      // Show typing indicator for the final AI response
      setTimeout(() => {
        setIsTyping(true);
        
        // Scroll to bottom when typing indicator appears
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        
        // After "typing" delay, add the final message
        setTimeout(() => {
          setIsTyping(false);
          const finalMessage = {
            id: 9,
            sender: 'ai',
            text: "Implementation would require:\n• Marketing team allocation: 2 FTEs for 3 weeks\n• Data science team: 1 FTE for model refinement\n• IT support: Configuration changes to the loan origination system\n• Training: 2 hours for loan officers on new criteria",
            delay: 4
          };
          setMessages(prev => [...prev, finalMessage]);
          setVisibleMessages(prev => [...prev, finalMessage.id]);
          
          // Scroll to bottom when message appears
          setTimeout(() => {
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          }, 100);
        }, 2000);
      }, 1000);
    };
    
    showMessages();
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-black rounded-full"></div>
          <h3 className="font-medium">Technexus AI Assistant</h3>
        </div>
        <div className="flex space-x-2">
          <button className="p-1 rounded hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div ref={chatContainerRef} className="p-4 h-[500px] overflow-y-auto bg-gray-50 scroll-smooth">
        <div className="space-y-4">
          {messages.map((message, index) => (
            visibleMessages.includes(message.id) && (
              <div 
                key={`${message.id}-${index}`} 
                className={`flex items-start max-w-[80%] ${message.sender === 'user' ? 'ml-auto' : ''} animate-fadeIn`}
              >
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                    AI
                  </div>
                )}
                
                <div className={`${message.sender === 'ai' ? 'bg-white' : 'bg-gray-100'} p-3 rounded-lg shadow-sm border border-gray-200`}>
                  <p className="text-gray-800 whitespace-pre-line">{message.text}</p>
                </div>
                
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold ml-2 flex-shrink-0">
                    U
                  </div>
                )}
              </div>
            )
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start max-w-[80%] animate-fadeIn">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                AI
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <button className="bg-black text-white py-2 px-4 rounded-r-md hover:bg-gray-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
