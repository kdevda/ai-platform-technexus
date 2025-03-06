"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';

interface Integration {
  _id: string;
  name: string;
  provider: string;
  type: string;
  apiKey?: string;
  isActive: boolean;
}

interface FlowBuilderProps {
  agentId?: string;
}

export const FlowBuilder: React.FC<FlowBuilderProps> = ({ agentId }) => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [flowName, setFlowName] = useState('');
  const [flowDescription, setFlowDescription] = useState('');
  const router = useRouter();
  const { state: authState } = useAuth();

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      setLoading(true);
      
      if (!authState.user?.token) {
        console.error('User not authenticated');
        return;
      }
      
      console.log('Fetching integrations with auth token...');
      const response = await axios.get('/api/mongo/integrations', {
        headers: {
          Authorization: `Bearer ${authState.user.token}`
        }
      });
      
      console.log('API Response for integrations:', response.data);
      
      if (response.data.success) {
        const allIntegrations = response.data.data || [];
        
        console.log('All integrations found:', allIntegrations);
        console.log('Integration types:', allIntegrations.map((i: any) => `${i.name} - type: ${i.type}, active: ${i.isActive}`));
        
        // Show what we're filtering for
        console.log('Filtering for integrations with type=llm and isActive=true');
        
        // Add fallback: if no integrations have type field correctly set but we have integrations, assume they're LLM
        let llmIntegrations = allIntegrations.filter(
          (integration: Integration) => integration.type === 'llm' && integration.isActive
        );
        
        // If no integrations match our criteria but we have integrations with API keys, use those
        if (llmIntegrations.length === 0 && allIntegrations.length > 0) {
          console.log('No integrations explicitly marked as LLM found. Looking for any active integrations with API keys');
          llmIntegrations = allIntegrations.filter(
            (integration: Integration) => integration.isActive && integration.apiKey
          );
          
          if (llmIntegrations.length > 0) {
            console.log('Found active integrations with API keys:', llmIntegrations);
          }
        }
        
        console.log('Filtered LLM integrations:', llmIntegrations);
        console.log('Active integrations count:', llmIntegrations.length);
        
        // Use any integrations we found
        setIntegrations(llmIntegrations);
        
        // If we found integrations but none match our criteria, show a more specific error
        if (allIntegrations.length > 0 && llmIntegrations.length === 0) {
          console.log('Found integrations but none are active LLM types or have API keys');
        }
      } else {
        console.log('API request successful but returned no data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching integrations:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleIntegrationChange = (value: string) => {
    setSelectedIntegration(value);
  };

  const handleCreateFlow = async () => {
    if (!flowName || !selectedIntegration) {
      alert('Please provide a name and select an integration');
      return;
    }

    try {
      setLoading(true);
      
      const response = await axios.post('/api/agents/flows', {
        name: flowName,
        description: flowDescription,
        integrationId: selectedIntegration,
        version: '1.0.0',
        nodes: [],
        edges: [],
        agentId: agentId || null,
      }, {
        headers: {
          Authorization: `Bearer ${authState.user?.token}`
        }
      });

      if (response.data.success) {
        alert('Flow created successfully!');
        // Reset form or redirect
        setFlowName('');
        setFlowDescription('');
        setSelectedIntegration('');
      }
    } catch (error) {
      console.error('Error creating flow:', error);
      alert('Failed to create flow');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Agent Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="flowName">Flow Name</Label>
              <Input
                id="flowName"
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
                placeholder="My AI Agent Flow"
              />
            </div>

            <div>
              <Label htmlFor="flowDescription">Description</Label>
              <Input
                id="flowDescription"
                value={flowDescription}
                onChange={(e) => setFlowDescription(e.target.value)}
                placeholder="Describe what this flow does"
              />
            </div>

            <div>
              <Label>LLM Integration</Label>
              {loading ? (
                <div className="animate-pulse h-10 bg-gray-200 rounded"></div>
              ) : integrations.length === 0 ? (
                <div className="space-y-2">
                  <div className="text-sm text-red-500">
                    No active LLM integrations found.
                  </div>
                  <div className="text-sm">
                    You need an active LLM integration (like OpenAI, Anthropic, etc.) to create a flow.
                  </div>
                  <Link 
                    href="/platform/admin/integrations-hub" 
                    className="inline-block text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    → Go to Integrations Hub to create one
                  </Link>
                </div>
              ) : (
                <Select
                  onValueChange={handleIntegrationChange}
                  defaultValue={selectedIntegration}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an LLM provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {integrations.map((integration) => (
                      <SelectItem key={integration._id} value={integration._id}>
                        {integration.name} ({integration.provider})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <Button
              onClick={handleCreateFlow}
              disabled={loading || integrations.length === 0 || !flowName || !selectedIntegration}
            >
              Create Flow
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 