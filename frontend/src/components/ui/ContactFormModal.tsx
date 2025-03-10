import React, { useState } from 'react';
import axios from 'axios';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  heading: string;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({ isOpen, onClose, heading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
    loading: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      loading: true,
      error: false,
      message: ''
    });
    
    console.log('Submitting contact form:', formData);
    
    try {
      // Use the backend API endpoint instead of the Next.js API route
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      console.log('Using backend URL for contact form:', backendUrl);
      
      const response = await axios.post(`${backendUrl}/api/email/contact`, {
        name: formData.name,
        email: formData.email,
        subject: `Contact Form: ${formData.company || formData.name}`,
        message: `
          Name: ${formData.name}
          Email: ${formData.email}
          ${formData.company ? `Company: ${formData.company}` : ''}
          ${formData.phone ? `Phone: ${formData.phone}` : ''}
          
          Message:
          ${formData.message}
        `
      });
      
      console.log('Email API response:', response.data);
      
      // Display success message
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you for your interest. We will get back to you shortly.',
        loading: false
      });
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending contact form email:', error);
      
      let errorMessage = 'There was an error submitting your form. Please try again later.';
      
      if (axios.isAxiosError(error) && error.response) {
        console.error('API response error:', error.response.data);
        
        if (error.response.data?.error) {
          errorMessage += ` (${error.response.data.error})`;
        }
      }
      
      // Handle error
      setFormStatus({
        submitted: true,
        error: true,
        message: errorMessage,
        loading: false
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4" 
      style={{ 
        backgroundColor: 'rgba(0,0,0,0.2)',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        style={{
          transform: isOpen ? 'scale(1)' : 'scale(0.95)',
          opacity: isOpen ? 1 : 0,
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out'
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black">{heading}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {formStatus.submitted ? (
            <div className="text-center py-8">
              {formStatus.error ? (
                <>
                  <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="text-xl font-bold text-red-800 mb-2">Oops!</h3>
                </>
              ) : (
                <>
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
                </>
              )}
              <p className={`${formStatus.error ? 'text-red-700' : 'text-green-700'} mb-6`}>{formStatus.message}</p>
              <button 
                onClick={onClose}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 text-black rounded border border-gray-300 focus:ring-black focus:border-black" 
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 text-black rounded border border-gray-300 focus:ring-black focus:border-black" 
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 text-black rounded border border-gray-300 focus:ring-black focus:border-black" 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 text-black rounded border border-gray-300 focus:ring-black focus:border-black" 
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  rows={4} 
                  className="w-full px-3 py-2 text-black rounded border border-gray-300 focus:ring-black focus:border-black" 
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded mr-2 hover:bg-gray-50"
                  disabled={formStatus.loading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 flex items-center"
                  disabled={formStatus.loading}
                >
                  {formStatus.loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Submit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactFormModal; 