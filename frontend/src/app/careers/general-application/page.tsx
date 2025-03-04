"use client";

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function GeneralApplicationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resumeLink: '',
    portfolioLink: '',
    coverLetter: '',
    areaOfInterest: '',
    heardAbout: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // In a real app, you would send the form data to your API endpoint
      // await fetch('/api/submit-application', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // For demo purposes, simulate a successful submission after a delay
      setTimeout(() => {
        setSubmitted(true);
        setSubmitting(false);
      }, 1500);
    } catch (err) {
      setError('There was an error submitting your application. Please try again.');
      setSubmitting(false);
    }
  };

  const areasOfInterest = [
    'Engineering',
    'Data Science',
    'Product Management',
    'Design',
    'Marketing',
    'Sales',
    'Customer Success',
    'Finance',
    'Operations',
    'Other',
  ];

  return (
    <Layout>
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              General Application
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mt-6">
              Don't see a position that matches your skills and experience? We're always looking for exceptional talent to join our team.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          {!submitted ? (
            <>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Tell Us About Yourself</h2>
                <p className="text-gray-600">
                  Please fill out the form below to submit your general application. We'll review your information and contact you if there's a potential match with our current or future openings.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="areaOfInterest" className="block text-sm font-medium text-gray-700 mb-1">
                      Area of Interest *
                    </label>
                    <select
                      id="areaOfInterest"
                      name="areaOfInterest"
                      required
                      value={formData.areaOfInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select an area</option>
                      {areasOfInterest.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700 mb-1">
                      Resume Link *
                    </label>
                    <input
                      type="url"
                      id="resumeLink"
                      name="resumeLink"
                      required
                      placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                      value={formData.resumeLink}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Please provide a link to your resume. We accept PDF, Word, or Google Docs formats.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="portfolioLink" className="block text-sm font-medium text-gray-700 mb-1">
                      Portfolio/LinkedIn/GitHub Link
                    </label>
                    <input
                      type="url"
                      id="portfolioLink"
                      name="portfolioLink"
                      placeholder="https://"
                      value={formData.portfolioLink}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="heardAbout" className="block text-sm font-medium text-gray-700 mb-1">
                      How did you hear about us?
                    </label>
                    <input
                      type="text"
                      id="heardAbout"
                      name="heardAbout"
                      value={formData.heardAbout}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                      Why are you interested in joining Technexus? *
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows={6}
                      required
                      placeholder="Tell us about your interest in Technexus, relevant experience, and what you hope to contribute."
                      value={formData.coverLetter}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`inline-flex items-center px-6 py-3 ${
                      submitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white rounded-lg font-medium transition-colors`}
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Thank you for your interest in joining Technexus. We've received your application and will review it shortly. We'll be in touch if there's a match with our current or future openings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/careers" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Return to Careers
                </Link>
                <Link href="/" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Our Hiring Process</h2>
            <p className="text-gray-600 mb-10">
              We've designed our hiring process to be thorough, fair, and efficient. Here's what you can expect:
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
              
              <div className="relative z-10 mb-12">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center mr-4 z-10">
                    <span className="text-white font-medium">1</span>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 ml-2 w-full">
                    <h3 className="font-bold mb-2">Application Review</h3>
                    <p className="text-gray-600">
                      Our team reviews your application materials and evaluates your skills, experience, and potential fit with our team and culture.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mb-12">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center mr-4 z-10">
                    <span className="text-white font-medium">2</span>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 ml-2 w-full">
                    <h3 className="font-bold mb-2">Initial Conversation</h3>
                    <p className="text-gray-600">
                      If there's a potential match, we'll reach out to schedule a brief call to learn more about your background and interests, and share details about relevant opportunities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mb-12">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center mr-4 z-10">
                    <span className="text-white font-medium">3</span>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 ml-2 w-full">
                    <h3 className="font-bold mb-2">Keep You Informed</h3>
                    <p className="text-gray-600">
                      We'll keep your resume on file for future opportunities that align with your skills and experience. If a suitable position opens up, we'll contact you to discuss next steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 