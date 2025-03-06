"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Spinner } from '@/components/ui/Spinner';
import Image from 'next/image';
import { LLMIntegration } from './llm-integration';

interface Integration {
  id: string;
  name: string;
  type: string;
  description: string;
  logoUrl: string;
  isEnabled: boolean;
  configurationFields?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
    defaultValue?: string;
  }[];
  configuration: Record<string, any>;
}

// Default configuration fields for integrations
const DEFAULT_CONFIG_FIELDS: Record<string, Array<{name: string; type: string; required: boolean; description: string; defaultValue?: string}>> = {
  'resend': [
    {
      name: 'apiKey',
      type: 'password',
      required: true,
      description: 'API Key for Resend',
    },
    {
      name: 'fromEmail',
      type: 'email',
      required: true,
      description: 'Default sender email address',
    },
    {
      name: 'replyToEmail',
      type: 'email',
      required: false,
      description: 'Default reply-to email address',
    },
    {
      name: 'domainName',
      type: 'text',
      required: false,
      description: 'Custom sending domain (if configured)',
    },
    {
      name: 'trackingEnabled',
      type: 'text',
      required: false,
      description: 'Enable email open/click tracking (true/false)',
      defaultValue: 'false'
    },
    {
      name: 'templateDirectory',
      type: 'text',
      required: false,
      description: 'Path to email templates directory',
    }
  ],
  'stripe': [
    {
      name: 'apiKey',
      type: 'password',
      required: true,
      description: 'API Key for Stripe',
    },
    {
      name: 'webhookSecret',
      type: 'password',
      required: true,
      description: 'Webhook Secret for Stripe events',
    },
    {
      name: 'accountId',
      type: 'text',
      required: false,
      description: 'Stripe Account ID for Connect',
    }
  ],
  'default': [
    {
      name: 'apiKey',
      type: 'password',
      required: true,
      description: 'API Key',
    }
  ]
};

const IntegrationsHub: React.FC = () => {
  const { state } = useAuth();
  const token = state.user?.token || '';
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [configValues, setConfigValues] = useState<Record<string, string>>({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch integrations from the API
  useEffect(() => {
    const fetchIntegrations = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('http://localhost:5000/api/integrations', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Add default configuration fields if not present
        const enhancedData = data.map((integration: Integration) => {
          const type = integration.type.toLowerCase();
          return {
            ...integration,
            configurationFields: DEFAULT_CONFIG_FIELDS[type as keyof typeof DEFAULT_CONFIG_FIELDS] || DEFAULT_CONFIG_FIELDS.default
          };
        });
        
        setIntegrations(enhancedData);
      } catch (err) {
        console.error('Failed to fetch integrations:', err);
        setError('Failed to load integrations. Please try again later.');
        
        // If API fails, add some default integrations for development
        if (process.env.NODE_ENV === 'development') {
          setIntegrations([
            {
              id: 'resend',
              name: 'Resend',
              type: 'email',
              description: 'Email delivery service for transactional emails.',
              logoUrl: 'https://resend.com/static/favicons/favicon-32x32.png',
              isEnabled: false,
              configurationFields: DEFAULT_CONFIG_FIELDS.resend,
              configuration: {},
            },
            {
              id: 'stripe',
              name: 'Stripe',
              type: 'payment',
              description: 'Payment processing platform for online businesses.',
              logoUrl: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png',
              isEnabled: false,
              configurationFields: DEFAULT_CONFIG_FIELDS.stripe,
              configuration: {},
            },
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchIntegrations();
    }
  }, [token]);

  const handleToggleIntegration = async (id: string, enabled: boolean) => {
    try {
      const response = await fetch(`http://localhost:5000/api/integrations/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isEnabled: enabled }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const updatedIntegration = await response.json();
      
      setIntegrations(
        integrations.map((integration) =>
          integration.id === id
            ? { ...integration, isEnabled: enabled }
            : integration
        )
      );
    } catch (err) {
      console.error('Failed to toggle integration status:', err);
      // Revert the toggle in the UI
      setIntegrations(
        integrations.map((integration) =>
          integration.id === id
            ? { ...integration, isEnabled: !enabled }
            : integration
        )
      );
    }
  };

  const openConfigModal = (integration: Integration) => {
    setSelectedIntegration(integration);
    setConfigValues(integration.configuration || {});
    setIsConfigModalOpen(true);
  };

  const handleSaveConfiguration = async () => {
    if (!selectedIntegration) return;

    setSaveLoading(true);
    setError(null);
    
    try {
      // Check if integration exists in the database or needs to be created
      let response;
      
      if (selectedIntegration.id.includes('new-')) {
        // Create new integration
        response = await fetch('http://localhost:5000/api/integrations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: selectedIntegration.name,
            type: selectedIntegration.type,
            description: selectedIntegration.description,
            logoUrl: selectedIntegration.logoUrl,
            configuration: configValues,
          }),
        });
      } else {
        // Update existing integration
        response = await fetch(`http://localhost:5000/api/integrations/${selectedIntegration.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            configuration: configValues,
          }),
        });
      }
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const updatedIntegration = await response.json();
      
      // Update the integration in the list
      setIntegrations(
        integrations.map((integration) =>
          integration.id === selectedIntegration.id
            ? { 
                ...integration, 
                configuration: updatedIntegration.configuration,
                id: updatedIntegration.id // In case it was a new integration
              }
            : integration
        )
      );
      
      setIsConfigModalOpen(false);
      setSelectedIntegration(null);
    } catch (err) {
      console.error('Error saving configuration:', err);
      setError('Failed to save configuration. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setConfigValues({ ...configValues, [name]: value });
  };

  // Function to reveal masked values
  const [revealedFields, setRevealedFields] = useState<Record<string, boolean>>({});
  
  const toggleRevealField = (fieldName: string) => {
    setRevealedFields({
      ...revealedFields,
      [fieldName]: !revealedFields[fieldName]
    });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="border-b pb-4 mb-8">
          <h1 className="text-3xl font-bold">Integrations Hub</h1>
          <p className="text-gray-500 mt-2">
            Connect your platform to external services and APIs
          </p>
        </div>
        
        {/* LLM Integration Section */}
        <section className="mb-10">
          <LLMIntegration />
        </section>
        
        <div className="border-t pt-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Other Integrations</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow transition-all p-4"
                >
                  {/* Name at the top */}
                  <h3 className="font-semibold text-lg text-black text-center mb-2">{integration.name}</h3>
                  
                  {/* Logo below name - MADE BIGGER */}
                  <div className="flex justify-center mb-3">
                    <div className="w-30 h-16 flex items-center justify-center">
                      {integration.logoUrl ? (
                        <Image
                          src={integration.logoUrl}
                          alt={`${integration.name} logo`}
                          width={110}
                          height={110}
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xl font-bold text-gray-500">{integration.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-black text-xs mb-3 text-center">{integration.description}</p>
                  
                  <div className="flex flex-col space-y-2">
                    {/* Type badge */}
                    <div className="flex justify-center">
                      <span className="inline-block bg-gray-100 text-black text-xs px-2 py-1 rounded-full border border-gray-200">
                        {integration.type}
                      </span>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex items-center justify-between pt-1.5">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={integration.isEnabled}
                          onChange={(e) => handleToggleIntegration(integration.id, e.target.checked)}
                        />
                        <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-black"></div>
                        <span className="ml-2 text-xs font-medium text-black">{integration.isEnabled ? 'Enabled' : 'Disabled'}</span>
                      </label>
                      <button
                        onClick={() => openConfigModal(integration)}
                        className="py-1 px-2.5 text-black font-medium text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add new integration button */}
              <div 
                onClick={() => {
                  const newIntegration: Integration = {
                    id: `new-${Date.now()}`,
                    name: 'Resend', // Default to Resend
                    type: 'email',
                    description: 'Email delivery service for transactional emails.',
                    logoUrl: 'https://resend.com/static/favicons/favicon-32x32.png',
                    isEnabled: false,
                    configurationFields: DEFAULT_CONFIG_FIELDS.resend,
                    configuration: {}
                  };
                  setSelectedIntegration(newIntegration);
                  setConfigValues({});
                  setIsConfigModalOpen(true);
                }}
                className="bg-white rounded-lg border border-dashed border-gray-300 shadow-sm hover:shadow hover:border-black transition-all p-4 flex flex-col items-center justify-center h-[210px] cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-2 border border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="font-medium text-black text-sm">Add New Integration</p>
              </div>
            </div>
          )}
        </div>

        {/* Configuration Modal with transparent background - modern design */}
        {isConfigModalOpen && selectedIntegration && (
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div 
              className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-black">
                  {selectedIntegration.id.includes('new-') ? 'Add New Integration' : `Configure ${selectedIntegration.name}`}
                </h2>
                <button
                  onClick={() => setIsConfigModalOpen(false)}
                  className="text-black hover:text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {selectedIntegration.id.includes('new-') && (
                <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                  <div>
                    <label className="block text-black text-sm font-medium mb-2">
                      Integration Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={selectedIntegration.name}
                      onChange={(e) => setSelectedIntegration({
                        ...selectedIntegration,
                        name: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-black"
                      placeholder="Integration Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-black text-sm font-medium mb-2">
                      Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedIntegration.type}
                      onChange={(e) => {
                        const type = e.target.value;
                        setSelectedIntegration({
                          ...selectedIntegration,
                          type,
                          configurationFields: DEFAULT_CONFIG_FIELDS[type as keyof typeof DEFAULT_CONFIG_FIELDS] || DEFAULT_CONFIG_FIELDS.default
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-black"
                    >
                      <option value="email">Email</option>
                      <option value="payment">Payment</option>
                      <option value="crm">CRM</option>
                      <option value="analytics">Analytics</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-black text-sm font-medium mb-2">
                      Logo URL
                    </label>
                    <input
                      type="text"
                      value={selectedIntegration.logoUrl || ''}
                      onChange={(e) => setSelectedIntegration({
                        ...selectedIntegration,
                        logoUrl: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-black"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-black text-sm font-medium mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={selectedIntegration.description}
                      onChange={(e) => setSelectedIntegration({
                        ...selectedIntegration,
                        description: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-black"
                      placeholder="Describe what this integration does"
                      rows={3}
                      required
                    />
                  </div>
                </div>
              )}
              
              <h3 className="text-md font-semibold mb-4 text-black">Configuration</h3>
              
              <div className="space-y-4">
                {selectedIntegration.configurationFields?.map((field) => (
                  <div key={field.name} className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-black text-sm font-medium mb-2">
                      {field.name} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type={field.type === 'password' && !revealedFields[field.name] ? 'password' : 'text'}
                        value={configValues[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-black"
                        placeholder={field.description}
                        required={field.required}
                      />
                      {field.type === 'password' && (
                        <button
                          type="button"
                          onClick={() => toggleRevealField(field.name)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                        >
                          {revealedFields[field.name] ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{field.description}</p>
                  </div>
                ))}
              </div>
              
              {error && (
                <div className="mt-5 p-3 bg-red-50 text-black border border-red-200 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsConfigModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-black hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveConfiguration}
                  className="px-4 py-2 bg-black border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-800 focus:outline-none transition-colors"
                  disabled={saveLoading}
                >
                  {saveLoading ? (
                    <span className="flex items-center">
                      <Spinner size="sm" />
                      <span className="ml-2">Saving...</span>
                    </span>
                  ) : (
                    'Save Configuration'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default IntegrationsHub; 