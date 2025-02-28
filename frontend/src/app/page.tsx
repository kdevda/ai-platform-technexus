import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-0 bg-white text-black">
      {/* Hero Section with AI Conversation Animation */}
      <section className="py-20 md:py-28 bg-white text-black overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                AI-Powered <br />
                <span className="text-gray-700">Loan Management</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Enterprise-grade platform with configurable AI capabilities for every stage of the loan lifecycle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/register"
                  className="bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-none font-medium text-lg transition-all"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="bg-transparent border border-black text-black hover:bg-black/5 px-8 py-4 rounded-none font-medium text-lg transition-all"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-grid-black/[0.05] [mask-image:linear-gradient(to_bottom,transparent_40%,white)]"></div>
              
              {/* AI Conversation Animation */}
              <div className="relative h-[450px] w-full">
                {/* Chat Header */}
                <div className="absolute left-0 top-0 bg-gray-100 rounded-t-lg p-3 w-[350px] border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="font-medium">TechNexus AI Assistant</div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
                
                {/* Chat Container */}
                <div className="absolute left-0 top-[46px] bg-white border border-gray-200 border-t-0 rounded-b-lg p-4 w-[350px] h-[380px] overflow-hidden">
                  {/* AI Assistant Message */}
                  <div className="flex items-start gap-3 mb-4 animate-fadeIn opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[250px]">
                      <div className="text-sm">Hello! I'm your AI loan assistant. How can I help you today?</div>
                    </div>
                  </div>
                  
                  {/* User Message */}
                  <div className="flex items-start gap-3 mb-4 justify-end animate-fadeIn opacity-0" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
                    <div className="bg-black text-white rounded-lg p-3 max-w-[250px]">
                      <div className="text-sm">I need to analyze my loan portfolio for high-risk accounts.</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* AI Response with Analysis */}
                  <div className="flex items-start gap-3 mb-4 animate-fadeIn opacity-0" style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}>
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[250px]">
                      <div className="text-sm">I've analyzed your portfolio and identified 15 high-risk accounts that need attention.</div>
                    </div>
                  </div>
                  
                  {/* User Message */}
                  <div className="flex items-start gap-3 mb-4 justify-end animate-fadeIn opacity-0" style={{ animationDelay: '3.5s', animationFillMode: 'forwards' }}>
                    <div className="bg-black text-white rounded-lg p-3 max-w-[250px]">
                      <div className="text-sm">What actions do you recommend for these accounts?</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* AI Response with Recommendations */}
                  <div className="flex items-start gap-3 mb-4 animate-fadeIn opacity-0" style={{ animationDelay: '4.5s', animationFillMode: 'forwards' }}>
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[250px]">
                      <div className="text-sm">Based on behavioral analysis, I recommend:</div>
                      <ul className="text-xs text-gray-600 mt-2 space-y-1 list-disc pl-4">
                        <li>Personalized payment plans for 8 accounts</li>
                        <li>Early intervention for 5 accounts</li>
                        <li>Restructuring options for 2 accounts</li>
                      </ul>
                      <div className="text-xs text-gray-500 mt-2">Projected recovery improvement: 27%</div>
                    </div>
                  </div>
                  
                  {/* Typing Indicator */}
                  <div className="flex items-start gap-3 animate-fadeIn opacity-0" style={{ animationDelay: '5.5s', animationFillMode: 'forwards' }}>
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-2 px-4">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise AI Capabilities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fully configurable AI modules to transform every aspect of your loan management process
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Lead Management",
                description: "Identify high-quality leads and optimize conversion rates with predictive analytics",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              },
              {
                title: "AI Originations",
                description: "Streamline underwriting with automated document processing and risk assessment",
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              },
              {
                title: "AI Collections",
                description: "Optimize collection strategies with behavioral analysis and personalized approaches",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              },
              {
                title: "AI Servicing",
                description: "Enhance customer experience with intelligent automation and proactive support",
                icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              },
              {
                title: "AI Treasury",
                description: "Optimize cash flow and funding with predictive financial modeling",
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              },
              {
                title: "AI Analytics",
                description: "Gain actionable insights with advanced data visualization and predictive modeling",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              },
            ].map((item, index) => (
              <div key={index} className="border border-gray-200 p-8 hover:border-black transition-all bg-white">
                <div className="w-12 h-12 bg-black rounded-none flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configurable Platform Section with Interactive UI */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-black p-8 relative rounded-lg overflow-hidden">
                {/* Animated Configuration Interface */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-500 to-gray-700"></div>
                
                {/* Header Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-white text-sm font-medium">AI Configuration Dashboard</div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                {/* Configuration Panels */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Risk Assessment Module */}
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Risk Assessment</div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm">Credit Score Weight</span>
                        <span className="text-gray-400 text-sm">65%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div className="bg-white h-1.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm">Income Verification</span>
                        <div className="relative inline-block w-10 align-middle select-none">
                          <div className="block w-10 h-5 bg-white rounded-full"></div>
                          <div className="absolute block w-5 h-5 mt-[-5px] rounded-full bg-black border-2 border-white left-5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Approval Workflow */}
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Approval Workflow</div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-white text-sm">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-xs mr-2">1</div>
                        Document Verification
                      </div>
                      <div className="w-0.5 h-3 bg-gray-700 ml-2.5"></div>
                      <div className="flex items-center text-white text-sm">
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-xs mr-2">2</div>
                        Risk Analysis
                      </div>
                      <div className="w-0.5 h-3 bg-gray-700 ml-2.5"></div>
                      <div className="flex items-center text-white text-sm">
                        <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-xs mr-2">3</div>
                        Final Approval
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Parameters */}
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">AI Parameters</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm">Confidence Threshold</span>
                        <span className="text-gray-400 text-sm">85%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div className="bg-white h-1.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-white text-sm">Model Version</span>
                        <span className="text-gray-400 text-sm">v3.2.1</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Analytics Dashboard */}
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Performance Metrics</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-800 p-2 rounded">
                        <div className="text-xs text-gray-400">Approval Rate</div>
                        <div className="text-white text-lg">72.4%</div>
                      </div>
                      <div className="bg-gray-800 p-2 rounded">
                        <div className="text-xs text-gray-400">Default Rate</div>
                        <div className="text-white text-lg">3.2%</div>
                      </div>
                      <div className="bg-gray-800 p-2 rounded">
                        <div className="text-xs text-gray-400">Processing</div>
                        <div className="text-white text-lg">1.2 min</div>
                      </div>
                      <div className="bg-gray-800 p-2 rounded">
                        <div className="text-xs text-gray-400">Accuracy</div>
                        <div className="text-white text-lg">94.7%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Fully Configurable Platform</h2>
              <p className="text-gray-600">
                Tailor every aspect of the platform to your specific business needs. Our modular architecture allows for complete customization of:
              </p>
              <ul className="space-y-3">
                {[
                  "Risk assessment models",
                  "Approval workflows",
                  "Customer communication",
                  "Reporting dashboards",
                  "Integration endpoints",
                  "AI parameters and thresholds"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-black mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Integrations Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Seamless AI Integrations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with your existing systems and third-party services for a unified workflow
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Credit Bureaus",
              "Banking Systems",
              "CRM Platforms",
              "Payment Processors",
              "Document Management",
              "Compliance Tools",
              "Accounting Software",
              "Business Intelligence"
            ].map((item, index) => (
              <div key={index} className="border border-gray-200 p-6 text-center hover:border-black transition-all bg-white">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-medium">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Your Loan Operations</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join leading financial institutions leveraging our AI-powered platform to drive efficiency and growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-none font-medium text-lg transition-all"
            >
              Schedule a Demo
            </Link>
            <Link
              href="/login"
              className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-4 rounded-none font-medium text-lg transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
