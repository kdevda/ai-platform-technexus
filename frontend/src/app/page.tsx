"use client";

import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section with Professional Chat Interface */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Enterprise Loan Management
                <span className="block text-black">Powered by AI</span>
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-xl">
                Streamline your loan operations with our configurable AI platform designed for enterprise financial institutions.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  href="/register" 
                  className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </Link>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise AI Capabilities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines advanced AI with deep financial expertise to transform every aspect of the loan lifecycle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-black rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <div className="w-12 h-12 bg-black rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <div className="w-12 h-12 bg-black rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <div className="w-12 h-12 bg-black rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <div className="w-12 h-12 bg-black rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <div className="w-12 h-12 bg-black rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* CTA Section */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your loan operations?</h2>
            <p className="text-gray-600 text-lg mb-8">
              Join leading financial institutions that have increased efficiency by 35% and reduced risk by 25% with our AI-powered platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/register" 
                className="px-8 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
              >
                Start Free Trial
              </Link>
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

      {/* Testimonials Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how financial institutions are transforming their loan operations with our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">CTO, Global Finance Corp</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Implementing Technexus has transformed our loan origination process. We've reduced processing time by 60% while improving accuracy."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-gray-600 text-sm">COO, Pacific Credit Union</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The AI-powered risk assessment has been a game-changer for our underwriting team. We've seen a 40% reduction in defaults while growing our portfolio."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Lisa Rodriguez</h4>
                  <p className="text-gray-600 text-sm">VP of Innovation, First National Bank</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Technexus has helped us stay ahead of regulatory changes. The compliance features alone have saved us countless hours and reduced our audit findings."
              </p>
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
          {messages.map((message) => (
            visibleMessages.includes(message.id) && (
              <div 
                key={message.id} 
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
