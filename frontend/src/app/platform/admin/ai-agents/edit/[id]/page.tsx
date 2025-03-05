'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Spinner } from '@/components/ui/Spinner';
import { Agent, LangChainConfig, LangFlowConfig } from '@/types/agents';
import { fetchAgents, updateAgent } from '@/utils/langchain/agent-service';

const EditAgentPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { state } = useAuth();
  const agentId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [agentName, setAgentName] = useState('');
  const [agentDescription, setAgentDescription] = useState('');
  const [langChainConfig, setLangChainConfig] = useState<LangChainConfig>({
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    systemPrompt: '',
    tools: [],
    memory: 'conversation',
  });
  const [langFlowConfig, setLangFlowConfig] = useState<LangFlowConfig>({
    flowName: '',
    description: '',
    nodes: [],
    edges: [],
    enabledChannels: [],
  });

  // Available models, tools, memory types, and channels
  const availableModels = [
    { id: 'gpt-4', name: 'GPT-4' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
    { id: 'claude-3-opus', name: 'Claude 3 Opus' },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet' },
    { id: 'llama-3-70b', name: 'Llama 3 (70B)' },
  ];
  
  const availableTools = [
    { id: 'web-search', name: 'Web Search', description: 'Search the web for information' },
    { id: 'document-retrieval', name: 'Document Retrieval', description: 'Retrieve information from documents' },
    { id: 'code-interpreter', name: 'Code Interpreter', description: 'Execute code and return results' },
    { id: 'calculator', name: 'Calculator', description: 'Perform numerical calculations' },
    { id: 'database-query', name: 'Database Query', description: 'Query databases and return results' },
  ];
  
  const memoryTypes = [
    { id: 'conversation', name: 'Conversation' },
    { id: 'buffer', name: 'Buffer' },
    { id: 'summary', name: 'Summary' },
    { id: 'none', name: 'None' },
  ];
  
  const availableChannels = [
    { id: 'web', name: 'Web Interface' },
    { id: 'api', name: 'API' },
    { id: 'slack', name: 'Slack' },
    { id: 'teams', name: 'Microsoft Teams' },
    { id: 'sms', name: 'SMS' },
  ];

  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      loadAgentData();
    }
  }, [state.isAuthenticated, state.user, agentId]);

  const loadAgentData = async () => {
    setIsLoading(true);
    try {
      // Fetch agent details
      const agents = await fetchAgents(state.user?.token as string);
      const agentData = agents.find(a => a.id === agentId);
      
      if (!agentData) {
        router.push('/platform/admin/ai-agents');
        return;
      }
      
      setAgent(agentData);
      setAgentName(agentData.name);
      setAgentDescription(agentData.description);
      
      // Set up configuration based on agent type
      if (agentData.type === 'langchain' && agentData.config) {
        const config = agentData.config as LangChainConfig;
        setLangChainConfig({
          model: config.model || 'gpt-4',
          temperature: config.temperature || 0.7,
          maxTokens: config.maxTokens || 2000,
          systemPrompt: config.systemPrompt || '',
          tools: config.tools || [],
          memory: config.memory || 'conversation',
          retrievalMode: config.retrievalMode,
          vectorStore: config.vectorStore,
          documents: config.documents,
        });
      } else if (agentData.type === 'langflow' && agentData.config) {
        const config = agentData.config as LangFlowConfig;
        setLangFlowConfig({
          flowName: config.flowName || '',
          description: config.description || '',
          nodes: config.nodes || [],
          edges: config.edges || [],
          enabledChannels: config.enabledChannels || [],
          flowId: config.flowId,
          apiAccess: config.apiAccess,
        });
      }
    } catch (error) {
      console.error('Error loading agent data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agent) return;
    
    setIsSaving(true);
    
    try {
      const updatedAgentData: Partial<Agent> = {
        name: agentName,
        description: agentDescription,
        config: agent.type === 'langchain' ? langChainConfig : langFlowConfig,
      };
      
      await updateAgent(agentId, updatedAgentData, state.user?.token as string);
      router.push(`/platform/admin/ai-agents/${agentId}`);
    } catch (error) {
      console.error('Error updating agent:', error);
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
      const tools = prev.tools || [];
      if (tools.includes(toolId)) {
        return { ...prev, tools: tools.filter(id => id !== toolId) };
      } else {
        return { ...prev, tools: [...tools, toolId] };
      }
    });
  };

  const toggleChannel = (channelId: string) => {
    setLangFlowConfig(prev => {
      const channels = prev.enabledChannels || [];
      if (channels.includes(channelId)) {
        return { ...prev, enabledChannels: channels.filter(id => id !== channelId) };
      } else {
        return { ...prev, enabledChannels: [...channels, channelId] };
      }
    });
  };

  const renderLangChainForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Model
          </label>
          <select
            value={langChainConfig.model}
            onChange={(e) => handleLangChainConfigChange('model', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {availableModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Memory Type
          </label>
          <select
            value={langChainConfig.memory}
            onChange={(e) => handleLangChainConfigChange('memory', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {memoryTypes.map((memory) => (
              <option key={memory.id} value={memory.id}>
                {memory.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperature
          </label>
          <input
            type="number"
            min="0"
            max="2"
            step="0.1"
            value={langChainConfig.temperature}
            onChange={(e) => handleLangChainConfigChange('temperature', parseFloat(e.target.value))}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Controls randomness: Lower values are more deterministic, higher values more creative.
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Tokens
          </label>
          <input
            type="number"
            min="100"
            max="16000"
            step="100"
            value={langChainConfig.maxTokens}
            onChange={(e) => handleLangChainConfigChange('maxTokens', parseInt(e.target.value))}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Maximum number of tokens to generate in the completion.
          </p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          System Prompt
        </label>
        <textarea
          value={langChainConfig.systemPrompt}
          onChange={(e) => handleLangChainConfigChange('systemPrompt', e.target.value)}
          rows={6}
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Instructions for the AI agent..."
        ></textarea>
        <p className="mt-1 text-sm text-gray-500">
          Instructions that define the agent's personality, capabilities, and limitations.
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tools
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableTools.map((tool) => (
            <div key={tool.id} className="flex items-start space-x-3">
              <input
                type="checkbox"
                id={`tool-${tool.id}`}
                checked={langChainConfig.tools?.includes(tool.id) || false}
                onChange={() => toggleTool(tool.id)}
                className="h-5 w-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`tool-${tool.id}`} className="text-sm">
                <div className="font-medium text-gray-700">{tool.name}</div>
                <div className="text-gray-500">{tool.description}</div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLangFlowForm = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Flow Name
        </label>
        <input
          type="text"
          value={langFlowConfig.flowName}
          onChange={(e) => handleLangFlowConfigChange('flowName', e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Name for your flow..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={langFlowConfig.description}
          onChange={(e) => handleLangFlowConfigChange('description', e.target.value)}
          rows={3}
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Description of your flow..."
        ></textarea>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enabled Channels
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {availableChannels.map((channel) => (
            <div key={channel.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={`channel-${channel.id}`}
                checked={langFlowConfig.enabledChannels?.includes(channel.id) || false}
                onChange={() => toggleChannel(channel.id)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`channel-${channel.id}`} className="text-sm font-medium text-gray-700">
                {channel.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-4 border-t text-center">
        <Link 
          href={`/platform/admin/ai-agents/flow-editor?agentId=${agentId}`}
          className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
        >
          Edit Flow Structure
        </Link>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[500px]">
          <Spinner size="lg" />
        </div>
      </AdminLayout>
    );
  }

  if (!agent) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <h1 className="text-2xl font-semibold mb-4">Agent not found</h1>
          <p className="text-gray-600 mb-6">The agent you are looking for does not exist or has been deleted.</p>
          <Link 
            href="/platform/admin/ai-agents" 
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            Back to Agents
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="border-b pb-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Link href={`/platform/admin/ai-agents/${agentId}`} className="text-gray-500 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-2xl font-semibold">Edit Agent</h1>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="agentName" className="block text-sm font-medium text-gray-700 mb-1">
                Agent Name
              </label>
              <input
                type="text"
                id="agentName"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter a name for your agent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="agentDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="agentDescription"
                value={agentDescription}
                onChange={(e) => setAgentDescription(e.target.value)}
                rows={3}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Describe what your agent does"
                required
              ></textarea>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Agent Configuration</h2>
            
            {agent.type === 'langchain' && renderLangChainForm()}
            {agent.type === 'langflow' && renderLangFlowForm()}
          </div>
          
          <div className="flex justify-end space-x-4">
            <Link
              href={`/platform/admin/ai-agents/${agentId}`}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSaving ? <Spinner size="sm" /> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditAgentPage; 