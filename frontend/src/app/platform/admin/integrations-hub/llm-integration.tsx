"use client";

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

// LLM Providers
const LLM_PROVIDERS = [
  { 
    id: 'openai', 
    name: 'OpenAI', 
    description: 'ChatGPT, GPT-4 and other OpenAI models',
    fields: [
      { name: 'apiKey', label: 'API Key', type: 'password', required: true },
      { name: 'organizationId', label: 'Organization ID', type: 'text', required: false },
    ]
  },
  { 
    id: 'anthropic', 
    name: 'Anthropic', 
    description: 'Claude and other Anthropic models',
    fields: [
      { name: 'apiKey', label: 'API Key', type: 'password', required: true },
    ]
  },
  { 
    id: 'cohere', 
    name: 'Cohere', 
    description: 'Cohere Command, Embed and other models',
    fields: [
      { name: 'apiKey', label: 'API Key', type: 'password', required: true },
    ]
  },
  { 
    id: 'azure-openai', 
    name: 'Azure OpenAI', 
    description: 'OpenAI models hosted on Azure',
    fields: [
      { name: 'apiKey', label: 'API Key', type: 'password', required: true },
      { name: 'endpoint', label: 'Endpoint URL', type: 'text', required: true },
      { name: 'deploymentName', label: 'Deployment Name', type: 'text', required: true },
    ]
  },
  { 
    id: 'huggingface', 
    name: 'Hugging Face', 
    description: 'Access to Hugging Face models',
    fields: [
      { name: 'apiKey', label: 'API Key', type: 'password', required: true },
    ]
  },
];

interface Integration {
  _id: string;
  name: string;
  provider: string;
  type: string;
  apiKey: string;
  apiEndpoint?: string;
  organizationId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const LLMIntegration = () => {
  // Integration list state
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [openDialog, setOpenDialog] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    provider: 'openai',
    type: 'llm',
    apiKey: '',
    apiEndpoint: '',
    organizationId: '',
    deploymentName: '',
    isActive: true
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { state: authState } = useAuth();
  
  // Load integrations on component mount
  useEffect(() => {
    fetchIntegrations();
  }, []);
  
  // Fetch existing integrations
  const fetchIntegrations = async () => {
    try {
      setLoading(true);
      console.log('Fetching integrations...');
      
      // Use relative URL and add auth headers
      const response = await axios.get('/api/mongo/integrations', {
        headers: {
          Authorization: `Bearer ${authState.user?.token}`
        }
      });
      
      console.log('Integrations response:', response.data);
      if (response.data.success) {
        setIntegrations(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching integrations:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      // Show a mock integration for development if backend is not available
      if (process.env.NODE_ENV === 'development') {
        console.log('Using mock data for development');
        setIntegrations([
          {
            _id: 'mock-id',
            name: 'Mock OpenAI Integration',
            provider: 'openai',
            type: 'llm',
            apiKey: 'sk-mock-key',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changed to:`, value);
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user makes changes
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Special handling for provider selection
    if (name === 'provider') {
      const provider = LLM_PROVIDERS.find(p => p.id === value);
      if (provider) {
        setFormData(prev => ({ 
          ...prev, 
          name: `${provider.name} Integration`,
          // Reset related fields
          organizationId: '',
          apiEndpoint: '',
          deploymentName: ''
        }));
      }
    }
  };
  
  // Handle toggle change
  const handleToggleChange = (checked: boolean) => {
    console.log('isActive toggled to:', checked);
    setFormData(prev => ({ ...prev, isActive: checked }));
  };
  
  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.provider) {
      errors.provider = 'Provider is required';
    }
    
    if (!formData.apiKey.trim()) {
      errors.apiKey = 'API Key is required';
    }
    
    // Validate provider-specific fields
    if (formData.provider === 'azure-openai') {
      if (!formData.apiEndpoint?.trim()) {
        errors.apiEndpoint = 'Endpoint URL is required';
      }
      if (!formData.deploymentName?.trim()) {
        errors.deploymentName = 'Deployment Name is required';
      }
    }
    
    return errors;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    
    // Submit form
    try {
      setIsSubmitting(true);
      
      if (!authState.user?.token) {
        throw new Error('Authentication required - please log in again');
      }
      
      // Log the request for debugging
      console.log('Sending request to backend with data:', {
        ...formData,
        type: 'llm'
      });
      
      // Use relative path and add auth headers
      const response = await axios.post('/api/mongo/integrations', {
        ...formData,
        type: 'llm'
      }, {
        headers: {
          Authorization: `Bearer ${authState.user.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('API response:', response.data);
      if (response.data.success) {
        alert('Integration added successfully!');
        fetchIntegrations();
        setOpenDialog(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error adding integration:', error);
      
      // More detailed error handling
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert(`Failed to add integration: ${error.response.status} ${error.response.statusText}\n${JSON.stringify(error.response.data)}`);
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          alert('Failed to add integration: No response received from server. Backend might not be running.');
          console.error('Request data:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          alert(`Failed to add integration: ${error.message}`);
        }
      } else {
        alert('Failed to add integration: Unknown error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle integration toggle
  const handleToggleIntegration = async (id: string, currentStatus: boolean) => {
    try {
      setLoading(true);
      console.log(`Toggling integration ${id} from ${currentStatus} to ${!currentStatus}`);
      
      // Add auth headers
      await axios.patch(`/api/mongo/integrations/${id}/toggle`, {}, {
        headers: {
          Authorization: `Bearer ${authState.user?.token}`
        }
      });
      
      // Update local state
      setIntegrations(prevIntegrations => 
        prevIntegrations.map(integration => 
          integration._id === id 
            ? { ...integration, isActive: !integration.isActive } 
            : integration
        )
      );
      
      alert(`Integration ${currentStatus ? 'disabled' : 'enabled'} successfully!`);
    } catch (error) {
      console.error('Error toggling integration:', error);
      alert('Failed to toggle integration status. Please check console for details.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle integration deletion
  const handleDeleteIntegration = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this integration?')) {
      return;
    }
    
    try {
      setLoading(true);
      console.log(`Deleting integration ${id}`);
      
      // Add auth headers
      await axios.delete(`/api/mongo/integrations/${id}`, {
        headers: {
          Authorization: `Bearer ${authState.user?.token}`
        }
      });
      
      // Update local state
      setIntegrations(prevIntegrations => 
        prevIntegrations.filter(integration => integration._id !== id)
      );
      
      alert('Integration deleted successfully!');
    } catch (error) {
      console.error('Error deleting integration:', error);
      alert('Failed to delete integration. Please check console for details.');
    } finally {
      setLoading(false);
    }
  };
  
  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: '',
      provider: 'openai',
      type: 'llm',
      apiKey: '',
      apiEndpoint: '',
      organizationId: '',
      deploymentName: '',
      isActive: true
    });
    setFormErrors({});
  };
  
  // Handle modal open/close
  const openModal = () => {
    resetForm();
    setOpenDialog(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">LLM Integrations</h2>
        <Button onClick={openModal}>Add LLM Integration</Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : integrations.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-gray-50">
          <p className="text-gray-500">No LLM integrations configured yet.</p>
          <Button variant="outline" className="mt-4" onClick={openModal}>
            Add your first LLM integration
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => (
            <Card key={integration._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{integration.name}</CardTitle>
                    <CardDescription>{integration.provider}</CardDescription>
                  </div>
                  <Badge variant={integration.isActive ? "default" : "secondary"}>
                    {integration.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-black">Status</span>
                    <Switch
                      id={`active-${integration._id}`}
                      checked={Boolean(integration.isActive)}
                      onCheckedChange={() => 
                        handleToggleIntegration(integration._id, integration.isActive)
                      }
                    />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-black">API Key</span>
                    <div className="bg-gray-100 p-2 rounded text-sm">••••••••••••••••</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="destructive" size="sm" onClick={() => handleDeleteIntegration(integration._id)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {openDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-black">Add LLM Integration</h2>
              <p className="text-gray-700 mt-1">
                Connect to a Language Model provider to enable AI capabilities
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="provider" className="block text-sm font-medium text-black">
                  Provider
                </label>
                <select
                  id="provider"
                  name="provider"
                  value={formData.provider}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>Select a provider</option>
                  {LLM_PROVIDERS.map((provider) => (
                    <option key={provider.id} value={provider.id} className="text-black">
                      {provider.name}
                    </option>
                  ))}
                </select>
                {formErrors.provider && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.provider}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-black">
                  Integration Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
                {formErrors.name && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
                )}
              </div>

              {formData.provider && (
                <>
                  {LLM_PROVIDERS.find(p => p.id === formData.provider)?.fields.map(field => {
                    // Skip Organization ID field for providers other than OpenAI
                    if (field.name === "organizationId" && formData.provider !== "openai") {
                      return null;
                    }
                    
                    return (
                      <div key={field.name} className="space-y-2">
                        <label htmlFor={field.name} className="block text-sm font-medium text-black">
                          {field.label}
                          {field.name === "organizationId" && (
                            <span className="ml-1 text-xs text-gray-500">(Optional, for OpenAI Enterprise)</span>
                          )}
                        </label>
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={(formData as any)[field.name] || ''}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          required={field.required}
                        />
                        {formErrors[field.name] && (
                          <p className="text-sm text-red-500 mt-1">{formErrors[field.name]}</p>
                        )}
                      </div>
                    );
                  })}
                </>
              )}

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <label htmlFor="isActive" className="block text-sm font-medium text-black">
                    Active
                  </label>
                  <p className="text-sm text-gray-600">Enable this integration immediately</p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={handleToggleChange}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpenDialog(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isSubmitting ? 'Saving...' : 'Save Integration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}; 