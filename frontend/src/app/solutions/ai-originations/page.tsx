"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function AIOriginationsPage() {
  const features = [
    {
      title: <span className="text-black">Intelligent Application Processing</span>, 
      description: 'Automate and streamline loan applications with AI-powered document analysis and verification.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: <span className="text-black">Fraud Detection & Prevention</span>,
      description: 'Identify potential fraud patterns in applications using advanced machine learning algorithms.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: <span className="text-black">Digital Identity Verification</span>,
      description: 'Securely verify applicant identities through biometric matching and document authenticity checks.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: <span className="text-black">Data Enrichment & Analysis</span>,
      description: 'Enrich application data with additional sources to create a more comprehensive borrower profile.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const benefits = [
    {
      title: <span className="text-black">Reduced Processing Time</span>,
      description: 'Decrease application review time from days to minutes with automated verification processes.',
      value: '85%'
    },
    {
      title: <span className="text-black">Increased Application Throughput</span>,
      description: 'Process more applications with the same resources through intelligent workflow automation.',
      value: '3.5x'
    },
    {
      title: <span className="text-black">Lower Operating Costs</span>,
      description: 'Minimize manual review costs while maintaining high verification standards.',
      value: '42%'
    },
    {
      title: <span className="text-black">span className="text-bla</span>,
      description: 'Identify fraudulent applications before approval, reducing potential losses.',
      value: '67%'
    }
  ];

  const processSteps = [
    {
      title: 'Application Submission',
      description: 'Applicants submit information through a user-friendly digital interface with real-time guidance.'
    },
    {
      title: 'Document Processing',
      description: 'AI extracts and validates data from submitted documents, flagging inconsistencies for review.'
    },
    {
      title: 'Identity Verification',
      description: 'Multi-factor identity verification confirms applicant identity through various authentication methods.'
    },
    {
      title: 'Risk Assessment',
      description: 'Applications are analyzed for fraud patterns and forwarded to appropriate underwriting channels.'
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
                AI Originations
              </h1>
              <p className="text-gray-600 text-lg md:text-xl mb-8">
                Transform your loan application process with AI-powered origination that increases efficiency, reduces fraud, and improves the customer experience.
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
              Our AI Originations platform combines advanced technology with intuitive interfaces to streamline the loan application process.
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

      {/* Process Steps */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">The Origination Process</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our streamlined application flow ensures a smooth experience for both applicants and lenders.
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {processSteps.map((step, index) => (
                <div key={index} className="relative bg-white p-6 rounded-xl border border-gray-200 text-center">
                  <div className="flex items-center justify-center w-14 h-14 text-white bg-black rounded-full mx-auto mb-6 relative z-10">
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-black">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
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
              Our clients experience significant improvements in efficiency, cost, and security with AI Originations.
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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-black">Dedicated Originations AI Assistant</h2>
              <p className="text-gray-600 mb-8">
                Our AI Assistant transforms the loan origination process, providing real-time guidance and automating complex tasks to help your team work more efficiently and accurately.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Fraud Detection</h3>
                    <p className="text-gray-600">Automatically flags suspicious applications and identifies potential fraud patterns across multiple applications.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Document Analysis</h3>
                    <p className="text-gray-600">Intelligently extracts and verifies data from uploaded documents, reducing manual review and data entry errors.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Decision Support</h3>
                    <p className="text-gray-600">Provides risk analysis and recommendations for loan decisions based on comprehensive data analysis.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Application Monitoring</h3>
                    <p className="text-gray-600">Tracks application progress and proactively addresses bottlenecks to ensure smooth processing.</p>
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
                    <h3 className="text-lg font-bold text-black">AI Originations Assistant</h3>
                  </div>
                  
                  <div className="space-y-4 mb-4">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-700">I've detected a discrepancy between the income stated in the application and the supporting documents. Would you like me to highlight the differences?</p>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-700">The applicant's credit profile suggests they may qualify for our preferred rate program. Here's a summary of the qualifying factors.</p>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-700">I've completed verification of all documents. Employment and identity verification successful. Missing documentation: proof of residence.</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-black">Industry Applications</h2>
              <p className="text-gray-600 mb-8">
                Our AI Originations platform serves various lending scenarios across multiple industries.
              </p>
              
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Consumer Lending</h3>
                    <p className="text-gray-600">Streamline personal loan applications with digital verification and instant decisions.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Small Business Lending</h3>
                    <p className="text-gray-600">Automate document collection and business verification for small business loans.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Mortgage Processing</h3>
                    <p className="text-gray-600">Simplify complex mortgage applications with automated document analysis and data verification.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-black">Point-of-Sale Financing</h3>
                    <p className="text-gray-600">Enable instant credit decisions for retail and e-commerce purchase financing.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-black">Early Adopter Program</h3>
                <div className="mb-6 text-sm text-gray-500">LIMITED AVAILABILITY</div>
                <p className="text-gray-600 mb-6">
                  Join our exclusive Early Adopter Program for AI Originations and be among the first to leverage this powerful technology to transform your loan application processes.
                </p>
                
                <div className="space-y-6 mb-6">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Priority Access</h4>
                      <p className="text-sm text-gray-600">Be first to receive new features and updates</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Special Pricing</h4>
                      <p className="text-sm text-gray-600">Exclusive pricing for early adopters</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Direct Input</h4>
                      <p className="text-sm text-gray-600">Shape the product roadmap with your feedback</p>
                    </div>
                  </div>
                </div>
                
                <Link href="/contact?program=early-adopter" className="inline-flex items-center bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
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

      {/* Integration */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Seamless Integration</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              AI Originations integrates with your existing systems through API connections and pre-built adapters.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-black">Core Banking Integration</h3>
              <p className="text-gray-600 mb-6">
                Connect directly with your core banking system for seamless data flow and account creation.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-black">Real-time account creation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-black">Bidirectional data synchronization</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-black">Automated data validation</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-black">Third-Party Data Services</h3>
              <p className="text-gray-600 mb-6">
                Connect with external data providers to enhance verification and decision-making capabilities.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-black">Credit bureau integration</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-black">Identity verification services</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-black">Employment and income verification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to transform your loan origination process?</h2>
              <p className="text-gray-300 mb-8">
                Get started with AI Originations today and experience faster, more accurate, and more secure loan application processing.
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
                See how AI Originations can streamline your application process with a personalized demonstration.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Customized to your lending process</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Review integration requirements</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>ROI calculation based on your volume</span>
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