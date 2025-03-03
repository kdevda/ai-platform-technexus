"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function PressPage() {
  const pressReleases = [
    {
      title: 'TechNexus Secures $12M Series A Funding to Expand AI Lending Platform',
      date: 'March 15, 2023',
      excerpt: 'Funding will accelerate product development and drive international expansion efforts.',
      slug: 'series-a-funding'
    },
    {
      title: 'TechNexus Partners with Regional Banks to Pilot AI Credit Analysis Tools',
      date: 'November 8, 2022',
      excerpt: 'Partnership aims to enhance lending efficiency and accuracy for mid-sized financial institutions.',
      slug: 'regional-bank-partnership'
    },
    {
      title: 'TechNexus Named to Fintech Innovation Watch List for 2022',
      date: 'June 22, 2022',
      excerpt: 'Recognized for pioneering work in ethical AI applications for the lending industry.',
      slug: 'innovation-award'
    },
  ];

  const mediaAppearances = [
    {
      title: 'How AI is Transforming Loan Underwriting',
      publication: 'Financial Technology Today',
      date: 'April 3, 2023',
      excerpt: 'TechNexus CEO Sophia Chen discusses the future of lending technology.',
      url: '#'
    },
    {
      title: 'Ethical AI: Building Trust in Financial Services',
      publication: 'Banking Innovation Quarterly',
      date: 'February 12, 2023',
      excerpt: 'CTO Marcus Johnson on developing transparent, explainable AI systems.',
      url: '#'
    },
    {
      title: 'The New Wave of Lending Platforms',
      publication: 'Digital Finance Magazine',
      date: 'December 5, 2022',
      excerpt: 'Feature article on how TechNexus is revolutionizing access to credit.',
      url: '#'
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Press & Media
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mt-6">
              Stay updated with the latest news, announcements, and media coverage about TechNexus and our mission to transform lending through ethical AI.
            </p>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Press Releases</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Official announcements from TechNexus about product launches, partnerships, and company milestones.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pressReleases.map((release, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden group">
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-3">{release.date}</div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-black transition-colors">{release.title}</h3>
                  <p className="text-gray-600 mb-6">{release.excerpt}</p>
                  <Link href={`/press/${release.slug}`} className="inline-flex items-center text-black font-medium group-hover:translate-x-2 transition-transform">
                    Read Full Release
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/press/archive" className="inline-block border-2 border-black text-black hover:bg-black hover:text-white py-3 px-8 rounded-lg font-medium transition-colors">
              View All Press Releases
            </Link>
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">In The News</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Recent media coverage and thought leadership pieces featuring TechNexus.
            </p>
          </div>
          
          <div className="space-y-6">
            {mediaAppearances.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white group">
                <div className="sm:flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-3">
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">{item.publication}</span>
                      <span className="mx-3 text-gray-300">•</span>
                      <span className="text-gray-500 text-sm">{item.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-black transition-colors">{item.title}</h3>
                    <p className="text-gray-600 mb-4 max-w-3xl">{item.excerpt}</p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-white hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-800 transition-colors whitespace-nowrap">
                      Read Article
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/press/media-coverage" className="inline-block border-2 border-black text-black hover:bg-black hover:text-white py-3 px-8 rounded-lg font-medium transition-colors">
              Browse All Media Coverage
            </Link>
          </div>
        </div>
      </section>

      {/* Company News */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Company News</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Updates on company growth, team achievements, and product innovations.
            </p>
          </div>
          
          <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <h3 className="text-2xl font-bold mb-4">Innovation Spotlight: AI Explainability</h3>
                <p className="text-gray-600 mb-6">
                  Our team is pioneering new approaches to AI transparency in lending decisions, making complex algorithms more understandable and trustworthy for financial institutions and their customers.
                </p>
                <p className="text-gray-600 mb-8">
                  By developing intuitive visual tools that clearly explain how our AI reaches lending recommendations, we're setting new standards for responsible AI implementation in the financial sector.
                </p>
                <Link href="/blog/ai-explainability" className="inline-flex items-center text-black font-medium hover:translate-x-2 transition-transform">
                  Read More About Our Innovation
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              <div className="lg:col-span-2 relative h-64 lg:h-auto rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-900 opacity-90 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/press/company-news" className="inline-block border-2 border-black text-black hover:bg-black hover:text-white py-3 px-8 rounded-lg font-medium transition-colors">
              View All Company News
            </Link>
          </div>
        </div>
      </section>

      {/* Media Resources */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Media Resources</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Resources for journalists, bloggers, and media professionals covering TechNexus.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <svg className="w-10 h-10 text-gray-800 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <h3 className="text-xl font-bold">Media Kit & Brand Assets</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Access our company logos, product screenshots, executive photos, and brand guidelines for use in publications and articles.
              </p>
              <Link href="/media-kit" className="inline-flex items-center text-black font-medium hover:translate-x-2 transition-transform">
                Download Media Kit
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <svg className="w-10 h-10 text-gray-800 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <h3 className="text-xl font-bold">Press Events & Interviews</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Schedule interviews with our executive team, request speaker appearances, or register for upcoming press events and briefings.
              </p>
              <Link href="/press/interview-request" className="inline-flex items-center text-black font-medium hover:translate-x-2 transition-transform">
                Request an Interview
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-gray-900 rounded-xl text-white">
            <div className="sm:flex items-center justify-between">
              <div className="mb-6 sm:mb-0">
                <h3 className="text-xl font-bold mb-2">Media Inquiries</h3>
                <p className="text-gray-300">
                  For press inquiries, please contact our communications team.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:press@technexus.com" className="inline-block bg-white text-gray-900 hover:bg-gray-200 py-3 px-6 rounded-lg font-medium transition-colors text-center">
                  Email Press Team
                </a>
                <Link href="/contact" className="inline-block bg-transparent hover:bg-gray-800 border border-white py-3 px-6 rounded-lg font-medium transition-colors text-center">
                  Contact Form
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 