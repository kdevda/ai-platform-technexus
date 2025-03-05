'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Spinner } from '@/components/ui/Spinner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
}

interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  type: 'langchain' | 'langflow';
  category: string;
  useCase: string;
  thumbnail: string;
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
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">AI Agents</h1>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {showTemplates ? 'View Agents' : 'Browse Templates'}
            </button>
            
            <div className="relative inline-block text-left">
              <button
                onClick={() => setCreatingAgent(!creatingAgent)}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
              >
                Create Agent
              </button>
              
              {creatingAgent && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button
                      onClick={() => handleCreateCustomAgent('langchain')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                    >
                      Create LangChain Agent
                    </button>
                    <button
                      onClick={() => handleCreateCustomAgent('langflow')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                    >
                      Create LangFlow Agent
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Page body (conditionally show agents list or templates) */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : showTemplates ? (
          // Templates view
          <div>
            {/* Rest of the template view code */}
          </div>
        ) : (
          // Agents list
          <div>
            {/* Rest of the agents list code */}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AIAgentsPage; 