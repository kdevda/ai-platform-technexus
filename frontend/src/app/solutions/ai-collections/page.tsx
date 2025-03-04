import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function AICollectionsPage() {
  const features = [
    {
      title: "Intelligent Delinquency Prediction",
      description: "AI-powered early warning system that identifies at-risk accounts before they become delinquent, allowing for proactive intervention.",
      icon: (
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Personalized Collection Strategies",
      description: "Tailored approaches for different borrower segments based on risk level, payment history, and communication preferences.",
      icon: (
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Omnichannel Communication",
      description: "Engage borrowers through their preferred channels with optimized messaging and timing to increase response rates.",
      icon: (
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: "Compliance & Documentation",
      description: "Automated compliance monitoring and comprehensive documentation of all collection activities to ensure regulatory adherence.",
      icon: (
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  const benefits = [
    {
      title: "Reduced Charge-off Rates",
      description: "Lower loan losses through early intervention and effective collection strategies"
    },
    {
      title: "Increased Recovery Rates",
      description: "Higher recovery on delinquent accounts with optimized collection approaches"
    },
    {
      title: "Improved Collector Productivity",
      description: "More efficient allocation of collector time to high-impact accounts"
    },
    {
      title: "Enhanced Customer Retention",
      description: "More customers brought current and retained through compassionate collection"
    }
  ];

  const workflowSteps = [
    {
      title: "Risk Detection",
      description: "Continuously monitor accounts for early signs of financial stress using AI predictive models"
    },
    {
      title: "Strategy Assignment",
      description: "Automatically assign the optimal collection strategy based on borrower profile and risk level"
    },
    {
      title: "Smart Engagement",
      description: "Execute multi-channel outreach with personalized messaging and optimal timing"
    },
    {
      title: "Resolution Paths",
      description: "Offer tailored resolution options including payment plans, restructuring, or hardship programs"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
                AI Collections
              </h1>
              <p className="text-gray-600 text-lg md:text-xl mb-8">
                Transform your collections process with AI-powered strategies that improve recovery rates while maintaining positive customer relationships.
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
              Our AI Collections solution combines advanced analytics with empathetic approaches to maximize recovery while preserving customer relationships.
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
                How AI Collections Works
              </h2>
              <p className="text-gray-600 mb-8">
                Our end-to-end collection workflow combines predictive analytics, strategic segmentation, and personalized engagement to maximize recoveries.
              </p>
              
              <div className="space-y-8">
                {workflowSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white mr-4 flex-shrink-0">
                      <span className="font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-black">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-200 p-8 flex items-center justify-center">
                <div className="w-full max-w-sm">
                  <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                    <div className="p-4 border-b border-gray-100">
                      <h4 className="font-bold text-black">Collection Dashboard</h4>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-sm font-medium text-black">Early Stage (1-30 Days)</div>
                            <div className="text-sm font-medium text-green-600">74% Resolution</div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "74%" }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-sm font-medium text-black">Mid Stage (31-60 Days)</div>
                            <div className="text-sm font-medium text-blue-600">52% Resolution</div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: "52%" }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-sm font-medium text-black">Late Stage (60+ Days)</div>
                            <div className="text-sm font-medium text-orange-600">38% Resolution</div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 rounded-full" style={{ width: "38%" }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 border-t border-gray-100 pt-4">
                        <div className="text-sm font-medium mb-2 text-black">Recommended Actions</div>
                        <div className="text-xs text-gray-500">
                          • 237 accounts for early intervention messaging<br />
                          • 124 accounts for payment plan offers<br />
                          • 86 accounts for hardship evaluation
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
              Our clients have experienced significant improvements in their collection metrics after implementing our AI Collections solution.
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
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-6">
                Dedicated Collections AI Assistant
              </h2>
              <p className="text-gray-600 mb-8">
                Meet your virtual collections specialist, powered by advanced AI to help your team maximize efficiency and recovery rates.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Proactive Risk Alerts</h3>
                    <p className="text-gray-600">Automatically identifies accounts showing early warning signs of potential default.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Intelligent Scheduling</h3>
                    <p className="text-gray-600">Optimizes contact timing based on customer behavior patterns and preferences.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Compliance Monitoring</h3>
                    <p className="text-gray-600">Ensures all collections activities adhere to regulatory requirements and company policies.</p>
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
                    <h3 className="font-bold text-black">Collections AI Assistant</h3>
                    <p className="text-xs text-gray-500">Always available</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">I've identified 28 accounts showing early payment stress patterns. Would you like me to prepare outreach recommendations?</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">Customer Smith has missed their second payment but has shown consistent payment history prior. Based on their profile, a payment plan may be the best approach.</p>
                  </div>
                  <div className="bg-black p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                    <p className="text-sm text-white">Generate a report of all accounts 15-30 days past due with prior good standing.</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">Report generated. I've identified 42 accounts matching your criteria. Based on their profiles, here are my recommended approaches...</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">The Collections AI Assistant helps teams work more efficiently by providing insights, recommendations, and automating routine tasks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Early Adopter Program</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 mb-10">
              <span className="font-semibold">Limited Availability</span> - Join our exclusive program to transform your collections operations.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-8 text-center">
                Join our Early Adopter Program to get exclusive access to our AI Collections solution and be at the forefront of collections innovation.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-3 text-black">Priority Access</h3>
                  <p className="text-gray-600">Get early access to new features and capabilities before they're widely available.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-3 text-black">Special Pricing</h3>
                  <p className="text-gray-600">Benefit from exclusive pricing and terms available only to early adopters.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
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

      {/* Compliance Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-black">
                Built for Regulatory Compliance
              </h2>
              <p className="text-gray-600 mb-8">
                Our AI Collections solution ensures compliance with FDCPA, TCPA, UDAAP, and other relevant regulations while maintaining detailed documentation of all collection activities.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Automated time-window compliance for calls and messages</span>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Comprehensive audit trails of all contact attempts</span>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Consent management and communication preference tracking</span>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Pre-approved compliant message templates</span>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Regular compliance updates as regulations change</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden bg-white border border-gray-200 p-8 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="relative rounded-xl overflow-hidden shadow-sm">
                    <Image 
                      src="/images/compliance-dashboard.jpg" 
                      alt="Compliance Dashboard" 
                      width={600} 
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white">
            Transform Your Collections Operations Today
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            Join the leading financial institutions that have revolutionized their collections process with our AI-powered solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
              Schedule a Demo
            </Link>
            <Link href="/contact?inquiry=recovery-assessment" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-medium transition-colors">
              Request a Recovery Assessment
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
} 