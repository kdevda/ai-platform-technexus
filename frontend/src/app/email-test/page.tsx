'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function EmailTest() {
  const [formData, setFormData] = useState({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Email',
    message: 'This is a test message from the email test page.'
  });
  
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleDirectTest = async () => {
    setStatus({
      loading: true,
      success: false,
      error: false,
      message: 'Sending email...'
    });
    
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      console.log('Using backend URL:', backendUrl);
      
      const response = await axios.post(`${backendUrl}/email/send`, {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      
      console.log('Direct email test response:', response.data);
      
      setStatus({
        loading: false,
        success: true,
        error: false,
        message: 'Email sent successfully! Check console for details.'
      });
    } catch (error) {
      console.error('Direct email test error:', error);
      
      let errorMessage = 'Failed to send email';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage += `: ${error.response.status} - ${JSON.stringify(error.response.data)}`;
      }
      
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: errorMessage
      });
    }
  };
  
  const handleContactFormTest = async () => {
    setStatus({
      loading: true,
      success: false,
      error: false,
      message: 'Testing contact form endpoint...'
    });
    
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const response = await axios.post(`${backendUrl}/email/send`, {
        name: formData.name,
        email: formData.email,
        company: 'Test Company',
        phone: '555-1234',
        message: formData.message
      });
      
      console.log('Contact form test response:', response.data);
      
      setStatus({
        loading: false,
        success: true,
        error: false,
        message: 'Contact form submission successful! Check console for details.'
      });
    } catch (error) {
      console.error('Contact form test error:', error);
      
      let errorMessage = 'Failed to submit contact form';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage += `: ${error.response.status} - ${JSON.stringify(error.response.data)}`;
      }
      
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: errorMessage
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Email Testing Tool</h1>
      <p className="mb-4 text-gray-600">
        This page allows you to test email sending functionality using Resend.
      </p>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Test Configuration</h2>
        
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Sender Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Sender Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={handleDirectTest}
            disabled={status.loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {status.loading ? 'Sending...' : 'Test Direct Email'}
          </button>
          
          <button
            onClick={handleContactFormTest}
            disabled={status.loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {status.loading ? 'Testing...' : 'Test Contact Form'}
          </button>
        </div>
      </div>
      
      {status.message && (
        <div className={`p-4 rounded ${status.success ? 'bg-green-100 text-green-800' : status.error ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
          <p className="font-medium">{status.message}</p>
          {status.success && (
            <p className="text-sm mt-2">
              Email should be delivered to kd@technexus.ca shortly.
            </p>
          )}
        </div>
      )}
      
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting Tips</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Check browser console for detailed error messages</li>
          <li>Ensure your Resend API key is correctly set in the backend's .env file</li>
          <li>Verify the "from" email domain is verified in your Resend account</li>
          <li>Check the Network tab in browser dev tools to see the actual API requests</li>
        </ul>
      </div>
    </div>
  );
} 