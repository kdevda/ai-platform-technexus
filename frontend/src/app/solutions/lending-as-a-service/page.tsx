"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function LendingAsAServicePage() {
  const features = [
    {
      title: <span className="text-black">End-to-End Lending Platform</span>,
      description: 'A complete turnkey solution that handles the entire lending process from application to servicing and collections.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    },
    {
      title: <span className="text-black">AI-Powered Credit Decisions</span>,
      description: 'Advanced models that evaluate creditworthiness beyond traditional metrics, enabling more inclusive and accurate lending.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: <span className="text-black">White-Label Integration</span>,
      description: 'Seamlessly integrate lending capabilities into your existing platforms with your own branding and user experience.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: <span className="text-black">Regulatory Compliance Engine</span>,
      description: 'Built-in compliance safeguards and automated reporting to ensure adherence to applicable lending regulations.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    }
  ];

  const benefits = [
    {
      title: <span className="text-black">Accelerated Time-to-Market</span>,
      description: 'Launch lending products in weeks, not months, without building complex infrastructure from scratch.',
      value: '75%'
    },
    {
      title: <span className="text-black">Reduced Operational Costs</span>,
      description: 'Eliminate the need for extensive IT resources and maintenance while lowering processing costs per loan.',
      value: '60%'
    },
    {
      title: <span className="text-black">Increased Approval Rates</span>,
      description: 'Accept more qualified borrowers with AI-powered underwriting that looks beyond traditional credit metrics.',
      value: '35%'
    },
    {
      title: <span className="text-black">Lower Default Rates</span>,
      description: 'Improve portfolio performance with predictive analytics that identify risk factors traditional systems miss.',
      value: '40%'
    }
  ];

  const serviceModels = [
    {
      title: <span className="text-black">Core LaaS Platform</span>,
      features: [
        'Digital application processing',
        'Automated underwriting',
        'Document verification',
        'Loan servicing dashboard',
        'Payment processing',
        'Basic reporting'
      ],
      recommended: false
    },
    {
      title: <span className="text-black">LaaS Professional</span>,
      features: [
        'Everything in Core',
        'Advanced fraud detection',
        'Custom decision rules',
        'Multi-channel communications',
        'Portfolio analytics',
        'API integrations'
      ],
      recommended: true
    },
    {
      title: <span className="text-black">LaaS Enterprise</span>,
      features: [
        'Everything in Professional',
        'White-label customization',
        'Dedicated support team',
        'Custom compliance modules',
        'Advanced risk modeling',
        'Data science services'
      ],
      recommended: false
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
                Lending as a Service
              </h1>
              <p className="text-gray-600 text-lg md:text-xl mb-8">
                Deploy a complete, AI-powered lending infrastructure without building from scratch. Launch, scale, and optimize lending operations with unprecedented speed and efficiency.
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
            <div className="relative h-64 md:h-96 lg:h-auto rounded-xl overflow-hidden bg-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center">
                <svg className="w-48 h-48 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-black text-3xl md:text-4xl font-bold tracking-tight">Key Features</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our Lending as a Service platform provides all the components needed to run a sophisticated lending operation.
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

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-black text-3xl md:text-4xl font-bold tracking-tight">Benefits</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Organizations using our LaaS platform see rapid improvements in lending efficiency and profitability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow text-center">
                <div className="text-4xl md:text-5xl font-bold text-black mb-4">{benefit.value}</div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Models */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-black text-3xl md:text-4xl font-bold tracking-tight">Service Models</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Choose the right level of service to match your organization's needs and growth stage.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceModels.map((model, index) => (
              <div key={index} className={`bg-white p-8 rounded-xl border ${model.recommended ? 'border-black' : 'border-gray-200'} relative ${model.recommended ? 'shadow-md' : ''}`}>
                {model.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-6 text-center">{model.title}</h3>
                <ul className="space-y-3 mb-8">
                  {model.features.map((feature, i) => (
                    <li key={i} className="text-black flex items-start">
                      <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto text-center">
                  <Link href="/contact" className={`inline-block px-6 py-3 rounded-lg font-medium transition-colors ${model.recommended ? 'bg-black text-white hover:bg-gray-800' : 'border-2 border-black text-black hover:bg-black hover:text-white'}`}>
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-black text-3xl md:text-4xl font-bold tracking-tight mb-6">Implementation Process</h2>
              <p className="text-gray-600 mb-8">
                Our streamlined implementation process gets you up and running with minimal disruption to your operations.
              </p>
              
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-black text-white rounded-full mr-4 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-black text-lg font-bold mb-2">Discovery & Planning</h3>
                    <p className="text-gray-600">We analyze your existing lending processes and define integration requirements.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-black text-white rounded-full mr-4 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-black text-lg font-bold mb-2">Configuration & Customization</h3>
                    <p className="text-gray-600">We tailor the platform to your specific products, decision criteria, and compliance needs.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-black text-white rounded-full mr-4 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-black text-lg font-bold mb-2">Integration & Testing</h3>
                    <p className="text-gray-600">We connect with your existing systems and thoroughly test all processes.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-black text-white rounded-full mr-4 font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-black text-lg font-bold mb-2">Launch & Ongoing Support</h3>
                    <p className="text-gray-600">We provide training, monitor performance, and deliver continuous improvements.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="text-black text-2xl font-bold mb-6">Typical Timeline</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-black font-medium">Discovery & Planning</span>
                    <span className="text-gray-500">1-2 weeks</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-black h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-black font-medium">Configuration & Customization</span>
                    <span className="text-gray-500">2-4 weeks</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-black h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-black font-medium">Integration & Testing</span>
                    <span className="text-gray-500">3-6 weeks</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-black h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-black font-medium">Launch & Initial Support</span>
                    <span className="text-gray-500">1-2 weeks</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-black h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-black font-medium">Total: 7-14 weeks to full deployment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-black text-3xl md:text-4xl font-bold tracking-tight">Industry Applications</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our Lending as a Service platform adapts to a wide range of lending scenarios across industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
              <div className="mb-6">
                <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-black text-xl font-bold mb-3">Banking & Credit Unions</h3>
              <ul className="space-y-2 mb-6 text-gray-600">
                <li>• Personal loans</li>
                <li>• Small business lending</li>
                <li>• Line of credit products</li>
                <li>• Credit builder loans</li>
              </ul>
              <Link href="/solutions/banking" className="text-black font-medium hover:underline inline-flex items-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
              <div className="mb-6">
                <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-black text-xl font-bold mb-3">Retail & E-commerce</h3>
              <ul className="space-y-2 mb-6 text-gray-600">
                <li>• Buy-now-pay-later</li>
                <li>• Point-of-sale financing</li>
                <li>• Store credit cards</li>
                <li>• Customer financing</li>
              </ul>
              <Link href="/solutions/retail" className="text-black font-medium hover:underline inline-flex items-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
              <div className="mb-6">
                <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-black text-xl font-bold mb-3">Fintech Startups</h3>
              <ul className="space-y-2 mb-6 text-gray-600">
                <li>• Embedded lending</li>
                <li>• Specialized credit products</li>
                <li>• Alternative lending models</li>
                <li>• Rapid product testing</li>
              </ul>
              <Link href="/solutions/fintech" className="text-black font-medium hover:underline inline-flex items-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your lending operations?</h2>
              <p className="text-gray-300 mb-8">
                Get started with our Lending as a Service platform and launch market-ready loan products in weeks, not months.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
                  Contact Sales
                </Link>
                <Link href="/solutions/demo" className="bg-transparent border border-white text-white hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors">
                  Schedule Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 