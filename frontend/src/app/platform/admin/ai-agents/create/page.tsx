'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Spinner } from '@/components/ui/Spinner';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface LangChainConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  tools: string[];
  memory: string;
  retrievalMode?: string;
  vectorStore?: string;
  documents?: string[];
}

interface LangFlowConfig {
  flowId?: string;
  nodes: any[];
  edges: any[];
  flowName: string;
  description: string;
  enabledChannels: string[];
}

interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  type: 'langchain' | 'langflow';
  category: string;
  useCase: string;
  config: LangChainConfig | LangFlowConfig;
}

// Create a client component that uses searchParams
function CreateAgentForm() {
  const { state } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const templateId = searchParams.get('templateId');
  const initialAgentType = searchParams.get('type') as 'langchain' | 'langflow' || 'langchain';
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [template, setTemplate] = useState<AgentTemplate | null>(null);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [agentType, setAgentType] = useState<'langchain' | 'langflow'>(initialAgentType);
  
  // LangChain specific state
  const [langChainConfig, setLangChainConfig] = useState<LangChainConfig>({
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000,
    systemPrompt: 'You are a helpful AI assistant for a financial institution. Answer user questions about loans and financial products.',
    tools: [],
    memory: 'conversation',
  });
  
  // LangFlow specific state
  const [langFlowConfig, setLangFlowConfig] = useState<LangFlowConfig>({
    nodes: [],
    edges: [],
    flowName: '',
    description: '',
    enabledChannels: ['chat'],
  });
  
  // Available tools for LangChain
  const availableTools = [
    { id: 'web-search', name: 'Web Search', description: 'Search the web for information' },
    { id: 'calculator', name: 'Calculator', description: 'Perform calculations' },
    { id: 'loan-calculator', name: 'Loan Calculator', description: 'Calculate loan payments, interest, etc.' },
    { id: 'document-retrieval', name: 'Document Retrieval', description: 'Retrieve information from your document store' },
    { id: 'database-query', name: 'Database Query', description: 'Query your database for information' },
    { id: 'crm-integration', name: 'CRM Integration', description: 'Interact with your CRM system' },
  ];
  
  // Available models
  const availableModels = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model for complex tasks' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient for most tasks' },
    { id: 'anthropic-claude-3', name: 'Claude 3 (Anthropic)', description: 'Great for long contexts and reasoning' },
    { id: 'llama-3-70b', name: 'Llama 3 (70B)', description: 'Open source model for general tasks' },
    { id: 'mistral-large', name: 'Mistral Large', description: 'Balanced performance and efficiency' },
  ];
  
  // Memory options
  const memoryOptions = [
    { id: 'conversation', name: 'Conversation Memory', description: 'Remembers the full conversation history' },
    { id: 'buffer', name: 'Buffer Memory', description: 'Remembers only the most recent messages' },
    { id: 'summary', name: 'Summary Memory', description: 'Summarizes past interactions to save context space' },
    { id: 'none', name: 'No Memory', description: 'Agent does not remember past interactions' },
  ];
  
  // Channels for LangFlow
  const channelOptions = [
    { id: 'chat', name: 'Chat Interface', description: 'Web-based chat window' },
    { id: 'api', name: 'API Endpoint', description: 'REST API for programmatic access' },
    { id: 'email', name: 'Email', description: 'Email integration' },
    { id: 'slack', name: 'Slack', description: 'Slack bot integration' },
    { id: 'sms', name: 'SMS', description: 'SMS text messaging' },
  ];
  
  // When document retrieval is selected, show vector store options
  const vectorStoreOptions = [
    { id: 'pinecone', name: 'Pinecone', description: 'Vector database optimized for similarity search' },
    { id: 'chroma', name: 'ChromaDB', description: 'Open-source embedding database' },
    { id: 'qdrant', name: 'Qdrant', description: 'Vector search engine' },
    { id: 'weaviate', name: 'Weaviate', description: 'Vector search engine with GraphQL API' },
  ];
  
  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      if (templateId) {
        fetchTemplate();
      } else {
        setIsLoading(false);
      }
    }
  }, [state.isAuthenticated, state.user, templateId]);
  
  const fetchTemplate = async () => {
    try {
      // This would be replaced with your actual API endpoint
      const response = await fetch(`/api/agent-templates/${templateId}`, {
        headers: {
          Authorization: `Bearer ${state.user?.token}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch template');
      
      const data = await response.json();
      setTemplate(data);
      
      // Populate form with template data
      setName(data.name);
      setDescription(data.description);
      setAgentType(data.type);
      
      if (data.type === 'langchain' && data.config) {
        setLangChainConfig(data.config as LangChainConfig);
      } else if (data.type === 'langflow' && data.config) {
        setLangFlowConfig(data.config as LangFlowConfig);
      }
    } catch (error) {
      console.error('Error fetching template:', error);
      // For demo purposes, set some sample template data
      if (templateId === 't1') {
        // Customer Support Bot template
        setTemplate({
          id: 't1',
          name: 'Customer Support Bot',
          description: 'A template for creating customer support agents with predefined responses',
          type: 'langchain',
          category: 'Support',
          useCase: 'Customer Service',
          config: {
            model: 'gpt-3.5-turbo',
            temperature: 0.3,
            maxTokens: 800,
            systemPrompt: 'You are a helpful customer support agent for a financial institution. Your job is to answer customer questions about loan products, account issues, and general banking questions. Be professional, concise, and helpful.',
            tools: ['document-retrieval'],
            memory: 'conversation',
            retrievalMode: 'semantic',
            vectorStore: 'pinecone',
          } as LangChainConfig
        });
        
        setName('Customer Support Bot');
        setDescription('A template for creating customer support agents with predefined responses');
        setAgentType('langchain');
        setLangChainConfig({
          model: 'gpt-3.5-turbo',
          temperature: 0.3,
          maxTokens: 800,
          systemPrompt: 'You are a helpful customer support agent for a financial institution. Your job is to answer customer questions about loan products, account issues, and general banking questions. Be professional, concise, and helpful.',
          tools: ['document-retrieval'],
          memory: 'conversation',
          retrievalMode: 'semantic',
          vectorStore: 'pinecone',
        });
      } else if (templateId === 't2') {
        // Loan Processing Workflow template
        setTemplate({
          id: 't2',
          name: 'Loan Processing Workflow',
          description: 'Automates the loan processing workflow with document analysis',
          type: 'langflow',
          category: 'Processing',
          useCase: 'Loan Management',
          config: {
            nodes: [], // Would have actual node configurations in real implementation
            edges: [], // Would have actual edge configurations in real implementation
            flowName: 'Loan Processing Workflow',
            description: 'Analyzes loan applications and supporting documents for processing',
            enabledChannels: ['api', 'email'],
          } as LangFlowConfig
        });
        
        setName('Loan Processing Workflow');
        setDescription('Automates the loan processing workflow with document analysis');
        setAgentType('langflow');
        setLangFlowConfig({
          nodes: [],
          edges: [],
          flowName: 'Loan Processing Workflow',
          description: 'Analyzes loan applications and supporting documents for processing',
          enabledChannels: ['api', 'email'],
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Create agent object based on type
      const agentData = {
        name,
        description,
        type: agentType,
        status: 'draft',
        config: agentType === 'langchain' ? langChainConfig : langFlowConfig,
      };
      
      // This would be replaced with your actual API endpoint
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.user?.token}`,
        },
        body: JSON.stringify(agentData),
      });
      
      if (!response.ok) throw new Error('Failed to create agent');
      
      const data = await response.json();
      
      // Navigate back to agents list
      router.push('/platform/admin/ai-agents');
    } catch (error) {
      console.error('Error creating agent:', error);
      alert('Failed to create agent. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleLangChainConfigChange = (field: keyof LangChainConfig, value: any) => {
    setLangChainConfig(prev => ({ ...prev, [field]: value }));
  };
  
  const handleLangFlowConfigChange = (field: keyof LangFlowConfig, value: any) => {
    setLangFlowConfig(prev => ({ ...prev, [field]: value }));
  };
  
  const toggleTool = (toolId: string) => {
    setLangChainConfig(prev => {
      const tools = [...prev.tools];
      if (tools.includes(toolId)) {
        return { ...prev, tools: tools.filter(t => t !== toolId) };
      } else {
        return { ...prev, tools: [...tools, toolId] };
      }
    });
  };
  
  const toggleChannel = (channelId: string) => {
    setLangFlowConfig(prev => {
      const channels = [...prev.enabledChannels];
      if (channels.includes(channelId)) {
        return { ...prev, enabledChannels: channels.filter(c => c !== channelId) };
      } else {
        return { ...prev, enabledChannels: [...channels, channelId] };
      }
    });
  };
  
  const renderLangChainForm = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">LLM Configuration</h3>
        <p className="mt-1 text-sm text-gray-500">Configure the language model for your agent</p>
        
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <select
              id="model"
              name="model"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={langChainConfig.model}
              onChange={(e) => handleLangChainConfigChange('model', e.target.value)}
            >
              {availableModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              {availableModels.find(m => m.id === langChainConfig.model)?.description}
            </p>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="memory" className="block text-sm font-medium text-gray-700">
              Memory Type
            </label>
            <select
              id="memory"
              name="memory"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={langChainConfig.memory}
              onChange={(e) => handleLangChainConfigChange('memory', e.target.value)}
            >
              {memoryOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              {memoryOptions.find(m => m.id === langChainConfig.memory)?.description}
            </p>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
              Temperature ({langChainConfig.temperature})
            </label>
            <input
              type="range"
              id="temperature"
              name="temperature"
              min="0"
              max="1"
              step="0.1"
              className="mt-1 block w-full"
              value={langChainConfig.temperature}
              onChange={(e) => handleLangChainConfigChange('temperature', parseFloat(e.target.value))}
            />
            <p className="mt-1 text-xs text-gray-500">
              Controls creativity: Lower values for more deterministic responses, higher for more creative ones.
            </p>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="maxTokens" className="block text-sm font-medium text-gray-700">
              Max Tokens
            </label>
            <input
              type="number"
              id="maxTokens"
              name="maxTokens"
              min="100"
              max="8000"
              step="100"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={langChainConfig.maxTokens}
              onChange={(e) => handleLangChainConfigChange('maxTokens', parseInt(e.target.value))}
            />
            <p className="mt-1 text-xs text-gray-500">
              Maximum number of tokens to generate in the response.
            </p>
          </div>
          
          <div className="sm:col-span-6">
            <label htmlFor="systemPrompt" className="block text-sm font-medium text-gray-700">
              System Prompt
            </label>
            <textarea
              id="systemPrompt"
              name="systemPrompt"
              rows={5}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={langChainConfig.systemPrompt}
              onChange={(e) => handleLangChainConfigChange('systemPrompt', e.target.value)}
            />
            <p className="mt-1 text-xs text-gray-500">
              Instructions that define how the agent should behave and respond.
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Tools</h3>
        <p className="mt-1 text-sm text-gray-500">Select the tools your agent will have access to</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableTools.map((tool) => (
            <div key={tool.id} className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id={`tool-${tool.id}`}
                  name={`tool-${tool.id}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={langChainConfig.tools.includes(tool.id)}
                  onChange={() => toggleTool(tool.id)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={`tool-${tool.id}`} className="font-medium text-gray-700">
                  {tool.name}
                </label>
                <p className="text-gray-500">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Conditional form sections based on selected tools */}
      {langChainConfig.tools.includes('document-retrieval') && (
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Document Retrieval Configuration</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="retrievalMode" className="block text-sm font-medium text-gray-700">
                Retrieval Mode
              </label>
              <select
                id="retrievalMode"
                name="retrievalMode"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={langChainConfig.retrievalMode || 'semantic'}
                onChange={(e) => handleLangChainConfigChange('retrievalMode', e.target.value)}
              >
                <option value="semantic">Semantic Search</option>
                <option value="keyword">Keyword Search</option>
                <option value="hybrid">Hybrid Search</option>
              </select>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="vectorStore" className="block text-sm font-medium text-gray-700">
                Vector Store
              </label>
              <select
                id="vectorStore"
                name="vectorStore"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={langChainConfig.vectorStore || 'pinecone'}
                onChange={(e) => handleLangChainConfigChange('vectorStore', e.target.value)}
              >
                {vectorStoreOptions.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                {vectorStoreOptions.find(v => v.id === langChainConfig.vectorStore)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  const renderLangFlowForm = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Flow Settings</h3>
        <p className="mt-1 text-sm text-gray-500">Configure your LangFlow workflow</p>
        
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label htmlFor="flowName" className="block text-sm font-medium text-gray-700">
              Flow Name
            </label>
            <input
              type="text"
              id="flowName"
              name="flowName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={langFlowConfig.flowName}
              onChange={(e) => handleLangFlowConfigChange('flowName', e.target.value)}
            />
          </div>
          
          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enabled Channels
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {channelOptions.map((channel) => (
                <div key={channel.id} className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id={`channel-${channel.id}`}
                      name={`channel-${channel.id}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={langFlowConfig.enabledChannels.includes(channel.id)}
                      onChange={() => toggleChannel(channel.id)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor={`channel-${channel.id}`} className="font-medium text-gray-700">
                      {channel.name}
                    </label>
                    <p className="text-gray-500">{channel.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Visual Flow Builder</h3>
        <p className="mt-1 text-sm text-gray-500">Design your workflow visually</p>
        
        <div className="mt-6 border border-gray-300 rounded-lg bg-gray-50 p-6 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No flow defined</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first flow.</p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => router.push('/platform/admin/ai-agents/flow-editor')}
            >
              Open Flow Editor
            </button>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Design your agent's flow in the editor. Save your flow there, then return here to complete agent creation.
          </p>
        </div>
      </div>
    </div>
  );
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Create New AI Agent</h1>
        </div>
      </div>
      
      <div className="mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Agent Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div className="col-span-6">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <p className="mt-2 text-sm text-gray-500">Brief description of the agent's purpose and capabilities.</p>
                    </div>
                    
                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium text-gray-700">Agent Type</label>
                      <div className="mt-2 space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                        <div className="flex items-center">
                          <input
                            id="langchain"
                            name="agent-type"
                            type="radio"
                            checked={agentType === 'langchain'}
                            onChange={() => setAgentType('langchain')}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label htmlFor="langchain" className="ml-3 block text-sm font-medium text-gray-700">
                            LangChain
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="langflow"
                            name="agent-type"
                            type="radio"
                            checked={agentType === 'langflow'}
                            onChange={() => setAgentType('langflow')}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label htmlFor="langflow" className="ml-3 block text-sm font-medium text-gray-700">
                            LangFlow
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Type-specific form */}
                <div className="pt-8">
                  {agentType === 'langchain' ? renderLangChainForm() : renderLangFlowForm()}
                </div>
              </div>
            </div>
            
            {/* Form actions */}
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <Link
                href="/platform/admin/ai-agents"
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSaving ? (
                  <>
                    <Spinner size="sm" />
                    <span className="ml-2">Saving...</span>
                  </>
                ) : (
                  'Create Agent'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
const CreateAgentPage: React.FC = () => {
  return (
    <AdminLayout>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      }>
        <CreateAgentForm />
      </Suspense>
    </AdminLayout>
  );
};

export default CreateAgentPage; 