"use client";

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function SeniorMLEngineerPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resumeLink: '',
    portfolioLink: '',
    coverLetter: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      //   body: JSON.stringify({...formData, position: 'Senior Machine Learning Engineer'}),
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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <Link href="/careers" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Careers
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Senior Machine Learning Engineer
            </h1>
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Toronto, ON / Remote
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Full-time
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Engineering
              </span>
            </div>
            <p className="text-gray-600 text-lg md:text-xl mt-6">
              Join our AI team to design and implement machine learning models for lending decisions, credit risk assessment, and financial forecasting.
            </p>
            <div className="mt-8">
              <a href="#apply" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Apply Now
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">About the Role</h2>
                <p className="text-gray-600 mb-4">
                  As a Senior Machine Learning Engineer at Technexus, you will play a crucial role in developing and deploying AI solutions that transform lending and credit decision processes. You'll work at the intersection of finance and artificial intelligence, building models that make fair, accurate, and efficient lending decisions while ensuring explainability and regulatory compliance.
                </p>
                <p className="text-gray-600">
                  You'll collaborate with cross-functional teams including data scientists, backend engineers, and product managers to integrate machine learning models into our platform. This is an opportunity to make a significant impact on financial inclusion by creating intelligent systems that expand access to credit while maintaining responsible lending practices.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Key Responsibilities</h2>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Design, develop, and deploy machine learning models for credit risk assessment, fraud detection, and lending decisions</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Build and maintain MLOps pipelines for model training, evaluation, and deployment</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Research and implement state-of-the-art machine learning techniques for financial applications</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Develop explainable AI solutions that provide transparency into model decisions</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Collaborate with data engineers to design data pipelines that support ML model requirements</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Analyze model performance and continuously improve models based on real-world feedback</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Work with product and compliance teams to ensure models adhere to regulatory requirements</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Mentor junior data scientists and machine learning engineers</span>
                  </li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Bachelor's degree in Computer Science, Data Science, Statistics, or related field (Master's or PhD preferred)</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>5+ years of experience building and deploying machine learning models in production environments</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Strong programming skills in Python and experience with ML frameworks such as TensorFlow, PyTorch, or scikit-learn</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Experience with cloud platforms (AWS, GCP, or Azure) and containerization technologies (Docker, Kubernetes)</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Familiarity with MLOps tools and practices (MLflow, Kubeflow, or similar)</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Experience with financial data and models is highly desirable (credit scoring, risk assessment, etc.)</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Strong understanding of statistical analysis, feature engineering, and model evaluation</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Knowledge of fairness, explainability, and responsible AI practices</span>
                  </li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Nice to Have</h2>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Experience with NLP and unstructured data analysis</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Familiarity with financial regulations related to algorithmic decision-making (FCRA, ECOA, etc.)</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Experience with graph neural networks and other advanced ML techniques</span>
                  </li>
                  <li className="flex">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Contributions to open-source projects or research publications</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-8 sticky top-8">
                <h3 className="text-xl font-bold mb-6">Job Details</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-900">Location</h4>
                      <p className="text-gray-600">Toronto, ON / Remote</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-900">Department</h4>
                      <p className="text-gray-600">Engineering</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-900">Employment Type</h4>
                      <p className="text-gray-600">Full-time</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-900">Experience Level</h4>
                      <p className="text-gray-600">Senior</p>
                    </div>
                  </div>
                </div>
                
                <a href="#apply" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  Apply for this Job
                </a>
                
                <div className="mt-6 text-center">
                  <Link href="/careers" className="text-blue-600 hover:text-blue-700 font-medium">
                    View All Openings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          {!submitted ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Apply for This Position</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Please fill out the form below to apply for the Senior Machine Learning Engineer position. We're excited to learn more about you!
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

                  <div className="md:col-span-2">
                    <label htmlFor="portfolioLink" className="block text-sm font-medium text-gray-700 mb-1">
                      Portfolio/GitHub/LinkedIn Link
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
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter / Additional Information *
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows={6}
                      required
                      placeholder="Tell us why you're interested in this position and what makes you a great fit."
                      value={formData.coverLetter}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    ></textarea>
                  </div>
                </div>

                <div>
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
            <div className="text-center bg-white rounded-xl shadow-md p-12">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Thank you for applying to the Senior Machine Learning Engineer position at Technexus. We've received your application and will review it shortly. We'll be in touch regarding next steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/careers" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Explore Other Positions
                </Link>
                <Link href="/" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
} 