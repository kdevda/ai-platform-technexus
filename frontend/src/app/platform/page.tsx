"use client";

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function PlatformPage() {
  // Platform features - detailed showcase items
  const platformFeatures = [
    {
      id: 'configurability',
      title: 'Advanced Configurability',
      description: 'Build your perfect lending solution with our highly configurable platform that adapts to your business needs without custom code.',
      image: '/platform/configurability.svg',
      details: [
        'No-code table and field customization',
        'Configurable workflows and business rules',
        'Custom forms and data collection',
        'Role-based permission management',
        'White-label branding options'
      ]
    },
    {
      id: 'ai-assistants',
      title: 'Dedicated AI Assistants',
      description: 'Purpose-built AI assistants for every department, trained on financial services data and optimized for specific lending tasks.',
      image: '/platform/ai-assistants.svg',
      details: [
        'Specialized assistants for each lending function',
        'Context-aware responses based on user role',
        'Continuous learning from your unique data',
        'Multilingual support for global operations',
        'Compliant and auditable AI interactions'
      ]
    },
    {
      id: 'dashboards',
      title: 'Interactive Dashboards',
      description: 'Real-time insights through customizable dashboards that highlight key metrics and actionable intelligence.',
      image: '/platform/dashboards.svg',
      details: [
        'Role-specific dashboard views',
        'Drag-and-drop visualization builder',
        'Scheduled reports and notifications',
        'Drill-down capabilities for detailed analysis',
        'Export options in multiple formats'
      ]
    },
    {
      id: 'integrations',
      title: 'Seamless Integrations',
      description: 'Connect with your existing tech stack through our extensive API library and pre-built integrations with industry-standard tools.',
      image: '/platform/integrations.svg',
      details: [
        'RESTful API architecture',
        'Pre-built connectors for CRM, ERP systems',
        'Credit bureau integration',
        'Payment processor connections',
        'Document management system compatibility'
      ]
    },
    {
      id: 'mobile-ready',
      title: 'Mobile-First Experience',
      description: 'Fully responsive design ensures a seamless experience across all devices, from desktop to smartphone.',
      image: '/platform/mobile-ready.svg',
      details: [
        'Responsive UI that adapts to any screen size',
        'Touch-optimized interface for mobile users',
        'Offline capabilities for field operations',
        'Fast loading times on mobile networks',
        'Native-like experience in browser'
      ]
    },
    {
      id: 'security',
      title: 'Enterprise-Grade Security',
      description: 'Bank-level security features protect sensitive financial data with multiple layers of defense.',
      image: '/platform/security.svg',
      details: [
        'SOC 2 Type II compliant infrastructure',
        'End-to-end encryption for all data',
        'Multi-factor authentication',
        'Regular penetration testing',
        'Automated security monitoring'
      ]
    }
  ];

  // Advanced capabilities showcase
  const advancedCapabilities = [
    {
      title: 'Dynamic Workflow Engine',
      description: 'Design complex approval flows with conditional logic, parallel processes, and automated actions without coding.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: 'Document Management',
      description: 'Intelligent document processing with OCR, data extraction, and automated verification to streamline paperwork.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Performance Analytics',
      description: 'Advanced analytics for portfolio performance, risk assessment, and operational efficiency with predictive insights.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Compliance Management',
      description: 'Built-in compliance tools that keep your lending operations within regulatory requirements across jurisdictions.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  // State for demo tabs
  const [activeTab, setActiveTab] = useState('dashboard');

  // Demo screenshots with descriptions
  const demoScreenshots = {
    dashboard: {
      image: '/platform/dashboard-demo.png',
      title: 'Executive Dashboard',
      description: 'Comprehensive view of your loan portfolio with key performance indicators, risk metrics, and actionable insights all in one place.'
    },
    config: {
      image: '/platform/configuration-demo.png',
      title: 'No-Code Configuration',
      description: 'Easily customize tables, fields, forms, and workflows through our intuitive configuration interface without technical expertise.'
    },
    ai: {
      image: '/platform/ai-demo.png',
      title: 'AI Assistant Interaction',
      description: 'Natural conversation interface with specialized AI assistants that provide insights, recommendations, and automation capabilities.'
    },
    mobile: {
      image: '/platform/mobile-demo.png',
      title: 'Mobile Experience',
      description: 'The same powerful platform optimized for mobile devices, allowing your team to work efficiently from anywhere.'
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
              The Most Advanced Loan Management Platform
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mt-6">
              A comprehensive, configurable, and AI-powered platform designed to transform every aspect of your lending operations.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                Request Demo
              </Link>
              <Link href="#features" className="bg-gray-100 text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors">
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-black">99.9%</div>
              <p className="text-gray-600 mt-2">Uptime Reliability</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-black">60%</div>
              <p className="text-gray-600 mt-2">Faster Loan Processing</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-black">40+</div>
              <p className="text-gray-600 mt-2">Third-party Integrations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-black">3x</div>
              <p className="text-gray-600 mt-2">ROI for Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Platform Features</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our platform combines cutting-edge technology with intuitive design to deliver a complete solution for modern lending operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {platformFeatures.map((feature) => (
              <div key={feature.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="p-8">
                  <div className="h-48 flex items-center justify-center mb-6 bg-gray-50 rounded-lg">
                    {/* Image placeholder - in production, use actual images */}
                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-500">{feature.title.split(' ')[0]}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-black">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm uppercase tracking-wider text-black mb-3">Key Capabilities</h4>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-black mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Platform in Action</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Experience the power and flexibility of our platform through these interactive demonstrations.
            </p>
          </div>
          
          {/* Demo tabs */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex bg-gray-100 rounded-lg p-1 shadow-sm">
              {Object.keys(demoScreenshots).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    activeTab === tab 
                      ? 'bg-white text-black shadow-sm' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Demo content */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              {/* In production, replace with actual screenshots */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-xl font-bold text-gray-400">{demoScreenshots[activeTab as keyof typeof demoScreenshots].title} Screenshot</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-black">{demoScreenshots[activeTab as keyof typeof demoScreenshots].title}</h3>
              <p className="text-gray-600 mt-2">{demoScreenshots[activeTab as keyof typeof demoScreenshots].description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Capabilities */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Advanced Capabilities</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Beyond the basics, our platform offers sophisticated tools to handle complex lending scenarios and requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {advancedCapabilities.map((capability, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0 mr-4">{capability.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">{capability.title}</h3>
                  <p className="text-gray-600">{capability.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Integrations Hub</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our platform seamlessly connects with your existing tools and services through our extensive integration network.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {/* In production, replace with actual partner logos */}
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="aspect-w-3 aspect-h-2">
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                    <span className="text-gray-400 font-medium">Partner {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/integrations" className="inline-flex items-center text-black font-medium hover:underline">
                View All Integrations
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Early Adopter Program */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Early Adopter Program</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Join our Early Adopter Program and be among the first to experience our innovative lending platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-black">Exclusive Access</h4>
                  <p className="text-gray-600 text-sm">Limited spots available</p>
                </div>
              </div>
              <p className="text-gray-600">Get early access to our platform features and shape the future of lending technology with your valuable feedback.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-black">Preferential Pricing</h4>
                  <p className="text-gray-600 text-sm">Special rates for early adopters</p>
                </div>
              </div>
              <p className="text-gray-600">Benefit from discounted pricing and dedicated onboarding support as a valued member of our early adopter community.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-black">Direct Input</h4>
                  <p className="text-gray-600 text-sm">Influence product development</p>
                </div>
              </div>
              <p className="text-gray-600">Provide direct input on new features and help us build a platform that perfectly addresses your lending process needs.</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors">
              Apply to Early Adopter Program
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Transform Your Lending Operations?</h2>
            <p className="text-gray-300 mt-6 text-lg">
              Schedule a personalized demo to see how our platform can be tailored to your specific needs.
            </p>
            <div className="mt-10">
              <Link href="/contact" className="bg-white text-black px-8 py-4 rounded-md font-medium hover:bg-gray-100 transition-colors inline-block">
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 