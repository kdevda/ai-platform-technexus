"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function AICreditPage() {
  const features = [
    {
      title: 'Alternative Data Analysis',
      description: 'Enrich traditional credit assessments with alternative data sources for a more complete borrower profile.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Predictive Risk Modeling',
      description: 'Use advanced machine learning models to accurately predict default risk and optimize loan terms.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Adaptive Credit Scoring',
      description: 'Continuously improve scoring models through machine learning that adapts to changing economic conditions.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Explainable AI Decisions',
      description: 'Provide transparent explanations for credit decisions that satisfy regulatory requirements while educating borrowers.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const benefits = [
    {
      title: 'Increased Approval Rates',
      description: 'Approve more qualified borrowers by leveraging expanded data sets for credit decisions.',
      value: '23%'
    },
    {
      title: 'Reduced Default Rates',
      description: 'More accurate risk assessment leads to lower default rates across the loan portfolio.',
      value: '31%'
    },
    {
      title: 'Faster Decision Time',
      description: 'Deliver credit decisions in seconds rather than days through automated analysis.',
      value: '94%'
    },
    {
      title: 'Improved Risk Segmentation',
      description: 'Better classify borrowers into risk tiers for more appropriate pricing and terms.',
      value: '4.2x'
    }
  ];

  const useCases = [
    {
      title: 'Thin-File Borrowers',
      description: 'Assess creditworthiness for consumers with limited traditional credit history.',
      icon: (
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: 'Small Business Lending',
      description: 'Evaluate small businesses with limited operating history using alternative financial indicators.',
      icon: (
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: 'Auto and Equipment Financing',
      description: 'Create specialized risk models for secured lending that incorporate collateral valuation.',
      icon: (
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      title: 'Credit Line Management',
      description: 'Dynamically adjust credit lines based on ongoing behavior and changing risk profiles.',
      icon: (
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      )
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
                AI Credit
              </h1>
              <p className="text-gray-600 text-lg md:text-xl mb-8">
                Transform your credit decisioning with AI-powered risk assessment that increases approvals, reduces defaults, and ensures compliance.
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
              Our AI Credit solution combines advanced risk modeling with explainable AI to transform credit decisioning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
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
            <p className="text-gray-600 mb-10">
              Our AI-powered credit solution transforms traditional credit assessment by incorporating advanced analytics and machine learning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white mr-4 flex-shrink-0">
                    <span className="font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Data Collection & Enrichment</h3>
                    <p className="text-gray-600">Gather traditional credit data and alternative data sources to create a comprehensive profile of each applicant.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white mr-4 flex-shrink-0">
                    <span className="font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Advanced Risk Modeling</h3>
                    <p className="text-gray-600">Apply sophisticated machine learning algorithms to identify patterns and predict credit risk with greater accuracy.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white mr-4 flex-shrink-0">
                    <span className="font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Decision & Explanation</h3>
                    <p className="text-gray-600">Generate credit decisions with transparent explanations that satisfy regulatory requirements and help borrowers understand outcomes.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white mr-4 flex-shrink-0">
                    <span className="font-semibold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Continuous Learning</h3>
                    <p className="text-gray-600">Models adapt over time based on portfolio performance, ensuring credit decisions remain accurate as conditions change.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="bg-gray-50 p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold mb-2">Credit Decision Flow</h3>
                <p className="text-gray-600">From application to decision in seconds</p>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-black"></div>
                    <h4 className="font-bold mb-1">Application Data</h4>
                    <p className="text-sm text-gray-600">Application information and consent for data access</p>
                  </div>
                  
                  <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-black"></div>
                    <h4 className="font-bold mb-1">Data Aggregation</h4>
                    <p className="text-sm text-gray-600">Traditional + alternative data sources combined</p>
                  </div>
                  
                  <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-black"></div>
                    <h4 className="font-bold mb-1">Risk Analysis</h4>
                    <p className="text-sm text-gray-600">ML models assess probability of default and ability to repay</p>
                  </div>
                  
                  <div className="relative pl-8">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-black"></div>
                    <h4 className="font-bold mb-1">Decision & Terms</h4>
                    <p className="text-sm text-gray-600">Approval with optimized terms or explanation for denial</p>
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
              Our clients experience significant improvements in credit performance and operational efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow text-center">
                <div className="text-4xl md:text-5xl font-bold text-black mb-4">{benefit.value}</div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-black">Dedicated Credit AI Assistant</h2>
              <p className="text-gray-600 mb-8">
                Our Credit AI Assistant transforms lending decisions, providing real-time risk analysis and recommendations to help your team make smarter, faster credit decisions.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Risk Assessment</h3>
                    <p className="text-gray-600">Analyzes traditional and alternative data to provide comprehensive risk profiles for each application.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Decision Explanation</h3>
                    <p className="text-gray-600">Provides clear, compliant explanations for credit decisions, highlighting key factors that influenced the outcome.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Fraud Detection</h3>
                    <p className="text-gray-600">Identifies potential fraud indicators across applications, protecting your business from credit fraud and identity theft.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Compliance Monitoring</h3>
                    <p className="text-gray-600">Ensures all credit decisions adhere to regulatory requirements and fair lending practices.</p>
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
                    <h3 className="text-lg font-bold text-black">AI Credit Assistant</h3>
                  </div>
                  
                  <div className="space-y-4 mb-4">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-700">I've analyzed this application and identified multiple positive indicators. Credit score, income stability, and debt-to-income ratio all suggest low risk.</p>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-700">The applicant's employment history shows a gap that requires verification. Would you like me to generate the necessary verification request?</p>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-700">Based on the applicant's profile, I recommend approval with a 7.2% interest rate, which balances risk and portfolio performance targets.</p>
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
      
      {/* Use Cases */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Use Cases</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              AI Credit addresses a wide range of lending scenarios across different market segments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6 mx-auto">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-black text-center">{useCase.title}</h3>
                <p className="text-gray-600 text-center">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-black text-center">Early Adopter Program</h3>
              <div className="mb-6 text-sm text-gray-500 text-center">LIMITED AVAILABILITY</div>
              
              <p className="text-gray-600 mb-8 text-center">
                Join our exclusive Early Adopter Program for AI Credit and be among the first to transform your credit decisioning with our cutting-edge technology.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-black mb-2">Priority Access</h4>
                  <p className="text-sm text-gray-600">Be first to receive new features and enhancements to the AI Credit platform</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-black mb-2">Special Pricing</h4>
                  <p className="text-sm text-gray-600">Exclusive pricing and terms for early program participants</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-black mb-2">Direct Input</h4>
                  <p className="text-sm text-gray-600">Shape the future of AI Credit with your direct feedback and requirements</p>
                </div>
              </div>
              
              <div className="text-center">
                <Link href="/contact?program=early-adopter" className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  Apply for the Program
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Built for Compliance</h2>
              <p className="text-gray-600 mb-8">
                AI Credit is designed with regulatory compliance at its core, ensuring your credit decisions remain explainable, fair, and transparent.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-black mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Explainable Decisions</h3>
                    <p className="text-gray-600">Our system provides detailed factors for each credit decision, making it easy to comply with adverse action notice requirements.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-black mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Fair Lending Analysis</h3>
                    <p className="text-gray-600">Built-in tools monitor model performance across protected classes to help ensure fair lending compliance.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-black mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Audit Trail & Documentation</h3>
                    <p className="text-gray-600">Comprehensive logging of all credit decisions and model changes to support regulatory examinations.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-black mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Model Risk Management</h3>
                    <p className="text-gray-600">Rigorous validation processes and documentation to comply with model risk management guidance.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="font-bold mb-2">ECOA & Reg B</div>
                <p className="text-sm text-gray-600">Supports adverse action notices with specific reasons for credit decisions</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="font-bold mb-2">FCRA</div>
                <p className="text-sm text-gray-600">Complies with credit reporting requirements and consumer disclosure rights</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="font-bold mb-2">UDAAP</div>
                <p className="text-sm text-gray-600">Designed to prevent unfair, deceptive, or abusive practices</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="font-bold mb-2">SR 11-7</div>
                <p className="text-sm text-gray-600">Aligns with model risk management guidance from federal regulators</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 col-span-2">
                <div className="font-bold mb-2">AI Explainability</div>
                <p className="text-sm text-gray-600">Transparent, interpretable models that meet emerging AI/ML regulatory expectations</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to transform your credit decisioning?</h2>
              <p className="text-gray-300 mb-8">
                Get started with AI Credit today and experience faster, more accurate, and compliant credit decisions.
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
              <h3 className="text-xl font-bold mb-4">Schedule a Risk Assessment</h3>
              <p className="text-gray-300 mb-6">
                Let our team analyze your current credit decisioning and demonstrate the potential improvement with AI Credit.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Portfolio analysis</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>ROI calculation</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Compliance review</span>
                </div>
              </div>
              <Link href="/contact" className="block text-center bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
                Schedule Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 