"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';

export default function SecurityPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
              Security
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mt-6">
              Our commitment to protecting your data and maintaining trust through industry-leading security practices.
            </p>
          </div>
        </div>
      </section>

      {/* Security Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Approach to Security</h2>
            <p className="text-gray-600 text-lg mb-8">
              At Technexus, security is fundamental to everything we do. We've built our lending platform with security at its core, implementing multiple layers of protection to safeguard sensitive financial data and maintain customer trust.
            </p>
            <p className="text-gray-600 text-lg mb-8">
              Our security team works proactively to protect against emerging threats while ensuring compliance with industry regulations and standards. We regularly review and enhance our security measures to address evolving risks in the financial technology landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Security Measures</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Comprehensive protection through multiple layers of security
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Data Encryption</h3>
              <p className="text-gray-600">
                We implement end-to-end encryption for all data, both in transit and at rest, using industry-standard encryption protocols to ensure sensitive information remains secure.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Multi-Factor Authentication</h3>
              <p className="text-gray-600">
                Our platform requires multi-factor authentication, providing an additional layer of security beyond passwords to verify user identities and prevent unauthorized access.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Regular Security Audits</h3>
              <p className="text-gray-600">
                We conduct comprehensive security audits and vulnerability assessments on a regular schedule to identify and address potential weaknesses in our systems.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Secure Development Practices</h3>
              <p className="text-gray-600">
                Our development team follows secure coding practices and conducts regular code reviews to identify and remediate potential security vulnerabilities before they reach production.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Comprehensive Logging</h3>
              <p className="text-gray-600">
                We maintain detailed logs of all system activities and access, enabling us to monitor for suspicious activities, conduct thorough investigations when needed, and maintain compliance with regulatory requirements.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Incident Response</h3>
              <p className="text-gray-600">
                Our dedicated security team has established procedures for quickly responding to potential security incidents, minimizing impact and ensuring timely resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Certifications & Compliance</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our commitment to meeting industry standards and regulatory requirements
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4">SOC Certification (In Progress)</h3>
              <p className="text-gray-600 mb-4">
                We are currently in the preparatory phase for both SOC 1 and SOC 2 Type II certifications. These certifications will validate our controls related to financial reporting, security, availability, processing integrity, confidentiality, and privacy.
              </p>
              <p className="text-gray-600">
                We expect to begin the formal SOC assessment process in the coming months and are committed to achieving these important industry certifications to further demonstrate our dedication to security and compliance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4">Regulatory Compliance</h3>
              <p className="text-gray-600">
                Our platform is designed to comply with relevant regulations including PIPEDA (Personal Information Protection and Electronic Documents Act) and other applicable financial regulations in the Canadian market.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Security Standards</h3>
              <p className="text-gray-600">
                We adhere to industry best practices and security frameworks including NIST Cybersecurity Framework and ISO 27001 principles to guide our security program and ensure comprehensive protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Security Best Practices</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Recommendations for maintaining security when using our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-black text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">
                  <strong className="text-black">Use strong, unique passwords</strong> for your account and change them regularly.
                </p>
              </div>
              
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-black text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">
                  <strong className="text-black">Enable multi-factor authentication</strong> to add an extra layer of security to your account.
                </p>
              </div>
              
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-black text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">
                  <strong className="text-black">Be cautious of phishing attempts</strong> and verify emails claiming to be from Technexus.
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-black text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">
                  <strong className="text-black">Keep your devices secure</strong> with updated operating systems and antivirus software.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-black text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">
                  <strong className="text-black">Log out of your account</strong> when using shared or public computers.
                </p>
              </div>
              
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-black text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">
                  <strong className="text-black">Review your account activity</strong> regularly and report any suspicious transactions.
                </p>
              </div>
              
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-black text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">
                  <strong className="text-black">Keep your contact information updated</strong> to receive security alerts and notifications.
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-black text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">
                  <strong className="text-black">Protect sensitive information</strong> and never share your login credentials with others.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Report Security Concerns */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Report Security Concerns</h2>
            <p className="text-gray-600 text-lg mb-8">
              We take security concerns seriously and encourage responsible disclosure of potential vulnerabilities. If you believe you've found a security issue in our platform, please contact our security team immediately.
            </p>
            <Link href="mailto:security@technexus.ca" className="inline-flex items-center px-8 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Contact Security Team
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Legal Links */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-wrap gap-6">
              <Link href="/privacy-policy" className="text-black hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-black hover:text-gray-700">
                Terms of Service
              </Link>
              <Link href="/compliance" className="text-black hover:text-gray-700">
                Compliance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 