"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function SolutionsPage() {
  const solutions = [
    {
      id: 'ai-relations',
      title: 'AI Relations',
      description: 'Intelligent relationship management powered by ethical AI that builds stronger connections with your customers.',
      features: [
        'Smart customer segmentation',
        'Personalized communication flows',
        'Behavior prediction and analysis',
        'Automated engagement optimization',
        'Dedicated relations AI assistant'
      ],
      image: '/solutions/ai-relations.svg',
      slug: 'ai-relations'
    },
    {
      id: 'ai-originations',
      title: 'AI Originations',
      description: 'Streamline your loan origination process with AI-powered workflows, application processing, and initial risk assessment.',
      features: [
        'Automated application processing',
        'Document verification & extraction',
        'Initial risk screening',
        'Efficient digital workflows',
        'Dedicated originations AI assistant'
      ],
      image: '/solutions/ai-originations.svg',
      slug: 'ai-originations'
    },
    {
      id: 'ai-credit',
      title: 'AI Credit',
      description: 'Advanced analytics and machine learning for more accurate, fair and inclusive credit decisions.',
      features: [
        'Alternative data analysis',
        'Explainable AI credit models',
        'Fair lending compliance',
        'Credit risk optimization',
        'Dedicated credit AI assistant'
      ],
      image: '/solutions/ai-credit.svg',
      slug: 'ai-credit'
    },
    {
      id: 'ai-servicing',
      title: 'AI Servicing',
      description: 'Enhance loan servicing operations with intelligent automation, customer engagement, and portfolio management.',
      features: [
        'Automated payment processing',
        'Intelligent communication',
        'Proactive account management',
        'Self-service customer portal',
        'Dedicated servicing AI assistant'
      ],
      image: '/solutions/ai-servicing.svg',
      slug: 'ai-servicing'
    },
    {
      id: 'ai-collections',
      title: 'AI Collections',
      description: 'Transform collections with predictive delinquency detection, personalized strategies, and optimized recovery workflows.',
      features: [
        'Delinquency prediction',
        'Personalized collection strategies',
        'Omnichannel communication',
        'Regulatory compliance',
        'Dedicated collections AI assistant'
      ],
      image: '/solutions/ai-collections.svg',
      slug: 'ai-collections'
    },
    {
      id: 'ai-treasury',
      title: 'AI Treasury',
      description: 'Optimize treasury operations with AI-powered cash forecasting, liquidity management, and investment optimization.',
      features: [
        'Cash flow forecasting',
        'Liquidity management',
        'Risk detection & mitigation',
        'Investment optimization',
        'Dedicated treasury AI assistant'
      ],
      image: '/solutions/ai-treasury.svg',
      slug: 'ai-treasury'
    },
    {
      id: 'laas',
      title: 'Lending as a Service (LaaS)',
      description: 'Our complete lending infrastructure as a customizable, API-first service that powers your financial products.',
      features: [
        'White-label lending capabilities',
        'Flexible API integration',
        'Scalable infrastructure',
        'Comprehensive compliance framework'
      ],
      image: '/solutions/laas.svg',
      slug: 'lending-as-a-service'
    }
  ];

  const industries = [
    {
      name: 'Banking',
      description: 'Empower traditional financial institutions with AI-driven lending capabilities.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      name: 'Fintech',
      description: 'Accelerate innovation with ready-to-integrate lending infrastructure.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      name: 'Credit Unions',
      description: 'Strengthen member relationships with personalized lending experiences.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      name: 'Retail',
      description: 'Integrate financing options into your customer shopping experience.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
              Our Solutions
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mt-6">
              Transforming the lending industry with ethical AI technology that makes financial services more accessible, efficient, and fair.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Overview */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Comprehensive Solutions Suite</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our AI-powered solutions for every stage of the lending lifecycle, from customer acquisition to loan servicing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {solutions.slice(0, 6).map((solution, index) => (
              <div key={solution.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group">
                <div className="p-8">
                  <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-gray-50 mb-6">
                    <div className="text-3xl font-bold text-black">{index + 1}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-black">{solution.title}</h3>
                  <p className="text-gray-600 mb-6">{solution.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm uppercase tracking-wider text-black mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-black mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href={`/solutions/${solution.slug}`} className="inline-flex items-center text-black font-medium group-hover:translate-x-2 transition-transform">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Lending as a Service - Wider Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group lg:col-span-2">
              <div className="p-8">
                <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-gray-50 mb-6">
                  <div className="text-3xl font-bold text-black">7</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black">{solutions[6].title}</h3>
                <p className="text-gray-600 mb-6">{solutions[6].description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-black mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {solutions[6].features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-black mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-black mb-3">Service Models</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-black mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">Core Platform</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-black mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">Professional Services</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-black mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">Enterprise Solutions</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-black mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">Custom Integrations</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Link href={`/solutions/${solutions[6].slug}`} className="inline-flex items-center text-black font-medium group-hover:translate-x-2 transition-transform">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform vs Service */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Platform & Services</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Flexible options to meet your business needs, from full-platform implementation to API-based service integration.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-xl p-8 bg-gray-50 relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="absolute right-0 top-0 w-24 h-24 bg-gray-100 rounded-bl-full -mr-12 -mt-12 transition-all duration-300 group-hover:bg-gray-200"></div>
              
              <h3 className="text-2xl font-bold mb-4 text-black">Platform Solution</h3>
              <p className="text-gray-600 mb-6">
                A comprehensive, end-to-end lending platform that includes all our AI technologies, user interfaces, and operational workflows in one integrated solution.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Full-featured lending ecosystem</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Customizable workflows and UIs</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Operational dashboards and analytics</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Dedicated implementation support</span>
                </div>
              </div>
              
              <Link href="/solutions/platform" className="inline-block border-2 border-black text-black hover:bg-black hover:text-white py-3 px-6 rounded-lg font-medium transition-colors">
                Explore Platform
              </Link>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-8 bg-gray-50 relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="absolute right-0 top-0 w-24 h-24 bg-gray-100 rounded-bl-full -mr-12 -mt-12 transition-all duration-300 group-hover:bg-gray-200"></div>
              
              <h3 className="text-2xl font-bold mb-4 text-black">Lending as a Service (LaaS)</h3>
              <p className="text-gray-600 mb-6">
                API-first lending infrastructure that lets you integrate our powerful lending capabilities directly into your existing systems and applications.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">RESTful API ecosystem</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Seamless third-party integration</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Developer-friendly documentation</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Flexible deployment options</span>
                </div>
              </div>
              
              <Link href="/solutions/lending-as-a-service" className="inline-block border-2 border-black text-black hover:bg-black hover:text-white py-3 px-6 rounded-lg font-medium transition-colors">
                Explore LaaS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Industry Solutions</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Tailored approaches for different industry verticals, addressing specific lending challenges and opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">{industry.name}</h3>
                <p className="text-gray-600 mb-4">{industry.description}</p>
                <Link href={`/solutions/industries/${industry.name.toLowerCase()}`} className="inline-flex items-center text-black font-medium hover:translate-x-2 transition-transform">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-black">Our Technology Stack</h2>
              <p className="text-gray-600 mb-8">
                Built with cutting-edge technologies and best practices in security, scalability, and performance to deliver enterprise-grade lending solutions.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-black">AI & Machine Learning</h3>
                  <p className="text-gray-600">
                    Ethical AI models that balance automation with transparency and fairness, using both traditional and alternative data sources.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-3 text-black">Cloud-Native Architecture</h3>
                  <p className="text-gray-600">
                    Containerized, microservices-based applications deployed on secure cloud infrastructure for maximum reliability and elasticity.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-3 text-black">Security & Compliance</h3>
                  <p className="text-gray-600">
                    Bank-grade security with comprehensive compliance frameworks built into every component of our platform.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-200 p-8 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-8 w-full max-w-md">
                  <div className="space-y-8">
                    <div className="h-24 w-full border border-gray-200 rounded-lg bg-white p-4 flex items-center justify-center shadow-sm">
                      <div className="text-center">
                        <div className="font-bold mb-1 text-black">API Gateway</div>
                        <div className="text-xs text-gray-500">REST/GraphQL</div>
                      </div>
                    </div>
                    
                    <div className="h-24 w-full border border-gray-200 rounded-lg bg-white p-4 flex items-center justify-center shadow-sm">
                      <div className="text-center">
                        <div className="font-bold mb-1 text-black">AI Engine</div>
                        <div className="text-xs text-gray-500">ML Models</div>
                      </div>
                    </div>
                    
                    <div className="h-24 w-full border border-gray-200 rounded-lg bg-white p-4 flex items-center justify-center shadow-sm">
                      <div className="text-center">
                        <div className="font-bold mb-1 text-black">Data Lake</div>
                        <div className="text-xs text-gray-500">Analytics</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="h-24 w-full border border-gray-200 rounded-lg bg-white p-4 flex items-center justify-center shadow-sm">
                      <div className="text-center">
                        <div className="font-bold mb-1 text-black">Security</div>
                        <div className="text-xs text-gray-500">Encryption</div>
                      </div>
                    </div>
                    
                    <div className="h-24 w-full border border-gray-200 rounded-lg bg-white p-4 flex items-center justify-center shadow-sm">
                      <div className="text-center">
                        <div className="font-bold mb-1 text-black">Workflow</div>
                        <div className="text-xs text-gray-500">Automation</div>
                      </div>
                    </div>
                    
                    <div className="h-24 w-full border border-gray-200 rounded-lg bg-white p-4 flex items-center justify-center shadow-sm">
                      <div className="text-center">
                        <div className="font-bold mb-1 text-black">Integrations</div>
                        <div className="text-xs text-gray-500">Third-party</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your lending operations?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Schedule a consultation with our solutions team to discuss how our AI-powered lending technology can help your business grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
                Contact Sales
              </Link>
              <Link href="/solutions/demo" className="bg-transparent border border-white text-white hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors">
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 