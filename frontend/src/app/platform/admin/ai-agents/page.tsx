'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Spinner } from '@/components/ui/Spinner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FlowBuilder } from './flow-builder';

interface Agent {
  id: string;
  name: string;
  description: string;
  type: 'langchain' | 'langflow' | 'custom';
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
  config: any;
  lastRun?: string;
  createdBy: string;
  integrationId?: string;
}

interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  type: 'langchain' | 'langflow';
  category: string;
  useCase: string;
  thumbnail: string;
  integrationId?: string;
}

const AIAgentsPage: React.FC = () => {
  const router = useRouter();
  const { state } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [templates, setTemplates] = useState<AgentTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingAgent, setCreatingAgent] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFlowBuilder, setShowFlowBuilder] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | undefined>(undefined);

  // Fetch agents and templates
  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      fetchAgents();
      fetchTemplates();
    }
  }, [state.isAuthenticated, state.user]);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/agents', {
        headers: {
          Authorization: `Bearer ${state.user?.token}`
        }
      });
      
      // Use mock data for demonstration
      setAgents([
        {
          id: '1',
          name: 'Loan Approval Agent',
          description: 'Automates the loan approval process using credit scoring models and business rules',
          type: 'langchain',
          status: 'active',
          createdAt: '2023-09-15T10:30:00Z',
          updatedAt: '2023-10-20T14:45:00Z',
          config: { 
            model: 'gpt-4',
            temperature: 0.7,
            maxTokens: 1000
          },
          lastRun: '2023-11-01T09:15:00Z',
          createdBy: 'Admin User'
        },
        {
          id: '2',
          name: 'Customer Support Assistant',
          description: 'Provides automated responses to common customer inquiries about loan products',
          type: 'langflow',
          status: 'active',
          createdAt: '2023-08-22T11:20:00Z',
          updatedAt: '2023-10-18T16:30:00Z',
          config: {
            flowId: 'support-flow-123',
            enabledChannels: ['chat', 'email']
          },
          lastRun: '2023-11-02T13:45:00Z',
          createdBy: 'Admin User'
        },
        {
          id: '3',
          name: 'Risk Assessment Agent',
          description: 'Evaluates loan applications for potential risk factors',
          type: 'langchain',
          status: 'draft',
          createdAt: '2023-10-05T09:00:00Z',
          updatedAt: '2023-10-05T09:00:00Z',
          config: {
            model: 'gpt-4',
            temperature: 0.2,
            maxTokens: 1500
          },
          createdBy: 'Admin User'
        },
      ]);
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/agent-templates', {
        headers: {
          Authorization: `Bearer ${state.user?.token}`
        }
      });
      
      // if (!response.ok) throw new Error('Failed to fetch templates');
      
      // const data = await response.json();
      // setTemplates(data);

      // For demo purposes, set some sample data
      setTemplates([
        {
          id: 't1',
          name: 'Customer Service Agent',
          description: 'Pre-configured agent for handling customer inquiries',
          type: 'langchain',
          category: 'customer-service',
          useCase: 'Support',
          thumbnail: '/images/templates/customer-service.png'
        },
        {
          id: 't2',
          name: 'Loan Application Assistant',
          description: 'Helps users complete loan applications with step-by-step guidance',
          type: 'langflow',
          category: 'loan-processing',
          useCase: 'Application',
          thumbnail: '/images/templates/loan-application.png'
        },
        {
          id: 't3',
          name: 'Document Analyzer',
          description: 'Analyzes and extracts information from loan documents',
          type: 'langchain',
          category: 'document-processing',
          useCase: 'Analysis',
          thumbnail: '/images/templates/document-analyzer.png'
        },
      ]);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const toggleAgentStatus = async (agentId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      
      await fetch(`/api/agents/${agentId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.user?.token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      setAgents(agents.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: newStatus as 'active' | 'inactive' | 'draft' } 
          : agent
      ));
    } catch (error) {
      console.error('Error toggling agent status:', error);
    }
  };

  const deleteAgent = async (agentId: string) => {
    if (confirm('Are you sure you want to delete this agent? This action cannot be undone.')) {
      try {
        await fetch(`/api/agents/${agentId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${state.user?.token}`
          }
        });
        
        setAgents(agents.filter(agent => agent.id !== agentId));
      } catch (error) {
        console.error('Error deleting agent:', error);
      }
    }
  };

  const handleCreateFromTemplate = async (templateId: string) => {
    try {
      await fetch('/api/agents/from-template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.user?.token}`
        },
        body: JSON.stringify({ templateId })
      });
      
      setShowTemplates(false);
      fetchAgents();
    } catch (error) {
      console.error('Error creating agent from template:', error);
    }
  };

  const handleCreateCustomAgent = (type: 'langchain' | 'langflow') => {
    router.push(`/platform/admin/ai-agents/create?type=${type}`);
  };

  const handleCreateFlow = (agentId?: string) => {
    setSelectedAgentId(agentId);
    setShowFlowBuilder(true);
    setShowTemplates(false);
    setCreatingAgent(false);
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(templates.map(t => t.category))];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'langchain':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            LangChain
          </span>
        );
      case 'langflow':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            LangFlow
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Custom
          </span>
        );
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">AI Agents</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setShowTemplates(true);
                setCreatingAgent(false);
                setShowFlowBuilder(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Agent
            </button>
            <button
              onClick={() => handleCreateFlow()}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Create Flow
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        )}

        {/* Show flow builder */}
        {!loading && showFlowBuilder && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create Agent Flow</h2>
              <button
                onClick={() => setShowFlowBuilder(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times; Close
              </button>
            </div>
            <FlowBuilder agentId={selectedAgentId} />
          </div>
        )}

        {/* Show templates */}
        {!loading && showTemplates && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Agent Templates</h2>
              <p className="text-gray-600">
                Choose a template to quickly create a pre-configured agent
              </p>
            </div>

            {/* Template filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === 'all'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                All
              </button>
              {/* Add category filter buttons here */}
            </div>

            {/* Templates grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="h-40 bg-gray-200 relative">
                    {/* Template thumbnail */}
                    <img
                      src={template.thumbnail || '/placeholder.png'}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      {getTypeBadge(template.type)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {template.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {template.category}
                      </span>
                      <button
                        onClick={() => handleCreateFromTemplate(template.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Use Template
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show agents */}
        {!loading && !showTemplates && !showFlowBuilder && (
          <div>
            {agents.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No agents created yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Get started by creating your first AI agent
                </p>
                <button
                  onClick={() => setShowTemplates(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Browse Templates
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last Run
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {agents.map((agent) => (
                      <tr key={agent.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {agent.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {agent.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getTypeBadge(agent.type)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                              agent.status
                            )}`}
                          >
                            {agent.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {agent.lastRun
                            ? new Date(agent.lastRun).toLocaleString()
                            : 'Never'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(agent.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              href={`/platform/admin/ai-agents/${agent.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleCreateFlow(agent.id)}
                              className="text-purple-600 hover:text-purple-900"
                            >
                              Flow
                            </button>
                            <button
                              onClick={() =>
                                toggleAgentStatus(agent.id, agent.status)
                              }
                              className="text-green-600 hover:text-green-900"
                            >
                              {agent.status === 'active'
                                ? 'Deactivate'
                                : 'Activate'}
                            </button>
                            <button
                              onClick={() => deleteAgent(agent.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AIAgentsPage; 