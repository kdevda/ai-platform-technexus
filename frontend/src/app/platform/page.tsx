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
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">Platform Features</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-white-600 max-w-3xl mx-auto mt-6">
              Our intelligent lending platform offers a comprehensive suite of tools to streamline your loan operations.
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
            <div className="aspect-w-16 aspect-h-12 bg-gray-100">
              {/* Custom SVG graphics for each demo tab */}
              <div className="w-full h-full flex items-center justify-center p-8">
                {activeTab === 'dashboard' && (
                  <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Dashboard Layout */}
                    <rect width="800" height="600" fill="#f8fafc" />
                    
                    {/* Header */}
                    <rect x="0" y="0" width="800" height="60" fill="#0f172a" />
                    <circle cx="40" cy="30" r="20" fill="#f8fafc" />
                    <text x="40" y="34" fontSize="12" fill="#0f172a" fontWeight="bold" textAnchor="middle">TX</text>
                    <text x="80" y="35" fontSize="14" fill="#f8fafc" fontWeight="bold">Technexus Dashboard</text>
                    
                    {/* Header Icons */}
                    <circle cx="700" cy="30" r="15" fill="#475569" />
                    <text x="700" y="34" fontSize="12" fill="#f8fafc" textAnchor="middle">?</text>
                    
                    <circle cx="740" cy="30" r="15" fill="#475569" />
                    <path d="M735 30 L740 25 L745 30 L740 35 L735 30" fill="#f8fafc" />
                    
                    <circle cx="780" cy="30" r="15" fill="#ffffff" />
                    <text x="780" y="34" fontSize="10" fill="#000000" textAnchor="middle">KD</text>
                    
                    {/* Sidebar */}
                    <rect x="0" y="60" width="200" height="540" fill="#1e293b" />
                    
                    {/* Sidebar Menu Items */}
                    <rect x="20" y="90" width="160" height="30" rx="4" fill="#2563eb" />
                    <text x="50" y="110" fontSize="12" fill="#f8fafc">Dashboard</text>
                    <circle cx="35" cy="105" r="8" fill="#f8fafc" />
                    <path d="M31 105 L35 109 L39 101" stroke="#1e293b" strokeWidth="1.5" />
                    
                    <text x="50" y="150" fontSize="12" fill="#94a3b8">Applications</text>
                    <circle cx="35" cy="145" r="8" fill="#94a3b8" opacity="0.5" />
                    <rect x="31" y="141" width="8" height="8" rx="1" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                    
                    <text x="50" y="190" fontSize="12" fill="#94a3b8">Loans</text>
                    <circle cx="35" cy="185" r="8" fill="#94a3b8" opacity="0.5" />
                    <path d="M30 189 C30 183, 40 183, 40 189" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                    <rect x="33" y="181" width="4" height="4" rx="2" fill="#1e293b" />
                    
                    <text x="50" y="230" fontSize="12" fill="#94a3b8">Customers</text>
                    <circle cx="35" cy="225" r="8" fill="#94a3b8" opacity="0.5" />
                    <circle cx="35" cy="221" r="3" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                    <path d="M29 229 C29 225, 41 225, 41 229" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                    
                    <text x="50" y="270" fontSize="12" fill="#94a3b8">Reports</text>
                    <circle cx="35" cy="265" r="8" fill="#94a3b8" opacity="0.5" />
                    <path d="M31 261 L31 269 L39 269" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                    <path d="M34 266 L37 263 L39 265" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                    
                    <text x="50" y="310" fontSize="12" fill="#94a3b8">Settings</text>
                    <circle cx="35" cy="305" r="8" fill="#94a3b8" opacity="0.5" />
                    <path d="M35 301 L35 309 M31 303 L39 307 M31 307 L39 303" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                    
                    <text x="30" y="350" fontSize="9" fill="#64748b" fontWeight="bold">ORGANIZATION</text>
                    <text x="30" y="370" fontSize="11" fill="#f8fafc">Technexus Financial</text>
                    <text x="30" y="390" fontSize="9" fill="#64748b">Admin Portal</text>
                    
                    <text x="30" y="450" fontSize="9" fill="#64748b" fontWeight="bold">VERSION</text>
                    <text x="30" y="470" fontSize="11" fill="#f8fafc">v2.5.0</text>
                    
                    {/* Main Stats Cards */}
                    <rect x="220" y="80" width="170" height="100" rx="8" fill="white" stroke="#e2e8f0" />
                    <text x="240" y="110" fontSize="12" fill="#0f172a" fontWeight="bold">Total Portfolio</text>
                    <text x="240" y="140" fontSize="20" fill="#0f172a" fontWeight="bold">$12.4M</text>
                    <text x="240" y="160" fontSize="11" fill="#22c55e">↑ 8.2% from last month</text>
                    
                    <rect x="405" y="80" width="170" height="100" rx="8" fill="white" stroke="#e2e8f0" />
                    <text x="425" y="110" fontSize="12" fill="#0f172a" fontWeight="bold">Active Loans</text>
                    <text x="425" y="140" fontSize="20" fill="#0f172a" fontWeight="bold">842</text>
                    <text x="425" y="160" fontSize="11" fill="#22c55e">↑ 24 new this week</text>
                    
                    <rect x="590" y="80" width="170" height="100" rx="8" fill="white" stroke="#e2e8f0" />
                    <text x="610" y="110" fontSize="12" fill="#0f172a" fontWeight="bold">Pending Approvals</text>
                    <text x="610" y="140" fontSize="20" fill="#0f172a" fontWeight="bold">36</text>
                    <text x="610" y="160" fontSize="11" fill="#ef4444">↓ 18% processing time</text>
                    
                    {/* Line Chart */}
                    <rect x="220" y="200" width="270" height="230" rx="8" fill="white" stroke="#e2e8f0" />
                    <text x="240" y="230" fontSize="14" fill="#0f172a" fontWeight="bold">Monthly Originations</text>
                    <text x="240" y="250" fontSize="11" fill="#64748b">Last 6 months ($000s)</text>
                    
                    <line x1="260" y1="270" x2="260" y2="380" stroke="#e2e8f0" />
                    <line x1="240" y1="380" x2="470" y2="380" stroke="#e2e8f0" />
                    
                    {/* Y-axis labels */}
                    <text x="250" y="275" fontSize="9" fill="#64748b" textAnchor="end">1,500</text>
                    <text x="250" y="300" fontSize="9" fill="#64748b" textAnchor="end">1,200</text>
                    <text x="250" y="325" fontSize="9" fill="#64748b" textAnchor="end">900</text>
                    <text x="250" y="350" fontSize="9" fill="#64748b" textAnchor="end">600</text>
                    <text x="250" y="375" fontSize="9" fill="#64748b" textAnchor="end">300</text>
                    
                    {/* X-axis labels */}
                    <text x="275" y="395" fontSize="9" fill="#64748b" textAnchor="middle">Jul</text>
                    <text x="313" y="395" fontSize="9" fill="#64748b" textAnchor="middle">Aug</text>
                    <text x="351" y="395" fontSize="9" fill="#64748b" textAnchor="middle">Sep</text>
                    <text x="389" y="395" fontSize="9" fill="#64748b" textAnchor="middle">Oct</text>
                    <text x="427" y="395" fontSize="9" fill="#64748b" textAnchor="middle">Nov</text>
                    <text x="465" y="395" fontSize="9" fill="#64748b" textAnchor="middle">Dec</text>
                    
                    {/* Chart lines */}
                    <path d="M275 350 L313 330 L351 310 L389 280 L427 300 L465 270" stroke="#3b82f6" strokeWidth="3" fill="none" />
                    <circle cx="275" cy="350" r="4" fill="#3b82f6" />
                    <circle cx="313" cy="330" r="4" fill="#3b82f6" />
                    <circle cx="351" cy="310" r="4" fill="#3b82f6" />
                    <circle cx="389" cy="280" r="4" fill="#3b82f6" />
                    <circle cx="427" cy="300" r="4" fill="#3b82f6" />
                    <circle cx="465" cy="270" r="4" fill="#3b82f6" />
                    
                    {/* Chart gradient */}
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                    <path d="M275 350 L313 330 L351 310 L389 280 L427 300 L465 270 L465 380 L275 380 Z" fill="url(#areaGradient)" />
                    
                    {/* Bar Chart */}
                    <rect x="510" y="200" width="270" height="230" rx="8" fill="white" stroke="#e2e8f0" />
                    <text x="530" y="230" fontSize="14" fill="#0f172a" fontWeight="bold">Loan Type Distribution</text>
                    <text x="530" y="250" fontSize="11" fill="#64748b">By percentage of portfolio</text>
                    
                    {/* Bar Chart Bars */}
                    <rect x="540" y="290" width="30" height="90" rx="2" fill="#3b82f6" />
                    <rect x="580" y="310" width="30" height="70" rx="2" fill="#3b82f6" />
                    <rect x="620" y="270" width="30" height="110" rx="2" fill="#3b82f6" />
                    <rect x="660" y="330" width="30" height="50" rx="2" fill="#3b82f6" />
                    <rect x="700" y="350" width="30" height="30" rx="2" fill="#3b82f6" />
                    
                    {/* Bar Chart Labels */}
                    <text x="555" y="390" fontSize="9" fill="#64748b" textAnchor="middle">Personal</text>
                    <text x="595" y="390" fontSize="9" fill="#64748b" textAnchor="middle">Auto</text>
                    <text x="635" y="390" fontSize="9" fill="#64748b" textAnchor="middle">Business</text>
                    <text x="675" y="390" fontSize="9" fill="#64748b" textAnchor="middle">Student</text>
                    <text x="715" y="390" fontSize="9" fill="#64748b" textAnchor="middle">Mortgage</text>
                    
                    {/* Percentages */}
                    <text x="555" y="285" fontSize="9" fill="#0f172a" fontWeight="bold" textAnchor="middle">25%</text>
                    <text x="595" y="305" fontSize="9" fill="#0f172a" fontWeight="bold" textAnchor="middle">20%</text>
                    <text x="635" y="265" fontSize="9" fill="#0f172a" fontWeight="bold" textAnchor="middle">30%</text>
                    <text x="675" y="325" fontSize="9" fill="#0f172a" fontWeight="bold" textAnchor="middle">15%</text>
                    <text x="715" y="345" fontSize="9" fill="#0f172a" fontWeight="bold" textAnchor="middle">5%</text>
                    
                    {/* Recent Activity Widget */}
                    <rect x="220" y="450" width="270" height="130" rx="8" fill="white" stroke="#e2e8f0" />
                    <text x="240" y="475" fontSize="14" fill="#0f172a" fontWeight="bold">Recent Activity</text>
                    <line x1="240" y1="485" x2="470" y2="485" stroke="#e2e8f0" />
                    <circle cx="250" cy="505" r="4" fill="#22c55e" />
                    <text x="260" y="508" fontSize="10" fill="#64748b">Loan #39281 approved - 10m ago</text>
                    <circle cx="250" cy="525" r="4" fill="#3b82f6" />
                    <text x="260" y="528" fontSize="10" fill="#64748b">New application from J. Smith - 25m ago</text>
                    <circle cx="250" cy="545" r="4" fill="#f59e0b" />
                    <text x="260" y="548" fontSize="10" fill="#64748b">Payment received from A. Johnson - 1h ago</text>
                    <circle cx="250" cy="565" r="4" fill="#ef4444" />
                    <text x="260" y="568" fontSize="10" fill="#64748b">Loan #38107 past due reminder sent - 2h ago</text>
                    
                    {/* Performance Widget */}
                    <rect x="510" y="450" width="270" height="130" rx="8" fill="white" stroke="#e2e8f0" />
                    <text x="530" y="475" fontSize="14" fill="#0f172a" fontWeight="bold">System Performance</text>
                    <line x1="530" y1="485" x2="760" y2="485" stroke="#e2e8f0" />
                    <text x="530" y="505" fontSize="10" fill="#64748b">Average Processing Time: </text>
                    <text x="650" y="505" fontSize="10" fill="#22c55e" fontWeight="bold">3.2 days</text>
                    <text x="530" y="525" fontSize="10" fill="#64748b">Current Approval Rate: </text>
                    <text x="650" y="525" fontSize="10" fill="#22c55e" fontWeight="bold">78.4%</text>
                    <text x="530" y="545" fontSize="10" fill="#64748b">System Uptime: </text>
                    <text x="650" y="545" fontSize="10" fill="#22c55e" fontWeight="bold">99.98%</text>
                    <text x="530" y="565" fontSize="10" fill="#64748b">API Response Time: </text>
                    <text x="650" y="565" fontSize="10" fill="#22c55e" fontWeight="bold">215 ms</text>
                  </svg>
                )}
                
                {activeTab === 'config' && (
                  <svg className="w-full h-full" viewBox="0 0 800 550" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Config/Builder Layout */}
                    <rect width="800" height="550" fill="#f8fafc" />
                    
                    {/* Header */}
                    <rect x="0" y="0" width="800" height="60" fill="#0f172a" />
                    <circle cx="40" cy="30" r="20" fill="#f8fafc" />
                    <text x="40" y="34" fontSize="12" fill="#0f172a" fontWeight="bold" textAnchor="middle">TX</text>
                    <text x="80" y="35" fontSize="16" fill="#f8fafc" fontWeight="bold">Form Builder</text>
                    <text x="200" y="35" fontSize="14" fill="#94a3b8">Business Loan Application</text>
                    
                    {/* Save Button */}
                    <rect x="680" y="20" width="80" height="30" rx="4" fill="#2563eb" />
                    <text x="720" y="38" fontSize="14" fill="#f8fafc" textAnchor="middle">Save</text>
                    
                    {/* Sidebar - Tool Panel */}
                    <rect x="0" y="60" width="200" height="490" fill="#1e293b" />
                    <text x="20" y="85" fontSize="12" fill="#94a3b8" fontWeight="bold">FORM ELEMENTS</text>
                    
                    <rect x="20" y="100" width="160" height="40" rx="4" fill="#475569" />
                    <text x="70" y="125" fontSize="14" fill="#f8fafc">Text Field</text>
                    <rect x="35" y="110" width="20" height="20" rx="2" fill="#f8fafc" stroke="#64748b" />
                    
                    <rect x="20" y="150" width="160" height="40" rx="4" fill="#475569" />
                    <text x="70" y="175" fontSize="14" fill="#f8fafc">Number Field</text>
                    <rect x="35" y="160" width="20" height="20" rx="2" fill="#f8fafc" stroke="#64748b" />
                    
                    <rect x="20" y="200" width="160" height="40" rx="4" fill="#475569" />
                    <text x="70" y="225" fontSize="14" fill="#f8fafc">Dropdown</text>
                    <rect x="35" y="210" width="20" height="20" rx="2" fill="#f8fafc" stroke="#64748b" />
                    
                    <rect x="20" y="250" width="160" height="40" rx="4" fill="#475569" />
                    <text x="70" y="275" fontSize="14" fill="#f8fafc">Date Picker</text>
                    <rect x="35" y="260" width="20" height="20" rx="2" fill="#f8fafc" stroke="#64748b" />
                    
                    <rect x="20" y="300" width="160" height="40" rx="4" fill="#475569" />
                    <text x="70" y="325" fontSize="14" fill="#f8fafc">File Upload</text>
                    <rect x="35" y="310" width="20" height="20" rx="2" fill="#f8fafc" stroke="#64748b" />
                    
                    <text x="20" y="365" fontSize="12" fill="#94a3b8" fontWeight="bold">LAYOUT</text>
                    <rect x="20" y="380" width="160" height="40" rx="4" fill="#475569" />
                    <text x="70" y="405" fontSize="14" fill="#f8fafc">Section</text>
                    <rect x="35" y="390" width="20" height="20" rx="2" fill="#f8fafc" stroke="#64748b" />
                    
                    <rect x="20" y="430" width="160" height="40" rx="4" fill="#475569" />
                    <text x="70" y="455" fontSize="14" fill="#f8fafc">Columns</text>
                    <rect x="35" y="440" width="20" height="20" rx="2" fill="#f8fafc" stroke="#64748b" />
                    
                    <text x="20" y="490" fontSize="12" fill="#94a3b8" fontWeight="bold">TECHNEXUS PLATFORM</text>
                    <text x="20" y="510" fontSize="10" fill="#f8fafc">Form Builder v2.4.1</text>
                    
                    {/* Main Configuration Area */}
                    <rect x="220" y="80" width="560" height="450" rx="8" fill="white" stroke="#e2e8f0" />
                    <rect x="220" y="80" width="560" height="50" rx="8" fill="#f1f5f9" />
                    <text x="240" y="110" fontSize="16" fill="#0f172a" fontWeight="bold">Business Loan Application</text>
                    <text x="550" y="110" fontSize="12" fill="#64748b">Last edited: Today, 2:45 PM</text>
                    
                    {/* Form Section Headers */}
                    <rect x="240" y="140" width="320" height="30" rx="4" fill="#f8fafc" />
                    <text x="260" y="160" fontSize="14" fill="#0f172a" fontWeight="bold">1. Business Information</text>
                    <circle x="540" y="155" r="8" fill="#e2e8f0" />
                    <text x="540" y="159" fontSize="12" fill="#64748b" textAnchor="middle">-</text>
                    
                    {/* Form Fields */}
                    <text x="240" y="190" fontSize="12" fill="#0f172a">Business Name *</text>
                    <rect x="240" y="200" width="250" height="30" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
                    <text x="250" y="220" fontSize="12" fill="#94a3b8">Acme Corporation</text>
                    
                    <text x="240" y="250" fontSize="12" fill="#0f172a">Business Type *</text>
                    <rect x="240" y="260" width="250" height="30" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
                    <text x="250" y="280" fontSize="12" fill="#94a3b8">Limited Liability Company (LLC)</text>
                    {/* <polyline points="470,270 480,275 470,280" stroke="#64748b" strokeWidth="1.5" fill="none" /> */}
                    
                    <text x="240" y="310" fontSize="12" fill="#0f172a">Tax ID / EIN *</text>
                    <rect x="240" y="320" width="250" height="30" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
                    <text x="250" y="340" fontSize="12" fill="#94a3b8">XX-XXXXXXX</text>
                    
                    <text x="240" y="370" fontSize="12" fill="#0f172a">Years in Business *</text>
                    <rect x="240" y="380" width="250" height="30" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
                    <text x="250" y="400" fontSize="12" fill="#94a3b8">5</text>
                    
                    {/* New Section */}
                    <rect x="240" y="430" width="320" height="30" rx="4" fill="#f8fafc" />
                    <text x="260" y="450" fontSize="14" fill="#0f172a" fontWeight="bold">2. Loan Details</text>
                    <circle x="540" y="445" r="8" fill="#e2e8f0" />
                    <text x="540" y="449" fontSize="12" fill="#64748b" textAnchor="middle">+</text>
                    
                    {/* Field Properties Panel */}
                    <rect x="580" y="140" width="180" height="220" rx="4" fill="#f1f5f9" />
                    <text x="595" y="160" fontSize="12" fill="#0f172a" fontWeight="bold">Field Properties</text>
                    <line x1="595" y1="170" x2="745" y2="170" stroke="#e2e8f0" />
                    
                    <text x="595" y="190" fontSize="10" fill="#64748b">FIELD TYPE</text>
                    <rect x="595" y="195" width="150" height="25" rx="4" fill="#ffffff" stroke="#e2e8f0" />
                    <text x="605" y="210" fontSize="10" fill="#0f172a">Text Field</text>
                    {/* <polyline points="730,205 740,210 730,215" stroke="#64748b" strokeWidth="1" fill="none" /> */}
                    
                    <text x="595" y="235" fontSize="10" fill="#64748b">LABEL</text>
                    <rect x="595" y="240" width="150" height="25" rx="4" fill="#ffffff" stroke="#e2e8f0" />
                    <text x="605" y="255" fontSize="10" fill="#0f172a">Business Name</text>
                    
                    <text x="595" y="280" fontSize="10" fill="#64748b">REQUIRED</text>
                    <rect x="595" y="285" width="15" height="15" rx="4" fill="#2563eb" />
                    {/* <polyline points="590,285 605,303 625,25" stroke="white" strokeWidth="1.5" fill="none" /> */}
                    
                    <rect x="595" y="315" width="70" height="30" rx="4" fill="#ffffff" stroke="#e2e8f0" />
                    <text x="630" y="335" fontSize="12" fill="#0f172a" textAnchor="middle">Cancel</text>
                    
                    <rect x="675" y="315" width="70" height="30" rx="4" fill="#2563eb" />
                    <text x="710" y="335" fontSize="12" fill="#ffffff" textAnchor="middle">Apply</text>
                    
                    {/* Selected Field Indicator */}
                    <rect x="240" y="200" width="250" height="30" rx="4" stroke="#2563eb" strokeWidth="2" strokeDasharray="0" fill="none" />
                    
                    {/* Navigation Controls */}
                    <rect x="670" y="500" width="90" height="30" rx="4" fill="#2563eb" />
                    <text x="715" y="520" fontSize="12" fill="#f8fafc" textAnchor="middle">Save Form</text>
                    
                    <rect x="570" y="500" width="90" height="30" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
                    <text x="615" y="520" fontSize="12" fill="#0f172a" textAnchor="middle">Preview</text>
                    
                    <rect x="470" y="500" width="90" height="30" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
                    <text x="515" y="520" fontSize="12" fill="#0f172a" textAnchor="middle">Cancel</text>
                  </svg>
                )}
                
                {activeTab === 'ai' && (
                  <svg className="w-full h-full" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* AI Assistant Layout */}
                    <rect width="800" height="450" fill="#f8fafc" />
                    
                    {/* Header */}
                    <rect x="0" y="0" width="800" height="60" fill="#0f172a" />
                    <circle cx="40" cy="30" r="20" fill="#f8fafc" />
                    <text x="40" y="34" fontSize="12" fill="#0f172a" fontWeight="bold" textAnchor="middle">TX</text>
                    <text x="80" y="35" fontSize="16" fill="#f8fafc" fontWeight="bold">AI Assistant</text>
                    
                    {/* Header Tabs */}
                    <rect x="250" y="20" width="140" height="30" rx="4" fill="#2563eb" />
                    <text x="320" y="38" fontSize="14" fill="#f8fafc" textAnchor="middle">Credit Analyst</text>
                    
                    <rect x="400" y="20" width="140" height="30" rx="4" fill="#1e293b" />
                    <text x="470" y="38" fontSize="14" fill="#94a3b8" textAnchor="middle">Risk Assessment</text>
                    
                    <rect x="550" y="20" width="140" height="30" rx="4" fill="#1e293b" />
                    <text x="620" y="38" fontSize="14" fill="#94a3b8" textAnchor="middle">Documentation</text>
                    
                    {/* Main Content Area */}
                    <rect x="0" y="60" width="800" height="390" fill="#f8fafc" />
                    
                    {/* Sidebar - Context Panel */}
                    <rect x="0" y="60" width="220" height="390" fill="#f1f5f9" />
                    <text x="20" y="90" fontSize="16" fill="#0f172a" fontWeight="bold">Context</text>
                    
                    <rect x="20" y="110" width="180" height="60" rx="4" fill="white" stroke="#e2e8f0" />
                    <text x="30" y="130" fontSize="12" fill="#0f172a" fontWeight="bold">Application #47293</text>
                    <text x="30" y="150" fontSize="12" fill="#64748b">John Smith - Business Loan</text>
                    <text x="30" y="165" fontSize="12" fill="#64748b">$125,000 - 5 years</text>
                    
                    <text x="20" y="200" fontSize="14" fill="#0f172a" fontWeight="bold">Key Metrics</text>
                    
                    <rect x="20" y="220" width="180" height="30" rx="4" fill="white" stroke="#e2e8f0" />
                    <text x="30" y="240" fontSize="12" fill="#0f172a">Credit Score:</text>
                    <text x="180" y="240" fontSize="12" fill="#0f172a" textAnchor="end" fontWeight="bold">720</text>
                    
                    <rect x="20" y="260" width="180" height="30" rx="4" fill="white" stroke="#e2e8f0" />
                    <text x="30" y="280" fontSize="12" fill="#0f172a">Debt-to-Income:</text>
                    <text x="180" y="280" fontSize="12" fill="#0f172a" textAnchor="end" fontWeight="bold">32%</text>
                    
                    <rect x="20" y="300" width="180" height="30" rx="4" fill="white" stroke="#e2e8f0" />
                    <text x="30" y="320" fontSize="12" fill="#0f172a">Business Age:</text>
                    <text x="180" y="320" fontSize="12" fill="#0f172a" textAnchor="end" fontWeight="bold">5 years</text>
                    
                    <rect x="20" y="340" width="180" height="30" rx="4" fill="white" stroke="#e2e8f0" />
                    <text x="30" y="360" fontSize="12" fill="#0f172a">Annual Revenue:</text>
                    <text x="180" y="360" fontSize="12" fill="#0f172a" textAnchor="end" fontWeight="bold">$980K</text>
                    
                    <rect x="20" y="380" width="180" height="30" rx="4" fill="white" stroke="#e2e8f0" />
                    <text x="30" y="400" fontSize="12" fill="#0f172a">Profit Margin:</text>
                    <text x="180" y="400" fontSize="12" fill="#0f172a" textAnchor="end" fontWeight="bold">14.2%</text>
                    
                    {/* Chat Interface */}
                    <rect x="240" y="80" width="540" height="50" rx="4" fill="#f1f5f9" />
                    <text x="260" y="110" fontSize="16" fill="#0f172a" fontWeight="bold">Credit Analysis Assistant</text>
                    <rect x="680" y="90" width="80" height="30" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
                    <text x="720" y="110" fontSize="12" fill="#64748b" textAnchor="middle">History</text>
                    
                    {/* AI Messages */}
                    <rect x="240" y="150" width="450" height="70" rx="8" fill="#f1f5f9" />
                    <text x="260" y="175" fontSize="14" fill="#0f172a">Hello! I'm analyzing application #47293 for John Smith's</text>
                    <text x="260" y="195" fontSize="14" fill="#0f172a">business loan request. How can I assist you today?</text>
                    <text x="260" y="215" fontSize="12" fill="#64748b">AI Assistant - 10:30 AM</text>
                    
                    {/* User Messages */}
                    <rect x="330" y="240" width="450" height="70" rx="8" fill="#e0f2fe" />
                    <text x="350" y="265" fontSize="14" fill="#0f172a">Can you analyze the risk profile for this application and</text>
                    <text x="350" y="285" fontSize="14" fill="#0f172a">recommend an appropriate interest rate?</text>
                    <text x="760" y="305" fontSize="12" fill="#64748b" textAnchor="end">You - 10:32 AM</text>
                    
                    {/* AI Response */}
                    <rect x="240" y="330" width="450" height="120" rx="8" fill="#f1f5f9" />
                    <text x="260" y="355" fontSize="14" fill="#0f172a">Based on my analysis, this is a moderate-risk application. The</text>
                    <text x="260" y="375" fontSize="14" fill="#0f172a">business shows consistent revenue growth and good profit</text>
                    <text x="260" y="395" fontSize="14" fill="#0f172a">margins. I recommend an interest rate of 6.5%, which is</text>
                    <text x="260" y="415" fontSize="14" fill="#0f172a">competitive for this risk profile while maintaining good returns.</text>
                    <text x="260" y="440" fontSize="12" fill="#64748b">AI Assistant - 10:33 AM</text>
                    
                    {/* Rate Suggestion Pills */}
                    <rect x="710" y="330" width="70" height="30" rx="15" fill="#ecfdf5" stroke="#10b981" />
                    <text x="745" y="350" fontSize="12" fill="#10b981" textAnchor="middle">6.5%</text>
                    
                    <rect x="710" y="370" width="70" height="30" rx="15" fill="#f8fafc" stroke="#e2e8f0" />
                    <text x="745" y="390" fontSize="12" fill="#64748b" textAnchor="middle">7.0%</text>
                    
                    <rect x="710" y="410" width="70" height="30" rx="15" fill="#f8fafc" stroke="#e2e8f0" />
                    <text x="745" y="430" fontSize="12" fill="#64748b" textAnchor="middle">5.9%</text>
                    
                    {/* Input Area */}
                    <rect x="240" y="470" width="540" height="50" rx="25" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                    <text x="270" y="500" fontSize="14" fill="#94a3b8">Type your message...</text>
                    <circle cx="740" cy="495" r="18" fill="#2563eb" />
                    <path d="M732 495 L740 502 L748 495" stroke="white" strokeWidth="2" fill="none" />
                  </svg>
                )}
                
                {activeTab === 'mobile' && (
                  <svg className="w-full h-full" viewBox="0 0 800 650" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Background */}
                    <rect width="800" height="650" fill="#f8fafc" />
                    
                    {/* iPhone 15 Pro Max Proportions (19.5:9 aspect ratio) */}
                    <g transform="translate(250, 25)">
                      {/* iPhone Frame - Using actual iPhone 15 Pro Max proportions */}
                      <rect x="0" y="0" width="300" height="600" rx="45" fill="#1a1a1a" /> {/* Outer frame */}
                      <rect x="3" y="3" width="294" height="594" rx="42" fill="#0f0f0f" /> {/* Inner bezel */}
                      <rect x="9" y="9" width="282" height="582" rx="35" fill="000000" /> {/* Screen area */}
                      
                      {/* Screen Content Area */}
                      <rect x="9" y="9" width="282" height="582" rx="35" fill="#f8fafc" />
                      
                      {/* Status Bar */}
                      <text x="25" y="40" fontSize="9" fill="#ffffff" fontWeight="bold">9:41</text>
                      
                      {/* Status Icons */}
                      <rect x="220" y="36" width="20" height="8" rx="1" fill="#ffffff" />
                      <rect x="242" y="36" width="10" height="8" rx="1" fill="#ffffff" />
                      <path d="M255 36 A3 3 0 0 1 265 36 A3 3 0 0 1 275 36" stroke="#ffffff" strokeWidth="1" fill="none" />
                      
                      {/* App Content */}
                      {/* App Header */}
                      <rect x="9" y="50" width="282" height="50" rx="0" fill="#000000" />
                      <text x="150" y="80" fontSize="15" fill="#ffffff" fontWeight="bold" textAnchor="middle">Technexus</text>
                      <circle cx="255" cy="75" r="15" fill="#ffffff" />
                      <text x="255" y="79" fontSize="10" fill="#000000" textAnchor="middle" fontWeight="bold">KD</text>
                      
                      {/* Dynamic Island */}
                      <rect x="100" y="17" width="100" height="25" rx="12" fill="#000000" />
                      <ellipse cx="150" cy="29" rx="50" ry="12" fill="#0f0f0f" />
                      <circle cx="120" cy="29" r="4" fill="#222222" /> {/* Front camera */}
                      <ellipse cx="150" cy="29" rx="20" ry="4" fill="#222222" opacity="0.8" /> {/* Camera sensors */}
                      
                      {/* Portfolio Overview */}
                      <rect x="20" y="110" width="260" height="80" rx="12" fill="#ffffff" stroke="#e2e8f0" />
                      <text x="35" y="130" fontSize="10" fill="#64748b">TOTAL PORTFOLIO</text>
                      <text x="35" y="155" fontSize="18" fill="#0f172a" fontWeight="bold">$12,450,000</text>
                      <rect x="35" y="165" width="70" height="16" rx="8" fill="#dcfce7" />
                      <text x="70" y="177" fontSize="9" fill="#16a34a" textAnchor="middle">+8.2%</text>
                      
                      {/* Stats Row */}
                      <text x="20" y="210" fontSize="12" fill="#ffffff" fontWeight="bold">Overview</text>
                      
                      <rect x="20" y="220" width="125" height="70" rx="12" fill="#ffffff" stroke="#e2e8f0" />
                      <text x="35" y="240" fontSize="10" fill="#64748b">ACTIVE LOANS</text>
                      <text x="35" y="260" fontSize="15" fill="#0f172a" fontWeight="bold">842</text>
                      <rect x="35" y="268" width="60" height="12" rx="6" fill="#dcfce7" />
                      <text x="65" y="278" fontSize="9" fill="#16a34a" textAnchor="middle">+24 new</text>
                      
                      <rect x="155" y="220" width="125" height="70" rx="12" fill="#ffffff" stroke="#e2e8f0" />
                      <text x="170" y="240" fontSize="10" fill="#64748b">PENDING</text>
                      <text x="170" y="260" fontSize="15" fill="#0f172a" fontWeight="bold">36</text>
                      <rect x="170" y="268" width="60" height="12" rx="6" fill="#fee2e2" />
                      <text x="200" y="278" fontSize="9" fill="#dc2626" textAnchor="middle">4 urgent</text>
                      
                      {/* Recent Activity */}
                      <text x="20" y="310" fontSize="12" fill="#ffffff" fontWeight="bold">Recent Activity</text>
                      
                      <rect x="20" y="320" width="260" height="55" rx="12" fill="#ffffff" stroke="#e2e8f0" />
                      <circle cx="40" cy="347" r="8" fill="#bfdbfe" />
                      <text x="40" y="350" fontSize="8" fill="#1e40af" textAnchor="middle">✓</text>
                      <text x="60" y="340" fontSize="10" fill="#0f172a" fontWeight="bold">Loan #39281 Approved</text>
                      <text x="60" y="355" fontSize="9" fill="#64748b">$82,500 - Business Expansion</text>
                      <text x="265" y="340" fontSize="8" fill="#64748b" textAnchor="end">10m</text>
                      
                      <rect x="20" y="385" width="260" height="55" rx="12" fill="#ffffff" stroke="#e2e8f0" />
                      <circle cx="40" cy="412" r="8" fill="#dbeafe" />
                      <text x="40" y="415" fontSize="8" fill="#1e40af" textAnchor="middle">+</text>
                      <text x="60" y="405" fontSize="10" fill="#0f172a" fontWeight="bold">New Application</text>
                      <text x="60" y="420" fontSize="9" fill="#64748b">J. Smith - $125,000 Request</text>
                      <text x="265" y="405" fontSize="8" fill="#64748b" textAnchor="end">25m</text>
                      
                      <rect x="20" y="450" width="260" height="55" rx="12" fill="#ffffff" stroke="#e2e8f0" />
                      <circle cx="40" cy="477" r="8" fill="#fef3c7" />
                      <text x="40" y="480" fontSize="8" fill="#92400e" textAnchor="middle">$</text>
                      <text x="60" y="470" fontSize="10" fill="#0f172a" fontWeight="bold">Payment Received</text>
                      <text x="60" y="485" fontSize="9" fill="#64748b">A. Johnson - $2,450 Monthly</text>
                      <text x="265" y="470" fontSize="8" fill="#64748b" textAnchor="end">1h</text>
                      
                      {/* Tab Bar */}
                      <rect x="9" y="515" width="282" height="75" rx="40" fill="#ffffff" strokeWidth="0" />
                      
                      <g transform="translate(35, 530)">
                        <circle cx="0" cy="10" r="4" fill="#000000" />
                        <text x="0" y="30" fontSize="8" fill="#000000" textAnchor="middle">Home</text>
                      </g>
                      
                      <g transform="translate(90, 530)">
                        <circle cx="0" cy="10" r="3" fill="#94a3b8" />
                        <text x="0" y="30" fontSize="8" fill="#94a3b8" textAnchor="middle">Loans</text>
                      </g>
                      
                      <g transform="translate(150, 530)">
                        <circle cx="0" cy="10" r="3" fill="#94a3b8" />
                        <text x="0" y="30" fontSize="8" fill="#94a3b8" textAnchor="middle">Reports</text>
                      </g>
                      
                      <g transform="translate(210, 530)">
                        <circle cx="0" cy="10" r="3" fill="#94a3b8" />
                        <text x="0" y="30" fontSize="8" fill="#94a3b8" textAnchor="middle">Profile</text>
                      </g>
                      
                      <g transform="translate(265, 530)">
                        <circle cx="0" cy="10" r="3" fill="#94a3b8" />
                        <text x="0" y="30" fontSize="8" fill="#94a3b8" textAnchor="middle">Settings</text>
                      </g>
                      
                      {/* Home Indicator */}
                      <rect x="105" y="580" width="70" height="4" rx="2" fill="#ffffff" />
                      
                      {/* Side buttons (subtle hints) */}
                      <rect x="-5" y="120" width="2" height="30" rx="1" fill="#2a2a2a" />
                      <rect x="-5" y="160" width="2" height="60" rx="1" fill="#2a2a2a" />
                      <rect x="303" y="140" width="2" height="40" rx="1" fill="#2a2a2a" />
                    </g>
                  </svg>
                )}
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Advanced Capabilities</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-white-600 max-w-3xl mx-auto mt-6">
              Beyond the basics, our platform offers sophisticated tools to handle complex lending scenarios and requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {advancedCapabilities.map((capability, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0 mr-4 text-white">{capability.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{capability.title}</h3>
                  <p className="text-white-600">{capability.description}</p>
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
              {/* Integration partner logos */}
              {[
                'Salesforce',
                'Stripe', 
                'DocuSign',
                'Plaid',
                'Twilio',
                'QuickBooks',
                'Experian',
                'TransUnion', 
                'Equifax',
                'Zendesk',
                'HubSpot',
                'Microsoft'
              ].map((partner, index) => (
                <div key={index} className="aspect-w-3 aspect-h-2">
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg transition-all duration-200 hover:shadow-md">
                    <span className="text-gray-700 font-medium">{partner}</span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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