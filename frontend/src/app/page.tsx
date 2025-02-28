import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section with Professional Chat Interface */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Enterprise Loan Management
                <span className="block text-black">Powered by AI</span>
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-xl">
                Streamline your loan operations with our configurable AI platform designed for enterprise financial institutions.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  href="/register" 
                  className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </Link>
                <Link 
                  href="/solutions" 
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                >
                  Explore Solutions
                </Link>
              </div>
            </div>

            {/* Enterprise-grade Chat Interface */}
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                  <h3 className="font-medium">TechNexus AI Assistant</h3>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 rounded hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-4 h-[500px] overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {/* AI Message 1 */}
                  <div className="flex items-start max-w-[80%] animate-fadeIn" style={{ animationDelay: '0s' }}>
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                      AI
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-800">Hello, I'm your loan management assistant. How can I help you today?</p>
                    </div>
                  </div>
                  
                  {/* User Message 1 */}
                  <div className="flex items-start max-w-[80%] ml-auto animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-800">I need to analyze our current loan portfolio performance.</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold ml-2 flex-shrink-0">
                      U
                    </div>
                  </div>
                  
                  {/* AI Message 2 */}
                  <div className="flex items-start max-w-[80%] animate-fadeIn" style={{ animationDelay: '1s' }}>
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                      AI
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-800">I've analyzed your loan portfolio and identified the following insights:</p>
                      <ul className="list-disc pl-5 mt-2 text-gray-700">
                        <li>Your delinquency rate is 2.3%, below industry average of 3.1%</li>
                        <li>Approval efficiency has increased by 18% this quarter</li>
                        <li>Risk-adjusted return is 7.2%, exceeding targets by 0.8%</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* User Message 2 */}
                  <div className="flex items-start max-w-[80%] ml-auto animate-fadeIn" style={{ animationDelay: '1.5s' }}>
                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-800">What actions do you recommend based on this data?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold ml-2 flex-shrink-0">
                      U
                    </div>
                  </div>
                  
                  {/* AI Message 3 */}
                  <div className="flex items-start max-w-[80%] animate-fadeIn" style={{ animationDelay: '2s' }}>
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                      AI
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-800">Based on the data, I recommend the following actions:</p>
                      <ol className="list-decimal pl-5 mt-2 text-gray-700">
                        <li>Increase marketing for high-performing loan products</li>
                        <li>Optimize underwriting criteria for mid-tier applicants</li>
                        <li>Implement early intervention for loans showing early warning signs</li>
                      </ol>
                    </div>
                  </div>
                  
                  {/* User Message 3 */}
                  <div className="flex items-start max-w-[80%] ml-auto animate-fadeIn" style={{ animationDelay: '2.5s' }}>
                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-800">Can you show me the projected impact of these changes?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold ml-2 flex-shrink-0">
                      U
                    </div>
                  </div>
                  
                  {/* AI Message 4 */}
                  <div className="flex items-start max-w-[80%] animate-fadeIn" style={{ animationDelay: '3s' }}>
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                      AI
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-800">Here are the projected impacts over the next quarter:</p>
                      <ul className="list-disc pl-5 mt-2 text-gray-700">
                        <li>Revenue increase: 12-15%</li>
                        <li>Delinquency rate reduction: 0.4%</li>
                        <li>Customer satisfaction improvement: 8%</li>
                        <li>Operational cost reduction: 7%</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* User Message 4 */}
                  <div className="flex items-start max-w-[80%] ml-auto animate-fadeIn" style={{ animationDelay: '3.5s' }}>
                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-800">What resources would we need to implement these changes?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold ml-2 flex-shrink-0">
                      U
                    </div>
                  </div>
                  
                  {/* AI Message 5 */}
                  <div className="flex items-start max-w-[80%] animate-fadeIn" style={{ animationDelay: '4s' }}>
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                      AI
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-800">Implementation would require:</p>
                      <ul className="list-disc pl-5 mt-2 text-gray-700">
                        <li>Marketing team allocation: 2 FTEs for 3 weeks</li>
                        <li>Data science team: 1 FTE for model refinement</li>
                        <li>IT support: Configuration changes to the loan origination system</li>
                        <li>Training: 2 hours for loan officers on new criteria</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* User Message 5 */}
                  <div className="flex items-start max-w-[80%] ml-auto animate-fadeIn" style={{ animationDelay: '4.5s' }}>
                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-800">Can you prepare an implementation timeline?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold ml-2 flex-shrink-0">
                      U
                    </div>
                  </div>
                  
                  {/* AI Message 6 */}
                  <div className="flex items-start max-w-[80%] animate-fadeIn" style={{ animationDelay: '5s' }}>
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                      AI
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-800">Here's a proposed implementation timeline:</p>
                      <ul className="list-disc pl-5 mt-2 text-gray-700">
                        <li><strong>Week 1:</strong> Data analysis and model refinement</li>
                        <li><strong>Week 2:</strong> System configuration and testing</li>
                        <li><strong>Week 3:</strong> Staff training and marketing preparation</li>
                        <li><strong>Week 4:</strong> Phased rollout and monitoring</li>
                        <li><strong>Week 6:</strong> Full implementation and performance review</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* User Message 6 */}
                  <div className="flex items-start max-w-[80%] ml-auto animate-fadeIn" style={{ animationDelay: '5.5s' }}>
                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-800">Are there any regulatory considerations we should be aware of?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold ml-2 flex-shrink-0">
                      U
                    </div>
                  </div>
                  
                  {/* AI Message 7 */}
                  <div className="flex items-start max-w-[80%] animate-fadeIn" style={{ animationDelay: '6s' }}>
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                      AI
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-800">Yes, there are several regulatory considerations:</p>
                      <ul className="list-disc pl-5 mt-2 text-gray-700">
                        <li>Fair lending compliance for underwriting changes</li>
                        <li>UDAAP considerations for marketing materials</li>
                        <li>Documentation requirements for model changes</li>
                        <li>Privacy regulations for customer data usage</li>
                      </ul>
                      <p className="mt-2 text-gray-800">I recommend involving compliance in the planning phase.</p>
                    </div>
                  </div>
                  
                  {/* User Message 7 */}
                  <div className="flex items-start max-w-[80%] ml-auto animate-fadeIn" style={{ animationDelay: '6.5s' }}>
                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-800">Great insights. Can you generate a summary report for the executive team?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold ml-2 flex-shrink-0">
                      U
                    </div>
                  </div>
                  
                  {/* AI Message 8 - Typing Indicator */}
                  <div className="flex items-start max-w-[80%] animate-fadeIn" style={{ animationDelay: '7s' }}>
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                      AI
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button className="bg-black text-white py-2 px-4 rounded-r-md hover:bg-gray-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities Section with Better Contrast */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Enterprise AI Capabilities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our platform offers configurable AI modules for every stage of the loan lifecycle</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI Lead Management",
                description: "Identify high-quality leads and optimize conversion rates with predictive analytics.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )
              },
              {
                title: "AI Originations",
                description: "Streamline application processing and underwriting with automated risk assessment.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "AI Collections",
                description: "Optimize recovery strategies with behavioral analysis and personalized approaches.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "AI Servicing",
                description: "Enhance customer experience with intelligent servicing and proactive account management.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "AI Treasury",
                description: "Optimize capital allocation and funding strategies with predictive cash flow analysis.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "AI Analytics",
                description: "Gain actionable insights with advanced portfolio analytics and performance monitoring.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Configuration Dashboard Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Enterprise Configuration</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Tailor our AI platform to your specific business requirements</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-black text-white p-4">
              <h3 className="font-medium">AI Configuration Dashboard</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y divide-gray-200">
              {/* Risk Assessment Panel */}
              <div className="p-6">
                <h4 className="font-bold mb-4 text-gray-800">Risk Assessment</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Risk Tolerance</label>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Conservative</span>
                      <span>Aggressive</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credit Score Threshold</label>
                    <div className="flex items-center">
                      <input type="text" value="680" readOnly className="w-16 border border-gray-300 rounded px-2 py-1 text-center" />
                      <div className="ml-2 text-sm text-gray-600">Minimum</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" checked readOnly className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Enable AI fraud detection</label>
                  </div>
                </div>
              </div>
              
              {/* Approval Workflow Panel */}
              <div className="p-6">
                <h4 className="font-bold mb-4 text-gray-800">Approval Workflow</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Auto-approve threshold</span>
                    <span className="text-sm font-medium">$25,000</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Manual review threshold</span>
                    <span className="text-sm font-medium">$100,000</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Executive approval</span>
                    <span className="text-sm font-medium">$250,000+</span>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex items-center">
                      <input type="checkbox" checked readOnly className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-700">Enable parallel processing</label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* AI Parameters Panel */}
              <div className="p-6">
                <h4 className="font-bold mb-4 text-gray-800">AI Parameters</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Model Confidence</label>
                    <select className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5">
                      <option>High (95%+)</option>
                      <option>Medium (85%+)</option>
                      <option>Low (75%+)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Sources</label>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <input type="checkbox" checked readOnly className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Credit bureaus</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" checked readOnly className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Banking history</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" checked readOnly className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Alternative data</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Performance Metrics Panel */}
              <div className="p-6">
                <h4 className="font-bold mb-4 text-gray-800">Performance Metrics</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Approval Rate</span>
                      <span className="text-sm font-medium text-green-600">72.4%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-[72%]"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Default Rate</span>
                      <span className="text-sm font-medium text-red-600">2.1%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full w-[2%]"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Processing Time</span>
                      <span className="text-sm font-medium text-blue-600">4.2 hrs</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-[35%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your loan operations?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join leading financial institutions that have increased efficiency by 35% and reduced risk by 28% with our AI platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/register" 
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Request Demo
            </Link>
            <Link 
              href="/contact" 
              className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
