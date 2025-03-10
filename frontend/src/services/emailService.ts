import { api } from '@/lib/api';

export interface EmailAttachment {
  name: string;
  file: File;
  size: number;
}

export interface EmailData {
  id?: string;
  from: string;
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  body: string;
  attachments?: EmailAttachment[];
  connectionId?: string;
  connectionType?: string;
  createdAt?: string;
  status?: 'draft' | 'sent' | 'failed';
}

export const emailService = {
  // Send an email
  async sendEmail(emailData: EmailData): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const formData = new FormData();
      
      // Append all text fields
      formData.append('from', emailData.from);
      formData.append('to', emailData.to);
      if (emailData.cc) formData.append('cc', emailData.cc);
      if (emailData.bcc) formData.append('bcc', emailData.bcc);
      formData.append('subject', emailData.subject);
      
      // The backend expects either 'text' or 'html', not 'body'
      if (emailData.body.includes('<') && emailData.body.includes('>')) {
        // If the body contains HTML tags, send it as HTML
        formData.append('html', emailData.body);
      } else {
        // Otherwise, send it as plain text
        formData.append('text', emailData.body);
      }
      
      // Also include the original body field for compatibility
      formData.append('body', emailData.body);
      
      // Add connection data if available
      if (emailData.connectionId) {
        formData.append('connectionId', emailData.connectionId);
      }
      if (emailData.connectionType) {
        formData.append('connectionType', emailData.connectionType);
      }
      
      // Append attachments if any
      if (emailData.attachments && emailData.attachments.length > 0) {
        emailData.attachments.forEach((attachment) => {
          // Use 'attachments' as the field name to match the backend multer configuration
          formData.append('attachments', attachment.file, attachment.name);
        });
      }
      
      const response = await api.post('/api/emails/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return {
        success: true,
        message: 'Email sent successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: 'Failed to send email',
      };
    }
  },
  
  // Save email as draft
  async saveDraft(emailData: EmailData): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const response = await api.post('/api/emails/draft', emailData);
      
      return {
        success: true,
        message: 'Email draft saved',
        data: response.data,
      };
    } catch (error) {
      console.error('Error saving draft:', error);
      return {
        success: false,
        message: 'Failed to save draft',
      };
    }
  },
  
  // Get emails for a specific connection
  async getEmailsByConnection(connectionId: string, connectionType: string): Promise<EmailData[]> {
    try {
      const response = await api.get(`/api/emails/connection/${connectionType}/${connectionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching emails:', error);
      return [];
    }
  },
  
  // Get all emails for the current user
  async getUserEmails(): Promise<EmailData[]> {
    try {
      const response = await api.get('/api/emails');
      return response.data;
    } catch (error) {
      console.error('Error fetching user emails:', error);
      return [];
    }
  }
};

export default emailService; 