"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function LeadershipPage() {
  const executiveTeam = [
    {
      name: "Sophia Chen",
      title: "Chief Executive Officer",
      bio: "With over 20 years of experience in fintech and AI, Sophia has led multiple successful startups before founding Technexus. Her vision drives our mission to transform lending through ethical AI.",
      image: "/images/placeholder-female.png"
    },
    {
      name: "Marcus Johnson",
      title: "Chief Technology Officer",
      bio: "Previously leading AI research teams at major tech companies, Marcus brings deep expertise in machine learning and a passion for building ethical, explainable AI systems for the financial sector.",
      image: "/images/placeholder-male.png"
    },
    {
      name: "Ananya Patel",
      title: "Chief Product Officer",
      bio: "Ananya's background spans product development at both traditional banks and fintech disruptors, giving her unique insights into building products that bridge technological innovation with real-world lending needs.",
      image: "/images/placeholder-female.png"
    },
    {
      name: "David Okafor",
      title: "Chief Financial Officer",
      bio: "With experience as both a financial analyst and venture capitalist, David brings financial rigor and strategic growth expertise to Technexus's operations and investment planning.",
      image: "/images/placeholder-male.png"
    }
  ];

  const leadershipTeam = [
    {
      name: "Elena Rodriguez",
      title: "VP of Engineering",
      bio: "Elena leads our engineering teams with a focus on building scalable, secure systems. Her background in cybersecurity ensures our platform meets the highest standards of data protection.",
      image: "/images/placeholder-female.png"
    },
    {
      name: "James Kim",
      title: "VP of Data Science",
      bio: "James oversees our data science and machine learning teams, focusing on developing and refining our AI models to ensure they deliver accurate, fair, and explainable results.",
      image: "/images/placeholder-male.png"
    },
    {
      name: "Mei Lin",
      title: "VP of Client Success",
      bio: "Mei ensures our clients achieve their business goals through our platform. Her team provides implementation support, training, and ongoing optimization guidance.",
      image: "/images/placeholder-female.png"
    },
    {
      name: "Thomas Bennett",
      title: "VP of Sales",
      bio: "Thomas leads our global sales strategy, focusing on building long-term partnerships with financial institutions that share our vision for ethical, AI-powered lending.",
      image: "/images/placeholder-male.png"
    },
    {
      name: "Sarah Nguyen",
      title: "VP of Marketing",
      bio: "Sarah drives our brand strategy and marketing initiatives, communicating our vision and differentiating our platform in the competitive fintech marketplace.",
      image: "/images/placeholder-female.png"
    },
    {
      name: "Michael Garcia",
      title: "VP of Compliance",
      bio: "Michael ensures our platform meets regulatory requirements across global markets, working closely with product teams to build compliance into our core offering.",
      image: "/images/placeholder-male.png"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Our Leadership
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mt-6">
              Meet the team driving innovation in AI-powered lending technologies. Our diverse leaders bring together expertise from finance, technology, and data science to revolutionize the future of financial services.
            </p>
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Executive Team</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our executive leadership guides the company's strategic direction, bringing decades of combined experience in fintech, AI, and financial services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {executiveTeam.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="relative h-64 bg-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-900 opacity-90 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{member.name.split(' ')[0][0]}{member.name.split(' ')[1][0]}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.title}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                  <div className="mt-4 flex space-x-3">
                    <a href="#" className="text-gray-400 hover:text-blue-500">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-700">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-900">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Chart */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Structure</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              We've built our organization to foster innovation, encourage cross-functional collaboration, and maintain a relentless focus on our clients' success.
            </p>
          </div>
          
          <div className="relative bg-white rounded-xl shadow-xl p-8 md:p-12 overflow-hidden">
            <div className="grid grid-cols-1 gap-8">
              <div className="border-2 border-black p-4 rounded-lg text-center mx-auto w-64">
                <p className="font-bold">CEO</p>
                <p className="text-sm text-gray-500">Sophia Chen</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-2 border-blue-600 p-4 rounded-lg text-center">
                  <p className="font-bold">CTO</p>
                  <p className="text-sm text-gray-500">Marcus Johnson</p>
                </div>
                <div className="border-2 border-blue-600 p-4 rounded-lg text-center">
                  <p className="font-bold">CPO</p>
                  <p className="text-sm text-gray-500">Ananya Patel</p>
                </div>
                <div className="border-2 border-blue-600 p-4 rounded-lg text-center">
                  <p className="font-bold">CFO</p>
                  <p className="text-sm text-gray-500">David Okafor</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <div className="border-2 border-gray-300 p-3 rounded-lg text-center">
                    <p className="font-bold">VP Engineering</p>
                    <p className="text-sm text-gray-500">Elena Rodriguez</p>
                  </div>
                  <div className="border-2 border-gray-300 p-3 rounded-lg text-center">
                    <p className="font-bold">VP Data Science</p>
                    <p className="text-sm text-gray-500">James Kim</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-2 border-gray-300 p-3 rounded-lg text-center">
                    <p className="font-bold">VP Client Success</p>
                    <p className="text-sm text-gray-500">Mei Lin</p>
                  </div>
                  <div className="border-2 border-gray-300 p-3 rounded-lg text-center">
                    <p className="font-bold">VP Marketing</p>
                    <p className="text-sm text-gray-500">Sarah Nguyen</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-2 border-gray-300 p-3 rounded-lg text-center">
                    <p className="font-bold">VP Sales</p>
                    <p className="text-sm text-gray-500">Thomas Bennett</p>
                  </div>
                  <div className="border-2 border-gray-300 p-3 rounded-lg text-center">
                    <p className="font-bold">VP Compliance</p>
                    <p className="text-sm text-gray-500">Michael Garcia</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-10 -bottom-10 w-80 h-80 bg-blue-50 rounded-full opacity-50 z-0"></div>
            <div className="absolute -right-10 -top-10 w-80 h-80 bg-purple-50 rounded-full opacity-50 z-0"></div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Leadership Team</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our senior leadership team drives our day-to-day operations, shaping our culture of innovation and excellence across all departments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((member, index) => (
              <div key={index} className="flex bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-1/3 bg-gray-300 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 opacity-90 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{member.name.split(' ')[0][0]}{member.name.split(' ')[1][0]}</span>
                  </div>
                </div>
                <div className="w-2/3 p-5">
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-blue-600 text-sm font-medium mb-2">{member.title}</p>
                  <p className="text-gray-600 text-xs">{member.bio}</p>
                  <div className="mt-3 flex space-x-2">
                    <a href="#" className="text-gray-400 hover:text-blue-500">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-900">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board & Advisors */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Board & Advisors</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our board members and advisors provide strategic guidance and industry expertise, helping us navigate complex challenges and seize new opportunities.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <svg className="h-6 w-6 mr-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Board of Directors
                </h3>
                <ul className="space-y-4">
                  <li className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="font-bold">Dr. Maya Wilson</p>
                    <p className="text-sm text-gray-500">Former Banking Regulation Advisor, Federal Reserve</p>
                  </li>
                  <li className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="font-bold">Raj Mehta</p>
                    <p className="text-sm text-gray-500">Managing Partner, Vector Capital</p>
                  </li>
                  <li className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="font-bold">Sophia Chen</p>
                    <p className="text-sm text-gray-500">CEO, Technexus</p>
                  </li>
                  <li className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="font-bold">Dr. Carlos Vega</p>
                    <p className="text-sm text-gray-500">Professor of Banking Innovation, Stanford University</p>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <svg className="h-6 w-6 mr-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Advisory Council
                </h3>
                <ul className="space-y-4">
                  <li className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="font-bold">Hiroshi Tanaka</p>
                    <p className="text-sm text-gray-500">Former CTO, Global Banking Systems</p>
                  </li>
                  <li className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="font-bold">Dr. Fatima Al-Zahrani</p>
                    <p className="text-sm text-gray-500">Director of Ethical AI Research, MIT</p>
                  </li>
                  <li className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="font-bold">Robert Blackwell</p>
                    <p className="text-sm text-gray-500">Former Banking Regulator, OCC</p>
                  </li>
                  <li className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="font-bold">Maria González</p>
                    <p className="text-sm text-gray-500">Chief Innovation Officer, Community Banking Alliance</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-16 md:py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Join Our Leadership Team
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals who are passionate about using AI to transform financial services. Explore our current leadership opportunities.
          </p>
          <Link 
            href="/careers" 
            className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors inline-flex items-center"
          >
            View Leadership Positions
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </Layout>
  );
} 