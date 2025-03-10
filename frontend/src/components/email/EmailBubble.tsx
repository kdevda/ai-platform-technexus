import React, { useState, useRef, useEffect } from 'react';
import { Mail, X, Paperclip, ChevronDown, ChevronUp, Link as LinkIcon, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import emailService, { EmailAttachment } from '@/services/emailService';

interface EmailBubbleProps {
  recordId?: string;
  recordType?: string;
}

const EmailBubble: React.FC<EmailBubbleProps> = ({ 
  recordId,
  recordType
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [emailData, setEmailData] = useState({
    from: '',
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
    attachments: [] as EmailAttachment[],
    connectionId: recordId || '',
    connectionType: recordType || ''
  });
  const formRef = useRef<HTMLDivElement>(null);
  const { state } = useAuth();

  // Set the current user's email as the sender when component mounts or when auth state changes
  useEffect(() => {
    try {
      if (state.user?.email) {
        setEmailData(prev => ({ ...prev, from: state.user?.email || '' }));
      }
    } catch (error) {
      console.error('Error setting email data:', error);
    }
  }, [state.user]);

  // Close the form when clicking outside
  useEffect(() => {
    try {
      const handleClickOutside = (event: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
  
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    } catch (error) {
      console.error('Error in click outside handler:', error);
    }
  }, [isOpen]);

  // Reset form state when closed
  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setSuccess(null);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmailData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const attachment: EmailAttachment = {
        name: file.name,
        file: file,
        size: file.size
      };
      setEmailData(prev => ({ 
        ...prev, 
        attachments: [...prev.attachments, attachment]
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setEmailData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setEmailData({
      from: state.user?.email || '',
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      body: '',
      attachments: [],
      connectionId: recordId || '',
      connectionType: recordType || ''
    });
    setShowCcBcc(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.user?.token) {
      setError('You must be logged in to send emails');
      return;
    }
    
    // Validate required fields
    if (!emailData.to) {
      setError('Recipient (To) is required');
      return;
    }
    
    if (!emailData.subject) {
      setError('Subject is required');
      return;
    }
    
    if (!emailData.body) {
      setError('Email body is required');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Log what we're sending for debugging
      console.log('Sending email with data:', {
        to: emailData.to,
        subject: emailData.subject,
        bodyLength: emailData.body.length,
        hasAttachments: emailData.attachments.length > 0
      });
      
      const result = await emailService.sendEmail(emailData);
      
      if (result.success) {
        setSuccess('Email sent successfully!');
        resetForm();
        // Close the form after a short delay
        setTimeout(() => {
          setIsOpen(false);
        }, 1500);
      } else {
        console.error('Email sending failed:', result.error);
        setError(result.message || 'Failed to send email');
      }
    } catch (err) {
      console.error('Exception during email sending:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const saveDraft = async () => {
    if (!state.user?.token) {
      setError('You must be logged in to save drafts');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await emailService.saveDraft(emailData);
      
      if (result.success) {
        setSuccess('Draft saved!');
        // Don't reset the form for drafts
      } else {
        setError(result.message || 'Failed to save draft');
      }
    } catch (err) {
      setError('An unexpected error occurred while saving draft');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a computed title for the email header
  const emailTitle = emailData.subject.trim() ? emailData.subject : 'New Email';

  // Don't render anything if authentication is still loading
  if (state.loading) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Email Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-gray-700 text-white rotate-90' 
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {isOpen ? <X size={24} /> : <Mail size={24} />}
      </button>

      {/* Email Form Card */}
      {isOpen && (
        <div 
          ref={formRef}
          className="absolute bottom-20 right-0 w-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
        >
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium text-gray-800 truncate max-w-[220px]" title={emailTitle}>
              {emailTitle}
            </h3>
            {success && (
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {success}
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4">
            {/* From Field */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">From</label>
              <input
                type="email"
                name="from"
                value={emailData.from}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
                readOnly
              />
            </div>

            {/* To Field */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">To</label>
              <input
                type="email"
                name="to"
                value={emailData.to}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
                required
              />
            </div>

            {/* CC/BCC Toggle */}
            <div className="mb-3">
              <button
                type="button"
                onClick={() => setShowCcBcc(!showCcBcc)}
                className="text-xs flex items-center text-gray-600 hover:text-gray-900"
              >
                {showCcBcc ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                <span className="ml-1">{showCcBcc ? 'Hide CC/BCC' : 'Show CC/BCC'}</span>
              </button>
            </div>

            {/* CC and BCC Fields (Conditional) */}
            {showCcBcc && (
              <>
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">CC</label>
                  <input
                    type="email"
                    name="cc"
                    value={emailData.cc}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">BCC</label>
                  <input
                    type="email"
                    name="bcc"
                    value={emailData.bcc}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
                  />
                </div>
              </>
            )}

            {/* Subject Field */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={emailData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
                required
              />
            </div>

            {/* Body Field */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="body"
                value={emailData.body}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none text-black"
                required
              />
            </div>

            {/* Error Message Display */}
            {error && (
              <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Bottom Action Bar */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                {/* Attachment Button */}
                <label className="cursor-pointer flex items-center text-gray-600 hover:text-gray-900 text-xs">
                  <Paperclip size={16} className="mr-1" />
                  <span>Attach</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </label>
                
                {/* Connection Selector */}
                <div className="flex items-center">
                  <LinkIcon size={16} className="mr-1 text-gray-600" />
                  <select
                    name="connectionId"
                    value={emailData.connectionId}
                    onChange={handleChange}
                    className="text-xs border border-gray-300 rounded p-1 focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="">No connection</option>
                    {recordId && (
                      <option value={recordId}>{recordType}: {recordId}</option>
                    )}
                    {/* TODO: Load other potential connections here */}
                  </select>
                </div>
              </div>

              <div className="flex space-x-2">
                {/* Save Draft Button */}
                <button
                  type="button"
                  onClick={saveDraft}
                  disabled={isLoading}
                  className="px-3 py-2 bg-gray-200 text-gray-800 text-xs font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Draft
                </button>
                
                {/* Send Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 flex items-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={14} className="mr-2 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send</span>
                  )}
                </button>
              </div>
            </div>

            {/* Attachment Previews */}
            {emailData.attachments.length > 0 && (
              <div className="mt-3 border-t border-gray-200 pt-3">
                <p className="text-xs font-medium text-gray-700 mb-2">Attachments</p>
                <div className="space-y-2">
                  {emailData.attachments.map((attachment, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded-md border border-gray-200 flex justify-between items-center">
                      <div className="flex items-center space-x-2 overflow-hidden">
                        <Paperclip size={12} className="text-gray-500 flex-shrink-0" />
                        <span className="text-xs truncate text-black font-medium">{attachment.name}</span>
                        <span className="text-xs text-gray-500">
                          ({Math.round(attachment.size / 1024)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-gray-500 hover:text-gray-700 flex-shrink-0"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default EmailBubble; 