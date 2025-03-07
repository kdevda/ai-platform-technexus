import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function AITreasuryPage() {
  const features = [
    {
      title: "Cash Flow Forecasting",
      description: "AI-powered predictive analytics that accurately forecast future cash positions based on historical data and market trends.",
      icon: (
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Automated Liquidity Management",
      description: "Dynamic allocation of funds across accounts to optimize interest earnings while ensuring sufficient liquidity for operations.",
      icon: (
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Risk Detection & Mitigation",
      description: "Continuous monitoring of transactions for fraud, compliance risks, and market volatility with automated response protocols.",
      icon: (
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      title: "Investment Portfolio Optimization",
      description: "Algorithmic analysis of investment opportunities to maximize returns within defined risk parameters and regulatory constraints.",
      icon: (
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const benefits = [
    {
      title: "Improved Fund Utilization",
      description: "More efficient use of available funds through optimized allocation"
    },
    {
      title: "Reduced Operating Costs",
      description: "Lower costs through automation of treasury operations"
    },
    {
      title: "Enhanced Interest Income",
      description: "Increased interest earnings through better cash positioning"
    },
    {
      title: "Faster Decision Making",
      description: "Accelerated financial decisions with real-time analytics"
    }
  ];

  const capabilities = [
    {
      title: "Cash Management",
      items: [
        "Real-time cash position monitoring",
        "Automated cash concentration",
        "Multi-currency support",
        "Bank relationship management"
      ]
    },
    {
      title: "Investment Management",
      items: [
        "Portfolio optimization",
        "Risk-adjusted return analysis",
        "Maturity laddering",
        "Benchmark performance tracking"
      ]
    },
    {
      title: "Risk Management",
      items: [
        "Interest rate risk hedging",
        "FX exposure management",
        "Counterparty risk assessment",
        "Compliance monitoring"
      ]
    },
    {
      title: "Financial Analytics",
      items: [
        "Custom reporting dashboards",
        "Scenario modeling",
        "Stress testing",
        "KPI tracking"
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
                AI Treasury
              </h1>
              <p className="text-gray-600 text-lg md:text-xl mb-8">
                Optimize cash management, investment decisions, and liquidity planning with AI-driven treasury solutions.
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

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Key Features</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our AI Treasury solution leverages advanced analytics and automation to optimize cash flow, investments, and risk management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-black">
                How AI Treasury Works
              </h2>
              <p className="text-gray-600 mb-8">
                Our solution integrates with your existing financial systems to provide intelligent treasury management across the entire cash lifecycle.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white mr-4 flex-shrink-0">
                    <span className="font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">Data Integration</h3>
                    <p className="text-gray-600">Connect with your ERP, bank accounts, market data feeds, and other financial systems to create a unified data foundation.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white mr-4 flex-shrink-0">
                    <span className="font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">Predictive Modeling</h3>
                    <p className="text-gray-600">AI algorithms analyze historical patterns, market trends, and business activities to forecast cash positions and requirements.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white mr-4 flex-shrink-0">
                    <span className="font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">Automated Execution</h3>
                    <p className="text-gray-600">Implement optimal cash positioning, fund transfers, and investment allocations based on AI recommendations and predefined rules.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white mr-4 flex-shrink-0">
                    <span className="font-semibold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">Continuous Monitoring</h3>
                    <p className="text-gray-600">Real-time tracking of treasury performance with automated alerts for exceptions, risks, and opportunities.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-200 p-8 flex items-center justify-center">
                <div className="w-full max-w-sm">
                  <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                    <div className="p-4 border-b border-gray-100">
                      <h4 className="font-bold text-black">Treasury Dashboard</h4>
                    </div>
                    <div className="p-4">
                      <div className="mb-6">
                        <div className="text-sm font-medium mb-2 text-black">Cash Position Forecast</div>
                        <div className="h-40 bg-gray-50 rounded-lg p-2">
                          <div className="h-full w-full relative">
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-500/20 to-transparent rounded"></div>
                            <div className="absolute bottom-0 left-0 right-0 border-t border-blue-500 border-dashed"></div>
                            <div className="absolute bottom-12 left-0 right-0 border-t border-green-500"></div>
                            <div className="absolute bottom-0 h-24 w-full flex items-end">
                              {[35, 42, 28, 45, 50, 60, 55, 68, 72, 65, 80, 75].map((value, i) => (
                                <div 
                                  key={i} 
                                  className="flex-1 mx-0.5"
                                >
                                  <div 
                                    className="bg-blue-500 rounded-t-sm w-full" 
                                    style={{ height: `${value / 100 * 80}%` }}
                                  ></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <div className="text-sm font-medium text-black">Current Cash</div>
                          <div className="text-sm font-medium">$24.8M</div>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <div className="text-sm font-medium text-black">30-Day Forecast</div>
                          <div className="text-sm font-medium text-green-600">$28.3M</div>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <div className="text-sm font-medium text-black">Excess Funds</div>
                          <div className="text-sm font-medium text-blue-600">$12.5M</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Key Benefits</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Financial institutions leveraging our AI Treasury solution experience significant operational improvements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 text-center">
                <h3 className="text-xl font-bold mb-3 text-black">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-black">Treasury AI Assistant</h3>
                    <p className="text-xs text-gray-500">Financial intelligence at your service</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm text-gray-700">Good morning. I've analyzed overnight market movements and updated your cash forecast. You have $4.2M in excess funds that could be deployed more effectively.</p>
                  </div>
                  <div className="bg-black p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                    <p className="text-sm text-white">What investment options do you recommend for the excess funds?</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm text-gray-700">Based on your liquidity requirements and risk tolerance, I recommend: 
                      <br/>• 30-day Treasury Bills ($2M) - 4.8% yield
                      <br/>• 90-day Commercial Paper ($1.5M) - 5.2% yield
                      <br/>• Overnight Repo ($0.7M) - 4.5% yield
                      <br/>Would you like me to prepare the execution plan?</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">The Treasury AI Assistant provides real-time insights, recommendations, and automated execution support for treasury operations.</p>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-6">
                Dedicated Treasury AI Assistant
              </h2>
              <p className="text-gray-600 mb-8">
                Meet your virtual treasury manager that works 24/7 to optimize cash management, investments, and risk monitoring.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Predictive Cash Forecasting</h3>
                    <p className="text-gray-600">AI models that continuously learn and improve cash flow predictions for better decision-making.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Real-time Risk Monitoring</h3>
                    <p className="text-gray-600">Continuous scanning for market volatility, counterparty risks, and regulatory changes.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Automated Execution</h3>
                    <p className="text-gray-600">Rule-based transaction execution with approval workflows for optimal fund deployment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Comprehensive Capabilities</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              AI Treasury provides a full suite of capabilities to address all aspects of treasury management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((category, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-black">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Success Story */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Early Adopter Program</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 mb-10">
              <span className="font-semibold">Limited Availability</span> - Join our exclusive program to transform your treasury operations.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-8 text-center">
                Join our Early Adopter Program to get exclusive access to our AI Treasury solution and be at the forefront of treasury management innovation.
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

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white">
            Revolutionize Your Treasury Operations
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            Join forward-thinking financial institutions that have transformed their treasury function with our AI-powered solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
              Schedule a Demo
            </Link>
            <Link href="/contact?inquiry=treasury-assessment" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-medium transition-colors">
              Request a Treasury Assessment
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
} 