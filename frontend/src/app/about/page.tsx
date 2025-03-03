"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
                About
                <span className="block text-black">Technexus</span>
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-xl">
                We're on a mission to transform the lending industry through ethical AI, making financial services more accessible, efficient, and fair for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Our Story</h2>
              <div className="h-1 w-20 bg-black"></div>
              <p className="text-gray-600">
                Technexus began with a simple yet ambitious vision: to revolutionize how financial institutions approach lending in the digital age.
              </p>
              <p className="text-gray-600">
                Our founders, with decades of combined experience in fintech and AI, recognized that traditional lending processes were ripe for innovation. They set out to build a platform that would leverage the power of artificial intelligence to make lending more efficient, accessible, and fair.
              </p>
              <p className="text-gray-600">
                Today, we're proud to serve financial institutions across the globe, helping them harness the power of AI to transform their lending operations while maintaining the human touch that's essential to financial relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Mission, Vision & Values</h2>
            <div className="h-1 w-20 bg-white mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-gray-200 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">Our Mission</h3>
              <p className="text-gray-600">
                To democratize access to financial services by providing financial institutions with AI tools that make lending decisions faster, fairer, and more accurate.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-gray-200 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">Our Vision</h3>
              <p className="text-gray-600">
                A world where financial institutions leverage ethical AI to provide fair, transparent, and accessible financial services to all individuals and businesses.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-gray-200 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">Our Values</h3>
              <p className="text-gray-600">
                We're guided by transparency, fairness, innovation, and a commitment to creating technology that serves humanity with integrity and respect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Detail */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Our Core Values</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              These principles guide everything we do, from product development to client relationships and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="bg-black text-white p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-black">Ethical AI</h3>
                <p className="text-gray-600">
                  We believe AI should be built with ethical considerations at the forefront, eliminating bias and promoting fairness in financial decision-making.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-black text-white p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-black">Innovation</h3>
                <p className="text-gray-600">
                  We constantly push the boundaries of what's possible in fintech, embracing new technologies and methodologies to create better solutions.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-black text-white p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-black">Inclusion</h3>
                <p className="text-gray-600">
                  We design our solutions to expand access to financial services for underserved populations and help lenders reach new markets responsibly.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-black text-white p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-black">Security</h3>
                <p className="text-gray-600">
                  We implement rigorous security measures to protect sensitive financial data, earning the trust of our clients and their customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white">
            Join us in transforming the future of lending
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Whether you're looking to partner with us, join our team, or learn more about our mission, we'd love to connect with you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              Contact Us
            </Link>
            <Link 
              href="/careers" 
              className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:text-black transition-colors"
            >
              View Careers
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
} 