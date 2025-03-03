import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function CareersPage() {
  const benefits = [
    {
      title: 'Flexible Work',
      description: 'Remote-first approach with flexible hours to help you maintain work-life balance.',
      icon: '/icons/flexible.svg',
    },
    {
      title: 'Health & Wellness',
      description: 'Comprehensive health benefits and wellness programs for you and your family.',
      icon: '/icons/health.svg',
    },
    {
      title: 'Growth & Development',
      description: 'Continuous learning opportunities, education stipends, and career advancement paths.',
      icon: '/icons/growth.svg',
    },
    {
      title: 'Competitive Compensation',
      description: 'Market-leading salary with equity options and performance bonuses.',
      icon: '/icons/compensation.svg',
    },
  ];

  const openPositions = [
    {
      id: 'ai-engineer',
      title: 'AI Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      department: 'Product',
      location: 'Hybrid - Toronto',
      type: 'Full-time',
    },
    {
      id: 'financial-analyst',
      title: 'Financial Analyst',
      department: 'Finance',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      id: 'ux-designer',
      title: 'UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      id: 'compliance-officer',
      title: 'Compliance Officer',
      department: 'Legal',
      location: 'Toronto',
      type: 'Full-time',
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      department: 'Analytics',
      location: 'Remote',
      type: 'Full-time',
    },
  ];

  return (
    <Layout>
      {/* Hero Section - Matching Leadership page style */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Join Our Team
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mt-6">
              Help us build the future of ethical AI-powered finance. We're looking for talented 
              individuals who are passionate about innovation and making a positive impact.
            </p>
          </div>
        </div>
      </section>

      {/* Our Culture Section - Updated to black and white */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Culture</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-6">
              We foster an environment that encourages innovation, collaboration, and growth while maintaining a strong focus on ethics and inclusion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/team-culture.jpg"
                alt="Team collaboration"
                fill
                className="object-cover transform hover:scale-105 transition duration-700"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">What Makes Us Different</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="text-black mr-4 mt-1 p-1 bg-gray-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Purpose-Driven</h4>
                    <p className="text-gray-700">Our mission to create ethical AI-driven financial solutions drives everything we do.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-4 mt-1 p-1 bg-gray-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Innovation-First</h4>
                    <p className="text-gray-700">We embrace cutting-edge technologies and methodologies to create breakthrough solutions.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-4 mt-1 p-1 bg-gray-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Diverse & Inclusive</h4>
                    <p className="text-gray-700">We value different perspectives and create an environment where everyone belongs.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-4 mt-1 p-1 bg-gray-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Remote-First</h4>
                    <p className="text-gray-700">We believe in work-life balance and trust our team to deliver excellence from anywhere.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Updated to black and white */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Benefits & Perks</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-6">
              We take care of our team with comprehensive benefits designed to support your wellbeing and growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 group hover:border-gray-300">
                <div className="mb-4 w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-black group-hover:bg-gray-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-gray-900 rounded-2xl p-10 text-white shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Additional Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-100">Generous vacation policy</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-100">Home office stipend</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-100">Mental health resources</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-100">Company-wide retreats</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-100">401(k) matching</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-100">Professional development budget</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-100">Parental leave</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-100">Team events and celebrations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section - Updated to black and white */}
      <section id="open-positions" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Open Positions</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-6">
              Join our growing team and help us shape the future of financial technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {openPositions.map((position) => (
              <div key={position.id} className="border border-gray-200 rounded-xl hover:shadow-lg transition-shadow p-8 hover:border-gray-400 group bg-white">
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-black">{position.title}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{position.department}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{position.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{position.type}</span>
                  </div>
                </div>
                <Link href={`/careers/${position.id}`} className="inline-block bg-white hover:bg-black hover:text-white border-2 border-black text-black font-medium py-2 px-5 rounded-lg transition-colors">
                  View Details
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-gray-700 mb-6">Don't see a role that fits your skills?</p>
            <Link href="/careers/general-application" className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-8 rounded-lg transition-colors">
              Submit a General Application
            </Link>
          </div>
        </div>
      </section>

      {/* Future Vision Section - Replacing Life at TechNexus */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Future Vision</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-6">
              At TechNexus, we're building the foundation for the next generation of financial technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="bg-gray-100 rounded-xl p-6 mb-6 flex items-center justify-center">
                <svg className="h-12 w-12 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Pioneering Innovation</h3>
              <p className="text-gray-700">
                "Our team is dedicated to pushing the boundaries of what's possible in AI and finance, developing solutions that will fundamentally transform how financial services operate."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="bg-gray-100 rounded-xl p-6 mb-6 flex items-center justify-center">
                <svg className="h-12 w-12 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Growing With Purpose</h3>
              <p className="text-gray-700">
                "As we expand our team, we're looking for forward-thinking individuals who share our vision for ethical AI and are ready to contribute to something truly meaningful in the financial sector."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="bg-gray-100 rounded-xl p-6 mb-6 flex items-center justify-center">
                <svg className="h-12 w-12 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Global Impact</h3>
              <p className="text-gray-700">
                "Our solutions are designed to create a more inclusive financial system worldwide, breaking down barriers and democratizing access to financial services through ethical AI technologies."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Updated to black and white */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Ready to Join Our Team?</h2>
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                Take the next step in your career journey and be part of our mission to transform fintech with ethical AI solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#open-positions" 
                  className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-200 rounded-lg font-medium shadow-lg transition duration-300 text-center">
                  Explore Positions
                </Link>
                <Link href="/contact" 
                  className="px-8 py-3 bg-transparent hover:bg-gray-800 border-2 border-white text-white font-medium rounded-lg transition-colors text-center">
                  Contact Recruiting
                </Link>
              </div>
            </div>
            <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-900 opacity-80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl md:text-3xl font-bold text-center px-4">Shape the Future of Finance</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 