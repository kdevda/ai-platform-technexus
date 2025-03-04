"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function AIRelationsPage() {
  const features = [
    {
      title: 'Intelligent Customer Segmentation',
      description: 'Automatically categorize your customers based on behavior, needs, and potential, enabling targeted outreach strategies.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Personalized Communication Flows',
      description: 'Create dynamic, multi-channel communication journeys tailored to individual customer preferences and behaviors.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: 'Behavior Prediction & Analysis',
      description: 'Anticipate customer needs and financial behaviors with AI models that continuously learn and improve over time.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Engagement Optimization',
      description: 'Automatically determine the best time, channel, and message content for maximum customer engagement and response rates.',
      icon: (
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      )
    }
  ];

  const benefits = [
    {
      title: 'Increased Conversion Rates',
      description: 'Convert more prospects into customers with precisely targeted outreach based on data-driven insights.',
      percentage: '32%'
    },
    {
      title: 'Reduced Customer Acquisition Cost',
      description: 'Lower your cost per acquisition by focusing resources on the most promising customer segments.',
      percentage: '27%'
    },
    {
      title: 'Improved Customer Retention',
      description: 'Strengthen relationships and reduce churn by anticipating needs and delivering personalized experiences.',
      percentage: '41%'
    },
    {
      title: 'Enhanced Operational Efficiency',
      description: 'Automate repetitive tasks and focus your team on high-value relationship building activities.',
      percentage: '56%'
    }
  ];

  const usesCases = [
    {
      title: 'Customer Retention Programs',
      description: 'Identify at-risk customers before they churn and deploy targeted retention strategies automatically.',
      icon: (
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: 'Cross-Selling Campaigns',
      description: 'Recommend the right financial products to the right customers at the right time based on their financial profile.',
      icon: (
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Lifecycle Marketing',
      description: 'Create personalized communication strategies for each stage of the customer journey, from acquisition to advocacy.',
      icon: (
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Service Personalization',
      description: 'Tailor your service approach based on individual preferences, previous interactions, and predicted needs.',
      icon: (
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
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
                AI Relations
              </h1>
              <p className="text-gray-600 text-lg md:text-xl mb-8">
                Build stronger customer relationships with AI-powered insights and automated engagement that drive conversion and retention.
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
              Our AI Relations platform combines advanced machine learning with intuitive workflow tools to transform how you build customer relationships.
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
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              A seamless process that transforms your customer data into actionable intelligence and automated engagement.
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="relative bg-white p-6 rounded-xl border border-gray-200 text-center">
                <div className="flex items-center justify-center w-14 h-14 text-white bg-black rounded-full mx-auto mb-6 relative z-10">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-black">Data Integration</h3>
                <p className="text-gray-600 text-sm">Connect your data sources for a unified view of customer interactions and behaviors.</p>
              </div>
              
              <div className="relative bg-white p-6 rounded-xl border border-gray-200 text-center">
                <div className="flex items-center justify-center w-14 h-14 text-white bg-black rounded-full mx-auto mb-6 relative z-10">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-black">AI Analysis</h3>
                <p className="text-gray-600 text-sm">Our models analyze patterns, predict behaviors, and identify high-value opportunities.</p>
              </div>
              
              <div className="relative bg-white p-6 rounded-xl border border-gray-200 text-center">
                <div className="flex items-center justify-center w-14 h-14 text-white bg-black rounded-full mx-auto mb-6 relative z-10">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-black">Strategy Design</h3>
                <p className="text-gray-600 text-sm">Create personalized engagement strategies based on AI-generated insights.</p>
              </div>
              
              <div className="relative bg-white p-6 rounded-xl border border-gray-200 text-center">
                <div className="flex items-center justify-center w-14 h-14 text-white bg-black rounded-full mx-auto mb-6 relative z-10">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-black">Automated Execution</h3>
                <p className="text-gray-600 text-sm">Deploy multichannel communications with continuous optimization based on results.</p>
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
              Our clients report significant improvements across key performance indicators after implementing AI Relations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow text-center">
                <div className="text-4xl md:text-5xl font-bold text-black mb-4">{benefit.percentage}</div>
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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-6">
                Dedicated Relations AI Assistant
              </h2>
              <p className="text-gray-600 mb-8">
                Empower your team with a virtual relationship specialist that helps build stronger customer connections through AI-powered insights and recommendations.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Customer Insights</h3>
                    <p className="text-gray-600">Provides real-time analysis of customer behavior patterns and engagement preferences.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Communication Coach</h3>
                    <p className="text-gray-600">Suggests personalized messaging and optimal engagement strategies for each customer segment.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Opportunity Detection</h3>
                    <p className="text-gray-600">Automatically identifies cross-selling and upselling opportunities based on customer profiles.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-black">Relations AI Assistant</h3>
                    <p className="text-xs text-gray-500">Always available</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">Good morning! I've analyzed yesterday's customer interactions and found 3 high-value opportunities you might want to prioritize today.</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">Customer Johnson has been browsing premium plans for the last week. Based on their profile, they're 68% likely to upgrade with the right incentive.</p>
                  </div>
                  <div className="bg-black p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                    <p className="text-sm text-white">What messaging approach do you recommend for Johnson?</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">Based on Johnson's communication history, a personal call highlighting the cost savings of annual billing would be most effective. I've drafted talking points for you to review.</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">The Relations AI Assistant helps your team build stronger customer relationships through personalized insights and recommendations.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Use Cases */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-black">Common Use Cases</h2>
              <p className="text-gray-600 mb-8">
                AI Relations adapts to a wide range of customer relationship scenarios, helping financial institutions enhance their customer experience.
              </p>
              
              <div className="space-y-8">
                {usesCases.map((useCase, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                      {useCase.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-black">{useCase.title}</h3>
                      <p className="text-gray-600">{useCase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-black">Early Adopter Program</h3>
                <div className="mb-6 text-sm text-gray-500">LIMITED AVAILABILITY</div>
                <p className="text-gray-600 mb-6">
                  Join our exclusive Early Adopter Program for AI Relations and be among the first to leverage this powerful technology for your customer engagement strategy.
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
              AI Relations connects with your existing tech stack through pre-built connectors and open APIs.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-20 flex items-center justify-center">
                  <div className="w-full h-12 bg-gray-100 rounded-md flex items-center justify-center">
                    <span className="font-medium text-gray-500">Integration {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <Link href="/solutions/integrations" className="inline-flex items-center text-black font-medium hover:translate-x-2 transition-transform">
                View All Integrations
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to transform your customer relationships?</h2>
              <p className="text-gray-300 mb-8">
                Get started with AI Relations today and experience the power of intelligent, automated customer engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
                  Contact Sales
                </Link>
                <Link href="/solutions/demo" className="bg-transparent border border-white text-white hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors">
                  Request Demo
                </Link>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Frequently Asked Questions</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-2 text-white">How quickly can we implement AI Relations?</h4>
                  <p className="text-gray-300 text-sm">
                    Most clients are up and running within 4-6 weeks, with initial data integration completed in as little as 10 days.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2 text-white">Do we need to replace our existing CRM system?</h4>
                  <p className="text-gray-300 text-sm">
                    No, AI Relations is designed to integrate with your existing CRM and enhance its capabilities with AI-powered insights.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2 text-white">How do you ensure AI recommendations are ethical and fair?</h4>
                  <p className="text-gray-300 text-sm">
                    Our models undergo rigorous testing for bias and fairness, with transparency tools that explain the reasoning behind recommendations.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <Link href="/faq" className="text-sm text-gray-300 hover:text-white flex items-center">
                  View all FAQs
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 