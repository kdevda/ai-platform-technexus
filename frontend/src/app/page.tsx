import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-0 bg-white text-black">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                AI-Powered <br />
                <span className="text-gray-300">Loan Management</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-lg">
                Enterprise-grade platform with configurable AI capabilities for every stage of the loan lifecycle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/register"
                  className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-none font-medium text-lg transition-all"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-4 rounded-none font-medium text-lg transition-all"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-[400px] w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.2] [mask-image:linear-gradient(to_bottom,transparent_40%,black)]"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 w-[300px]">
                  <div className="text-sm text-gray-300 mb-2">AI Recommendation</div>
                  <div className="text-lg font-medium">Optimize loan approval rates by 27% with our AI Originations module</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-20 bg-white">
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
              <div key={index} className="border border-gray-200 p-8 hover:border-black transition-all">
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

      {/* Configurable Platform Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-black p-8 relative">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-900 p-4 h-32 flex items-center justify-center">
                      <div className="text-white text-opacity-50 text-sm">Configuration Module {i}</div>
                    </div>
                  ))}
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
      <section className="py-20 bg-white">
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
              <div key={index} className="border border-gray-200 p-6 text-center hover:border-black transition-all">
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
