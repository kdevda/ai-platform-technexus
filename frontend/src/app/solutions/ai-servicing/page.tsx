"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function AIServicingPage() {
  const features = [
    {
      title: 'Automated Payment Processing',
      description: 'Streamline payment collection and processing with AI-powered workflows that reduce manual intervention.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Intelligent Communication',
      description: 'Engage borrowers with personalized, timely communications through their preferred channels.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    {
      title: 'Proactive Account Management',
      description: 'Identify potential account issues before they become problems with predictive analytics and early intervention strategies.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Self-Service Portal',
      description: 'Empower borrowers with an intuitive dashboard for account management, document uploads, and instant assistance.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const benefits = [
    {
      title: 'Reduced Operational Costs',
      description: 'Decrease servicing costs through automation of routine tasks and workflows.',
      value: '46%'
    },
    {
      title: 'Improved Customer Satisfaction',
      description: 'Enhance borrower experience with responsive, personalized service.',
      value: '38%'
    },
    {
      title: 'Lower Delinquency Rates',
      description: 'Detect and address payment issues early to prevent delinquencies.',
      value: '29%'
    },
    {
      title: 'Increased Payment Completion',
      description: 'More borrowers complete payments on time with proactive reminders.',
      value: '34%'
    }
  ];

  const capabilities = [
    {
      title: 'Payment Processing',
      items: [
        'Multi-channel payment collection',
        'Automatic payment reconciliation',
        'Real-time payment posting',
        'Custom payment plan setup'
      ]
    },
    {
      title: 'Account Management',
      items: [
        'Escrow analysis and adjustments',
        'Interest rate modifications',
        'Document management',
        'Statement generation'
      ]
    },
    {
      title: 'Customer Engagement',
      items: [
        'Intelligent chatbot support',
        'Personalized notifications',
        'Milestone celebrations',
        'Feedback collection and analysis'
      ]
    },
    {
      title: 'Compliance Management',
      items: [
        'Automated regulatory reporting',
        'Compliance monitoring',
        'Audit trail maintenance',
        'Disclosure delivery'
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                AI Servicing
              </h1>
              <p className="text-gray-600 text-lg md:text-xl mb-8">
                Transform your loan servicing operations with AI-powered automation that reduces costs, improves borrower satisfaction, and ensures compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors">
                  Schedule a Demo
                </Link>
                <Link href="/solutions" className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  View All Solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Key Features</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our AI Servicing platform combines intelligent automation with personalized borrower engagement to streamline the entire loan lifecycle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-black">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">How It Works</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 mb-8">
              Our platform integrates seamlessly with your existing systems to automate servicing workflows, enhance customer interactions, and provide actionable insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div className="relative bg-white p-6 rounded-xl border border-gray-200 text-center">
                  <div className="flex items-center justify-center w-14 h-14 text-white bg-black rounded-full mx-auto mb-6 relative z-10">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-black">Data Integration</h3>
                  <p className="text-gray-600 pl-14">Connect with core systems, payment processors, and customer channels.</p>
                </div>
                
                <div className="relative bg-white p-6 rounded-xl border border-gray-200 text-center">
                  <div className="flex items-center justify-center w-14 h-14 text-white bg-black rounded-full mx-auto mb-6 relative z-10">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-black">Workflow Automation</h3>
                  <p className="text-gray-600 pl-14">Configure AI-powered processes that handle routine servicing tasks.</p>
                </div>
                
                <div className="relative bg-white p-6 rounded-xl border border-gray-200 text-center">
                  <div className="flex items-center justify-center w-14 h-14 text-white bg-black rounded-full mx-auto mb-6 relative z-10">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-black">Customer Engagement</h3>
                  <p className="text-gray-600 pl-14">Deliver personalized interactions through borrowers' preferred channels.</p>
                </div>
                
                <div className="relative bg-white p-6 rounded-xl border border-gray-200 text-center">
                  <div className="flex items-center justify-center w-14 h-14 text-white bg-black rounded-full mx-auto mb-6 relative z-10">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-black">Continuous Optimization</h3>
                  <p className="text-gray-600 pl-14">Continuously improve operations through performance monitoring and predictive insights.</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-white rounded-lg border border-gray-100">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">Core System</h4>
                    <p className="text-sm text-gray-600">Seamless integration with your existing loan management platform</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white rounded-lg border border-gray-100">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">AI Engine</h4>
                    <p className="text-sm text-gray-600">Processes data, automates decisions, and triggers actions</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white rounded-lg border border-gray-100">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">Omnichannel</h4>
                    <p className="text-sm text-gray-600">Consistent experience across web, mobile, email, and SMS</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white rounded-lg border border-gray-100">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">Payment Hub</h4>
                    <p className="text-sm text-gray-600">Centralized processing for all payment types and methods</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white rounded-lg border border-gray-100">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">Analytics</h4>
                    <p className="text-sm text-gray-600">Real-time reporting on portfolio performance and servicing KPIs</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white rounded-lg border border-gray-100">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">Compliance</h4>
                    <p className="text-sm text-gray-600">Automatic regulatory monitoring and reporting to ensure adherence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Key Benefits</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our clients experience significant improvements in operational efficiency and borrower satisfaction with AI Servicing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow text-center">
                <div className="text-4xl md:text-5xl font-bold text-black mb-4">{benefit.value}</div>
                <h3 className="text-xl font-bold mb-3 text-black">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Dedicated AI Assistant */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-black">Dedicated Servicing AI Assistant</h2>
              <p className="text-gray-600 mb-8">
                Our AI Assistant transforms loan servicing operations, providing real-time insights and automating routine tasks to help your team deliver exceptional borrower experiences.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Payment Reminders</h3>
                    <p className="text-gray-600">Sends personalized payment reminders through borrowers' preferred channels at optimal times to maximize response.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Document Management</h3>
                    <p className="text-gray-600">Automatically processes, categorizes, and extracts data from incoming documents, reducing manual handling.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Account Monitoring</h3>
                    <p className="text-gray-600">Continuously monitors account activity for early warning signs of potential issues, enabling proactive intervention.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Borrower Support</h3>
                    <p className="text-gray-600">Provides instant responses to common borrower inquiries, escalating complex issues to human agents when necessary.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-100 rounded-xl p-6 md:p-8">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-black">AI Servicing Assistant</h3>
                  </div>
                  
                  <div className="space-y-4 mb-4">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-700">I've detected that borrower #4582 has missed their usual payment window. Would you like me to send a courtesy reminder through their preferred channel (SMS)?</p>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-700">New escrow analysis completed for 128 accounts. 23 require adjustments. I've prepared the notification templates and adjustment schedules for your review.</p>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-700">Customer satisfaction metrics for this month show a 12% improvement over last quarter. Top positive feedback mentions: payment flexibility, clear communication, and quick response times.</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <input type="text" className="w-full rounded-full border border-gray-300 pl-4 pr-10 py-2 text-sm" placeholder="Ask the AI Assistant..." />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black text-white w-8 h-8 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Capabilities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Capabilities</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our platform offers end-to-end servicing functionality to handle all aspects of your loan portfolio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow h-full">
                <h3 className="text-xl font-bold mb-4 text-black">{capability.title}</h3>
                <ul className="space-y-4">
                  {capability.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Early Adopter Program</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 mb-10">
              <span className="font-semibold">Limited Availability</span> - Join our exclusive program to transform your loan servicing operations.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-8 text-center">
                Join our Early Adopter Program to get exclusive access to our AI Servicing solution and be at the forefront of loan servicing innovation.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-3 text-black">Priority Access</h3>
                  <p className="text-gray-600">Get early access to new features and capabilities before they're widely available.</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-3 text-black">Special Pricing</h3>
                  <p className="text-gray-600">Benefit from exclusive pricing and terms available only to early adopters.</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-3 text-black">Direct Input</h3>
                  <p className="text-gray-600">Provide feedback directly to our product team and help shape the roadmap.</p>
                </div>
              </div>
              
              <div className="text-center">
                <Link href="/contact" className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors inline-block">
                  Apply for the Program
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to transform your loan servicing?</h2>
              <p className="text-gray-300 mb-8">
                Get started with AI Servicing today and experience more efficient operations, happier borrowers, and lower costs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
                  Contact Sales
                </Link>
                <Link href="/solutions" className="bg-transparent border border-white text-white hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors">
                  View All Solutions
                </Link>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Schedule a Demonstration</h3>
              <p className="text-gray-300 mb-6">
                Let our experts analyze your current servicing operations and show you where AI can make the biggest impact.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Process automation assessment</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Cost savings calculation</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Implementation roadmap</span>
                </div>
              </div>
              <Link href="/contact" className="block text-center bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
                Request Analysis
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 