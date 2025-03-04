"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function CompliancePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
              Compliance
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mt-6">
              Our commitment to meeting regulatory requirements and industry standards in the financial technology space.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Compliance Framework</h2>
              <p className="text-gray-600 mb-6">
                At Technexus, compliance isn't merely about meeting requirements—it's about establishing trust with our clients, partners, and regulators. We've built our compliance framework to ensure our lending technology platform operates with integrity and transparency in all aspects of our business.
              </p>
              <p className="text-gray-600">
                Our approach to compliance is proactive and comprehensive, addressing not only current regulatory requirements but also anticipating future developments in the rapidly evolving financial technology landscape.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-[350px] bg-gray-100 rounded-lg flex items-center justify-center">
                <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="40" y="40" width="200" height="200" rx="8" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                  <rect x="60" y="70" width="160" height="30" rx="4" fill="#e5e7eb"/>
                  <rect x="60" y="110" width="160" height="30" rx="4" fill="#e5e7eb"/>
                  <rect x="60" y="150" width="160" height="30" rx="4" fill="#e5e7eb"/>
                  <circle cx="80" cy="190" r="12" fill="#d1d5db"/>
                  <path d="M76 190L80 194L86 186" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="100" y="184" width="100" height="12" rx="2" fill="#d1d5db"/>
                  <path d="M240 108L240 172" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M232 100L240 108L248 100" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M232 180L240 172L248 180" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="140" cy="40" r="24" fill="#f9fafb" stroke="#000000" strokeWidth="2"/>
                  <path d="M130 40L138 48L150 33" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Compliance */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Regulatory Compliance</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Meeting the standards set by financial regulatory authorities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Financial Consumer Agency of Canada (FCAC)</h3>
              <p className="text-gray-600">
                Our platform is designed with consumer protection in mind, aligning with FCAC guidelines for transparency, disclosure, and fair treatment of consumers in financial transactions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">AML & KYC Procedures</h3>
              <p className="text-gray-600">
                We implement robust Anti-Money Laundering (AML) and Know Your Customer (KYC) procedures to verify customer identities and prevent financial crimes, in accordance with FINTRAC requirements.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">OSFI Guidelines</h3>
              <p className="text-gray-600">
                For our financial institution partners, we ensure our technology aligns with the Office of the Superintendent of Financial Institutions (OSFI) guidelines, particularly regarding risk management and technology governance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">CLA Membership (Future)</h3>
              <p className="text-gray-600">
                We are planning to begin discussions to become a product member of the Canadian Lenders Association (CLA). This future membership will help us stay at the forefront of lending innovation while adhering to industry best practices and standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Protection Compliance */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Data Protection Compliance</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Safeguarding personal and financial information through comprehensive data protection measures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">PIPEDA Compliance</h3>
              <p className="text-gray-600">
                We adhere to the Personal Information Protection and Electronic Documents Act (PIPEDA), ensuring proper collection, use, and disclosure of personal information in our commercial activities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Provincial Privacy Laws</h3>
              <p className="text-gray-600">
                We comply with provincial privacy legislation, including Quebec's Law 25, British Columbia's PIPA, and Alberta's PIPA, ensuring consistent protection across all Canadian jurisdictions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Consumer Privacy Framework</h3>
              <p className="text-gray-600">
                Our privacy framework includes clear consent mechanisms, purpose limitations for data collection, and transparent privacy policies to ensure users understand how their information is handled.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Data Breach Response</h3>
              <p className="text-gray-600">
                We maintain a comprehensive data breach response plan, including notification procedures and remediation strategies, to address potential security incidents promptly and effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Standards & Certifications */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Industry Standards & Certifications</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Pursuing industry-recognized certifications to validate our security and compliance measures
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4">SOC Certifications (In Progress)</h3>
              <p className="text-gray-600 mb-4">
                We are currently in the preparatory phase for both SOC 1 and SOC 2 Type II certifications. These certifications will validate our controls related to financial reporting, security, availability, processing integrity, confidentiality, and privacy.
              </p>
              <p className="text-gray-600">
                We expect to begin the formal SOC assessment process in the coming months and are committed to achieving these important industry certifications to further demonstrate our dedication to security and compliance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4">ISO 27001 (Future Planning)</h3>
              <p className="text-gray-600">
                We are following ISO 27001 principles in our information security management system design and plan to pursue formal certification in the future as our organization grows. This international standard will help us systematically manage information security risks and protect sensitive information.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">PCI DSS Compliance (For Payment Processing)</h3>
              <p className="text-gray-600">
                We adhere to Payment Card Industry Data Security Standard (PCI DSS) requirements for any payment processing functionality, ensuring the secure handling of payment card information through our trusted payment processing partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Governance */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Compliance Governance</h2>
            <p className="text-gray-600 text-lg mb-12">
              Our compliance framework is integrated throughout our organization, with oversight at every level:
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black text-white flex items-center justify-center mr-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Board Oversight</h3>
                  <p className="text-gray-600">
                    Our board provides ultimate oversight of our compliance program, regularly reviewing compliance reports and risk assessments to ensure the company meets its regulatory obligations.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black text-white flex items-center justify-center mr-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Compliance Team</h3>
                  <p className="text-gray-600">
                    Our dedicated compliance team is responsible for implementing our compliance program, monitoring regulatory changes, conducting risk assessments, and providing guidance on compliance matters.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black text-white flex items-center justify-center mr-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Regular Audits & Assessments</h3>
                  <p className="text-gray-600">
                    We conduct regular internal compliance audits and engage third-party experts to assess our compliance program's effectiveness and identify areas for improvement.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black text-white flex items-center justify-center mr-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Training & Awareness</h3>
                  <p className="text-gray-600">
                    All employees receive regular compliance training to ensure they understand their roles in maintaining compliance and can identify and address compliance issues effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Commitment */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Commitment to Compliance</h2>
            <p className="text-gray-600 text-lg mb-8">
              At Technexus, our goal is not just to meet regulatory requirements but to exceed them. We believe that strong compliance practices are essential for building trust with our clients, partners, and regulators.
            </p>
            <p className="text-gray-600 text-lg mb-8">
              We continuously monitor the regulatory landscape and adapt our compliance program to address new requirements and emerging risks. This proactive approach ensures that our lending technology platform remains at the forefront of compliance excellence.
            </p>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Contact Our Compliance Team
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
              <Link href="/security" className="text-black hover:text-gray-700">
                Security
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 