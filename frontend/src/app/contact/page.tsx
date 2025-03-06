"use client";

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import axios from 'axios';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
    loading: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set loading state
    setFormStatus({
      ...formStatus,
      loading: true
    });
    
    console.log('Submitting contact form:', formData);
    
    try {
      // Use the backend API endpoint instead of the Next.js API route
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      console.log('Using backend URL for contact page:', backendUrl);
      

      const response = await axios.post(`${backendUrl}/email/send`, {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || `Contact Form: ${formData.company || formData.name}`,
        message: `
          Name: ${formData.name}
          Email: ${formData.email}
          ${formData.company ? `Company: ${formData.company}` : ''}
          Subject: ${formData.subject}
          
          Message:
          ${formData.message}
        `
      });
      
      const data = response.data;
      console.log('Email API response:', data);
      
      if (data.success) {
        // Display success message
        setFormStatus({
          submitted: true,
          error: false,
          message: 'Thank you for your message. We will get back to you shortly.',
          loading: false
        });
        
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending contact form email:', error);
      
      // Handle error
      setFormStatus({
        submitted: true,
        error: true,
        message: error instanceof Error ? error.message : 'There was an error submitting your form. Please try again later.',
        loading: false
      });
    }
  };

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '123 Tech Plaza, Suite 400',
      cityState: 'San Francisco, CA 94105',
      country: 'United States',
      phone: '+1 (415) 555-0123',
      email: 'sf@technexus.com',
      hours: 'Mon-Fri: 9am-6pm PT'
    },
    {
      city: 'New York',
      address: '400 Finance Avenue, Floor 22',
      cityState: 'New York, NY 10001',
      country: 'United States',
      phone: '+1 (212) 555-0123',
      email: 'nyc@technexus.com',
      hours: 'Mon-Fri: 9am-6pm ET'
    },
    {
      city: 'London',
      address: '84 Fintech Street',
      cityState: 'London, EC2A 4NE',
      country: 'United Kingdom',
      phone: '+44 20 7123 4567',
      email: 'london@technexus.com',
      hours: 'Mon-Fri: 9am-6pm GMT'
    }
  ];

  const departments = [
    {
      name: 'Sales',
      email: 'sales@technexus.ca',
      description: 'For inquiries about our products, pricing, and custom solutions.'
    },
    {
      name: 'Support',
      email: 'support@technexus.ca',
      description: 'Technical assistance and customer service for existing clients.'
    },
    {
      name: 'Partnerships',
      email: 'partners@technexus.ca',
      description: 'Explore integration and strategic partnership opportunities.'
    },
    {
      name: 'Careers',
      email: 'careers@technexus.ca',
      description: 'Questions about job openings and our hiring process.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
              Contact Us
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mt-6">
              Have questions or want to learn more about our AI lending platform? Reach out to our team and we'll be happy to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-black">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                We'd love to hear from you. Please fill out this form and we'll get back to you as soon as possible.
              </p>
              
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4 text-black">Headquarters</h3>
                <p className="text-gray-600">
                  40 King St W, 41st Floor
                  <br />
                  Toronto, ON M5H 3Y2
                  <br />
                  Canada
                </p>
                <p className="text-gray-600 mt-4">
                  <strong>General Inquiries:</strong><br />
                  <a href="mailto:info@technexus.ca" className="text-black hover:underline">info@technexus.ca</a><br />
                  <a href="tel:+16475544857" className="text-black hover:underline">+1 (647) 554-4857</a>
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                    {/* X logo (formerly Twitter) */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              {formStatus.submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  {formStatus.error ? (
                    <>
                      <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <h3 className="text-xl font-bold text-red-800 mb-2">Oops!</h3>
                    </>
                  ) : (
                    <>
                      <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
                    </>
                  )}
                  <p className={`${formStatus.error ? 'text-red-700' : 'text-green-700'}`}>{formStatus.message}</p>
                  <button 
                    onClick={() => setFormStatus({ submitted: false, error: false, message: '', loading: false })}
                    className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 shadow-sm">
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-black focus:border-black text-black" 
                      required 
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-black focus:border-black text-black" 
                      required 
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-black focus:border-black text-black" 
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <select 
                      id="subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-black focus:border-black text-black" 
                      required
                    >
                      <option value="">Please select</option>
                      <option value="Sales Inquiry">Sales Inquiry</option>
                      <option value="Support Request">Support Request</option>
                      <option value="Partnership Opportunity">Partnership Opportunity</option>
                      <option value="Press Inquiry">Press Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      rows={6} 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-black focus:border-black text-black" 
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mt-8">
                    <button 
                      type="submit" 
                      className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
                      disabled={formStatus.loading}
                    >
                      {formStatus.loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Department Contacts</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Reach out directly to the team that can best assist with your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-black">{dept.name}</h3>
                <p className="text-gray-600 mb-4">{dept.description}</p>
                <a href={`mailto:${dept.email}`} className="inline-flex items-center text-black font-medium hover:translate-x-2 transition-transform">
                  {dept.email}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Frequently Asked Questions</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Find quick answers to common questions about our services and support.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:shadow-sm transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-black">What support options are available for customers?</h3>
              <p className="text-gray-600">
                Our customers have access to 24/7 email support, phone support during business hours, a comprehensive knowledge base, and dedicated account managers for enterprise customers.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:shadow-sm transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-black">How can I request a product demo?</h3>
              <p className="text-gray-600">
                You can request a personalized demo by contacting our sales team at sales@technexus.ca or by filling out the contact form on this page. A representative will get back to you within 24 hours to schedule a convenient time.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:shadow-sm transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-black">Do you offer implementation assistance for new customers?</h3>
              <p className="text-gray-600">
                Yes, we provide comprehensive implementation support including system setup, data migration, integration with existing systems, and staff training. Our customer success team will guide you through the entire process.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:shadow-sm transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-black">How do I report a technical issue with the platform?</h3>
              <p className="text-gray-600">
                Technical issues can be reported through our support portal, by emailing support@technexus.ca, or by calling our technical support hotline. For urgent issues, we recommend calling directly for the fastest response.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/faq" className="inline-block border-2 border-black text-black hover:bg-black hover:text-white py-3 px-8 rounded-lg font-medium transition-colors">
              View All FAQs
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
} 