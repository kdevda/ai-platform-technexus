"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mt-6">
              Last updated: May 1, 2024
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <p>
              Technexus ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our loan management platform and services (collectively, the "Services").
            </p>
            
            <p>
              Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-bold mt-8 mb-2">Personal Information</h3>
            
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            
            <ul className="list-disc ml-6 space-y-2">
              <li>Register for an account</li>
              <li>Express interest in obtaining information about us or our products and services</li>
              <li>Apply for a loan or financial product</li>
              <li>Participate in activities on our Services</li>
              <li>Contact us</li>
            </ul>
            
            <p>
              The personal information we collect may include:
            </p>
            
            <ul className="list-disc ml-6 space-y-2">
              <li>Name, email address, phone number, and mailing address</li>
              <li>Date of birth, Social Insurance Number (SIN), and government-issued identification</li>
              <li>Financial information, including income, expenses, assets, and liabilities</li>
              <li>Employment information</li>
              <li>Credit history and credit scores</li>
              <li>Banking information</li>
              <li>Any other information you choose to provide</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-8 mb-2">Information Automatically Collected</h3>
            
            <p>
              When you use our Services, we may automatically collect certain information, including:
            </p>
            
            <ul className="list-disc ml-6 space-y-2">
              <li>Device information (such as your mobile device ID, model, and manufacturer)</li>
              <li>IP address, browser type, operating system</li>
              <li>Location information</li>
              <li>Usage data, such as pages visited, time spent on those pages, and click-through data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">How We Use Your Information</h2>
            
            <p>
              We may use the information we collect for various purposes, including to:
            </p>
            
            <ul className="list-disc ml-6 space-y-2">
              <li>Provide, maintain, and improve our Services</li>
              <li>Process loan applications and manage your account</li>
              <li>Assess creditworthiness and make lending decisions</li>
              <li>Personalize your experience and deliver content</li>
              <li>Communicate with you about our Services</li>
              <li>Send administrative information, such as updates or security alerts</li>
              <li>Respond to your inquiries and requests</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Protect against fraudulent or unauthorized activity</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">How We Share Your Information</h2>
            
            <p>
              We may share your information with:
            </p>
            
            <ul className="list-disc ml-6 space-y-2">
              <li>Service providers that help us deliver our Services</li>
              <li>Credit bureaus and credit reporting agencies</li>
              <li>Financial institutions and payment processors</li>
              <li>Professional advisors, such as lawyers, auditors, and insurers</li>
              <li>Regulatory authorities, law enforcement, and other governmental agencies</li>
              <li>Business partners for marketing and promotional purposes (with your consent)</li>
              <li>Potential buyers or investors in the event of a business transaction</li>
            </ul>
            
            <p>
              We may also share your information:
            </p>
            
            <ul className="list-disc ml-6 space-y-2">
              <li>To comply with applicable laws and regulations</li>
              <li>To respond to a subpoena, court order, or legal process</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>With your consent or at your direction</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">Cookies and Tracking Technologies</h2>
            
            <p>
              We use cookies and similar tracking technologies to track activity on our Services and hold certain information. Cookies are files with small amounts of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">Security of Your Information</h2>
            
            <p>
              We use administrative, technical, and physical security measures to protect your personal information. While we have taken reasonable steps to secure the information you provide to us, please be aware that no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against interception or other types of misuse.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">Data Retention</h2>
            
            <p>
              We will retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. To determine the appropriate retention period, we consider the amount, nature, and sensitivity of the personal information, the potential risk of harm from unauthorized use or disclosure, and applicable legal requirements.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">Your Rights and Choices</h2>
            
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            
            <ul className="list-disc ml-6 space-y-2">
              <li>The right to access and receive a copy of your personal information</li>
              <li>The right to rectify or update your personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to restrict or object to our processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">Children's Privacy</h2>
            
            <p>
              Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">Changes to This Privacy Policy</h2>
            
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">Contact Us</h2>
            
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            
            <address className="not-italic mt-4">
              Technexus Inc.<br />
              40 King St W, 41st Floor
              <br />
              Toronto, ON M5H 3Y2
              <br />
              Canada
              <br />
              Email: privacy@technexus.ca<br />
              Phone: (647) 554-4857
            </address>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-6">
              <Link href="/terms-of-service" className="text-black hover:text-gray-700">
                Terms of Service
              </Link>
              <Link href="/security" className="text-black hover:text-gray-700">
                Security
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