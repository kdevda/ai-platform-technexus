/**
 * Agent Service
 * 
 * This utility provides functions for interacting with LangChain-based AI agents.
 * It handles agent creation, management, and execution of agent tasks.
 */

import { Agent } from '@/types/agents';

interface AgentExecutionOptions {
  input: string;
  sessionId?: string;
  retrieval?: boolean;
  tools?: string[];
  documents?: string[];
}

interface AgentToolConfig {
  name: string;
  enabled: boolean;
  parameters?: Record<string, any>;
}

interface AgentExecutionResult {
  output: string;
  sessionId: string;
  executionId: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    cost: number;
  };
  steps: {
    type: string;
    content: string;
    timestamp: string;
  }[];
  metadata: Record<string, any>;
}

/**
 * Executes an agent with the given input and options
 */
export async function executeAgent(
  agentId: string, 
  options: AgentExecutionOptions,
  token: string
): Promise<AgentExecutionResult> {
  try {
    const response = await fetch(`/api/agents/${agentId}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to execute agent');
    }

    return await response.json();
  } catch (error) {
    console.error('Error executing agent:', error);
    throw error;
  }
}

/**
 * Fetches all agents for the current user
 */
export async function fetchAgents(token: string): Promise<Agent[]> {
  try {
    const response = await fetch('/api/agents', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch agents');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw error;
  }
}

/**
 * Creates a new agent with the given configuration
 */
export async function createAgent(agentData: Partial<Agent>, token: string): Promise<Agent> {
  try {
    const response = await fetch('/api/agents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(agentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create agent');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating agent:', error);
    throw error;
  }
}

/**
 * Updates an existing agent with new configuration
 */
export async function updateAgent(agentId: string, agentData: Partial<Agent>, token: string): Promise<Agent> {
  try {
    const response = await fetch(`/api/agents/${agentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(agentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update agent');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating agent:', error);
    throw error;
  }
}

/**
 * Deletes an agent
 */
export async function deleteAgent(agentId: string, token: string): Promise<void> {
  try {
    const response = await fetch(`/api/agents/${agentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete agent');
    }
  } catch (error) {
    console.error('Error deleting agent:', error);
    throw error;
  }
}

/**
 * Fetches agent templates
 */
export async function fetchAgentTemplates(token: string): Promise<any[]> {
  try {
    const response = await fetch('/api/agent-templates', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch agent templates');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching agent templates:', error);
    throw error;
  }
}

/**
 * Creates a new agent from a template
 */
export async function createAgentFromTemplate(
  templateId: string, 
  customizations: Partial<Agent>, 
  token: string
): Promise<Agent> {
  try {
    const response = await fetch(`/api/agent-templates/${templateId}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(customizations),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create agent from template');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating agent from template:', error);
    throw error;
  }
}

/**
 * Fetches agent execution history
 */
export async function fetchAgentExecutionHistory(
  agentId: string, 
  token: string, 
  limit = 10, 
  offset = 0
): Promise<any[]> {
  try {
    const response = await fetch(`/api/agents/${agentId}/executions?limit=${limit}&offset=${offset}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch agent execution history');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching agent execution history:', error);
    throw error;
  }
}

/**
 * Fetches detailed information about a specific agent execution
 */
export async function fetchAgentExecution(
  agentId: string, 
  executionId: string, 
  token: string
): Promise<AgentExecutionResult> {
  try {
    const response = await fetch(`/api/agents/${agentId}/executions/${executionId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch agent execution');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching agent execution:', error);
    throw error;
  }
}

/**
 * Toggles an agent's status (active/inactive)
 */
export async function toggleAgentStatus(
  agentId: string, 
  status: 'active' | 'inactive' | 'draft', 
  token: string
): Promise<Agent> {
  try {
    const response = await fetch(`/api/agents/${agentId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update agent status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error toggling agent status:', error);
    throw error;
  }
}

/**
 * Trains or fine-tunes an agent
 */
export async function trainAgent(
  agentId: string, 
  trainingData: any, 
  token: string
): Promise<any> {
  try {
    const response = await fetch(`/api/agents/${agentId}/train`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(trainingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to train agent');
    }

    return await response.json();
  } catch (error) {
    console.error('Error training agent:', error);
    throw error;
  }
}

/**
 * Uploads documents for the agent's knowledge base
 */
export async function uploadAgentDocuments(
  agentId: string, 
  files: File[], 
  token: string
): Promise<any> {
  try {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch(`/api/agents/${agentId}/documents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload documents');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading agent documents:', error);
    throw error;
  }
}

/**
 * Gets agent usage statistics
 */
export async function getAgentUsageStats(
  agentId: string, 
  token: string, 
  startDate?: string, 
  endDate?: string
): Promise<any> {
  try {
    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);

    const response = await fetch(`/api/agents/${agentId}/stats?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch agent usage stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching agent usage stats:', error);
    throw error;
  }
} 