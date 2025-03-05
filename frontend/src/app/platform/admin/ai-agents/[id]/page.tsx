'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Spinner } from '@/components/ui/Spinner';
import { Agent, AgentExecutionResult } from '@/types/agents';
import { 
  fetchAgents, 
  getAgentUsageStats, 
  toggleAgentStatus, 
  fetchAgentExecutionHistory, 
  executeAgent, 
  deleteAgent 
} from '@/utils/langchain/agent-service';

const AgentDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { state } = useAuth();
  const agentId = params.id as string;
  
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usageStats, setUsageStats] = useState<any>(null);
  const [executionHistory, setExecutionHistory] = useState<any[]>([]);
  const [testPrompt, setTestPrompt] = useState('');
  const [testResult, setTestResult] = useState<AgentExecutionResult | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [statusToggling, setStatusToggling] = useState(false);

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
      
      // Fetch usage statistics
      const stats = await getAgentUsageStats(agentId, state.user?.token as string);
      setUsageStats(stats);
      
      // Fetch execution history
      const history = await fetchAgentExecutionHistory(agentId, state.user?.token as string);
      setExecutionHistory(history);
    } catch (error) {
      console.error('Error loading agent data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusToggle = async () => {
    if (!agent) return;
    
    setStatusToggling(true);
    try {
      const newStatus = agent.status === 'active' ? 'inactive' : 'active';
      const updatedAgent = await toggleAgentStatus(agentId, newStatus as any, state.user?.token as string);
      setAgent(updatedAgent);
    } catch (error) {
      console.error('Error toggling agent status:', error);
    } finally {
      setStatusToggling(false);
    }
  };

  const handleDeleteAgent = async () => {
    if (deleteConfirmation !== agent?.name) return;
    
    setIsDeleting(true);
    try {
      await deleteAgent(agentId, state.user?.token as string);
      router.push('/platform/admin/ai-agents');
    } catch (error) {
      console.error('Error deleting agent:', error);
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleTestAgent = async () => {
    if (!testPrompt.trim()) return;
    
    setIsTesting(true);
    setTestResult(null);
    try {
      const result = await executeAgent(
        agentId, 
        { input: testPrompt }, 
        state.user?.token as string
      );
      
      // Convert the result to match the expected AgentExecutionResult type
      const typedResult: AgentExecutionResult = {
        ...result,
        steps: result.steps.map(step => ({
          type: step.type as "input" | "thought" | "action" | "observation" | "output",
          content: step.content,
          timestamp: step.timestamp,
          metadata: {}
        }))
      };
      
      setTestResult(typedResult);
    } catch (error) {
      console.error('Error testing agent:', error);
    } finally {
      setIsTesting(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'langchain':
        return { label: 'LangChain', class: 'bg-blue-100 text-blue-800' };
      case 'langflow':
        return { label: 'LangFlow', class: 'bg-purple-100 text-purple-800' };
      case 'custom':
        return { label: 'Custom', class: 'bg-indigo-100 text-indigo-800' };
      default:
        return { label: type, class: 'bg-gray-100 text-gray-800' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  const typeBadge = getTypeBadge(agent.type);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="border-b pb-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Link href="/platform/admin/ai-agents" className="text-gray-500 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-2xl font-semibold">Agent Details</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => router.push(`/platform/admin/ai-agents/flow-editor?agentId=${agent.id}`)}
              className={`px-4 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors ${agent.type !== 'langflow' ? 'hidden' : ''}`}
            >
              Edit Flow
            </button>
            <button
              onClick={() => router.push(`/platform/admin/ai-agents/edit/${agent.id}`)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleStatusToggle}
              disabled={statusToggling}
              className={`px-4 py-2 rounded-md transition-colors ${
                agent.status === 'active'
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {statusToggling ? (
                <Spinner size="sm" />
              ) : agent.status === 'active' ? (
                'Deactivate'
              ) : (
                'Activate'
              )}
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center mb-4">
          <span className={`px-2 py-1 rounded text-xs font-medium ${typeBadge.class}`}>
            {typeBadge.label}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeClass(agent.status)}`}>
            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
          </span>
          <span className="text-gray-500 text-sm">
            Created: {formatDate(agent.createdAt)}
          </span>
          {agent.lastRun && (
            <span className="text-gray-500 text-sm">
              Last run: {formatDate(agent.lastRun)}
            </span>
          )}
        </div>
        
        <h2 className="text-3xl font-bold mb-2">{agent.name}</h2>
        <p className="text-gray-600">{agent.description}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Test Agent Section */}
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Test Agent</h2>
            <div className="mb-4">
              <textarea
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                placeholder="Enter a prompt to test this agent..."
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                disabled={isTesting || agent.status !== 'active'}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleTestAgent}
                disabled={isTesting || !testPrompt.trim() || agent.status !== 'active'}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isTesting ? <Spinner size="sm" /> : 'Run Test'}
              </button>
            </div>
            
            {testResult && (
              <div className="mt-6 p-4 border rounded-md bg-gray-50">
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-500">Response:</span>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap">{testResult.output}</p>
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-xs font-medium text-gray-500 block">Prompt Tokens</span>
                      <span className="text-sm">{testResult.usage.promptTokens}</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 block">Completion Tokens</span>
                      <span className="text-sm">{testResult.usage.completionTokens}</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 block">Total Tokens</span>
                      <span className="text-sm">{testResult.usage.totalTokens}</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 block">Cost</span>
                      <span className="text-sm">${testResult.usage.cost.toFixed(6)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Agent Configuration */}
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Configuration</h2>
            
            {agent.type === 'langchain' && agent.config && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500 block mb-1">Model</span>
                    <span className="text-sm">{(agent.config as any).model}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 block mb-1">Temperature</span>
                    <span className="text-sm">{(agent.config as any).temperature}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 block mb-1">Max Tokens</span>
                    <span className="text-sm">{(agent.config as any).maxTokens}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 block mb-1">Memory Type</span>
                    <span className="text-sm">{(agent.config as any).memory}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <span className="text-sm font-medium text-gray-500 block mb-2">System Prompt</span>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm whitespace-pre-wrap">{(agent.config as any).systemPrompt}</p>
                  </div>
                </div>
                
                {(agent.config as any).tools && (agent.config as any).tools.length > 0 && (
                  <div className="pt-4 border-t">
                    <span className="text-sm font-medium text-gray-500 block mb-2">Tools</span>
                    <div className="flex flex-wrap gap-2">
                      {(agent.config as any).tools.map((tool: string) => (
                        <span key={tool} className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {agent.type === 'langflow' && agent.config && (
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500 block mb-1">Flow Name</span>
                  <span className="text-sm">{(agent.config as any).flowName}</span>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500 block mb-1">Description</span>
                  <span className="text-sm">{(agent.config as any).description}</span>
                </div>
                
                {(agent.config as any).enabledChannels && (agent.config as any).enabledChannels.length > 0 && (
                  <div className="pt-4 border-t">
                    <span className="text-sm font-medium text-gray-500 block mb-2">Enabled Channels</span>
                    <div className="flex flex-wrap gap-2">
                      {(agent.config as any).enabledChannels.map((channel: string) => (
                        <span key={channel} className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="pt-4 border-t">
                  <span className="text-sm font-medium text-gray-500 block mb-2">Flow Structure</span>
                  <div className="flex gap-4">
                    <div>
                      <span className="text-xs font-medium text-gray-500 block">Nodes</span>
                      <span className="text-sm">{(agent.config as any).nodes?.length || 0}</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 block">Edges</span>
                      <span className="text-sm">{(agent.config as any).edges?.length || 0}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t text-center">
                  <Link 
                    href={`/platform/admin/ai-agents/flow-editor?agentId=${agent.id}`}
                    className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
                  >
                    View/Edit Flow
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Stats & History Column */}
        <div className="space-y-6">
          {/* Usage Stats */}
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Usage Statistics</h2>
            
            {usageStats ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <span className="text-xs font-medium text-gray-500 block">Total Executions</span>
                    <span className="text-2xl font-semibold">{usageStats.totalExecutions}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <span className="text-xs font-medium text-gray-500 block">Tokens Used</span>
                    <span className="text-2xl font-semibold">{usageStats.totalTokensUsed}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <span className="text-xs font-medium text-gray-500 block">Avg Response Time</span>
                    <span className="text-xl font-semibold">{usageStats.averageResponseTime}s</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <span className="text-xs font-medium text-gray-500 block">Unique Users</span>
                    <span className="text-xl font-semibold">{usageStats.uniqueUsers}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <span className="text-xs font-medium text-gray-500 block">Success Rate</span>
                    <span className="text-xl font-semibold">{usageStats.successRate}%</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <span className="text-xs font-medium text-gray-500 block">Est. Cost</span>
                    <span className="text-xl font-semibold">${usageStats.estimatedCost.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>No usage data available</p>
              </div>
            )}
          </div>
          
          {/* Execution History */}
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Execution History</h2>
            
            {executionHistory && executionHistory.length > 0 ? (
              <div className="space-y-3">
                {executionHistory.map((execution) => (
                  <div key={execution.executionId} className="border rounded-md p-3 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-medium truncate max-w-[70%]">
                        {execution.input}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(execution.timestamp)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        execution.success 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {execution.success ? 'Success' : 'Failed'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {execution.tokens} tokens | ${execution.cost.toFixed(6)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>No execution history available</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Delete Agent</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this agent? This action cannot be undone.
              Type <span className="font-semibold">{agent.name}</span> to confirm.
            </p>
            <div className="mb-4">
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder={`Type "${agent.name}" to confirm`}
                className="w-full px-4 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAgent}
                disabled={deleteConfirmation !== agent.name || isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed"
              >
                {isDeleting ? <Spinner size="sm" /> : 'Delete Agent'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AgentDetailPage; 