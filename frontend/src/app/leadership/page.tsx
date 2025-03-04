"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function LeadershipPage() {
  // Collective industry expertise
  const expertiseAreas = [
    {
      title: "Lending Technology",
      description: "Revolutionizing loan origination, underwriting, and servicing through intelligent automation and advanced analytics.",
      icon: (
        <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "AI & Machine Learning",
      description: "Building sophisticated models that transform lending decisions with explainable, ethical, and accurate predictions.",
      icon: (
        <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Financial Services",
      description: "Deep domain expertise in lending operations, risk management, and regulatory compliance across multiple markets.",
      icon: (
        <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Product Design",
      description: "Creating intuitive user experiences that make complex lending processes simple, efficient, and engaging.",
      icon: (
        <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      )
    }
  ];

  // Key accomplishments
  const keyMilestones = [
    {
      year: "2022",
      title: "Founded as a Consulting Company",
      description: "Technexus was established to provide expert consulting services in fintech and lending technology"
    },
    {
      year: "2022",
      title: "Client Portfolio Growth",
      description: "Expanded services to multiple financial institutions across North America"
    },
    {
      year: "2023",
      title: "Technology Research & Development",
      description: "Initiated research into AI-powered lending platforms based on client needs"
    },
    {
      year: "2023",
      title: "Product Blueprint",
      description: "Developed comprehensive blueprint for the next-generation lending platform"
    },
    {
      year: "2024",
      title: "Seed Funding & Product Launch",
      description: "Secured seed funding to transform from consulting to product company with innovative lending solution"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Our Vision & Expertise
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mt-6">
              Technexus combines deep expertise in fintech, AI, and lending operations to build the next generation of lending technology. Our mission is to transform lending through technology that empowers both lenders and borrowers.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Expertise</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              We combine decades of industry knowledge across key disciplines to deliver an unparalleled lending platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertiseAreas.map((area, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="mb-6">
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Our Journey</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              From consulting roots to product innovation
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200"></div>

            <div className="space-y-20">
              {/* 2022 Founding */}
              <div className="relative">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-black text-white px-4 py-2 rounded-full z-10 font-bold">
                    2022
                  </div>
                </div>
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm max-w-2xl mx-auto">
                  <h3 className="text-xl font-bold mb-3">Company Founding</h3>
                  <p className="text-gray-600">
                    Technexus was founded as a specialized consulting firm focusing on helping financial institutions modernize their lending processes and systems through technology-driven solutions.
                  </p>
                </div>
              </div>

              {/* 2023 Client Portfolio */}
              <div className="relative">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-black text-white px-4 py-2 rounded-full z-10 font-bold">
                    2023
                  </div>
                </div>
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm max-w-2xl mx-auto">
                  <h3 className="text-xl font-bold mb-3">Growing Client Portfolio</h3>
                  <p className="text-gray-600">
                    Expanded our consulting services to leading credit unions and alternative lenders across Canada, building a reputation for delivering exceptional technological insights and solutions in the lending space.
                  </p>
                </div>
              </div>

              {/* 2023 R&D */}
              <div className="relative">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-black text-white px-4 py-2 rounded-full z-10 font-bold">
                    2023 Q4
                  </div>
                </div>
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm max-w-2xl mx-auto">
                  <h3 className="text-xl font-bold mb-3">Technology Research & Development</h3>
                  <p className="text-gray-600">
                    Began intensive research and development on AI-powered lending technology, with a focus on credit assessment algorithms, process automation, and financial inclusion methodology.
                  </p>
                </div>
              </div>

              {/* 2024 Q1 */}
              <div className="relative">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-black text-white px-4 py-2 rounded-full z-10 font-bold">
                    2024 Q1
                  </div>
                </div>
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm max-w-2xl mx-auto">
                  <h3 className="text-xl font-bold mb-3">Product Blueprint</h3>
                  <p className="text-gray-600">
                    Finalized the blueprint for our lending platform, incorporating insights from our consulting work and innovative technologies to address critical gaps in the lending market.
                  </p>
                </div>
              </div>

              {/* 2024 Q2 */}
              <div className="relative">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-black text-white px-4 py-2 rounded-full z-10 font-bold">
                    2024 Q2
                  </div>
                </div>
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm max-w-2xl mx-auto">
                  <h3 className="text-xl font-bold mb-3">Seed Funding & Development</h3>
                  <p className="text-gray-600">
                    Secured seed funding to transition from consulting to product development, assembling a specialized team of engineers and data scientists to build our AI-powered lending platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Approach</h2>
              <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
                <h3 className="text-xl font-bold mb-3">Client-Centered Innovation</h3>
                <p className="text-gray-600">
                  We develop solutions by deeply understanding the challenges faced by financial institutions and their customers. Our consulting background gives us unique insights into real-world lending problems that need solving.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
                <h3 className="text-xl font-bold mb-3">Ethical AI Development</h3>
                <p className="text-gray-600">
                  Our AI models are built with fairness and transparency at their core. We believe advanced technology should enhance human decision-making while reducing biases and increasing access to financial services.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
                <h3 className="text-xl font-bold mb-3">Continuous Improvement</h3>
                <p className="text-gray-600">
                  We embrace an iterative approach, constantly refining our products based on performance data and client feedback. This ensures our platform stays ahead of market needs and technological advancements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Looking to the Future */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Looking to the Future</h2>
            <p className="text-gray-300 text-lg mb-10">
              We're building a world where lending decisions are faster, fairer, and more accessible to all. Our vision is shaped by our commitment to ethical AI and financial inclusion.
            </p>
            <p className="text-gray-300 text-lg mb-10">
              As we transition from consulting to product company, we remain focused on creating technology that empowers both lenders and borrowers through intelligence, transparency, and trust.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="inline-block px-8 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                Connect With Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 