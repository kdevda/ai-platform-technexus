/**
 * AI Agent Types
 * 
 * Type definitions for AI agents in the platform
 */

/**
 * Represents an AI agent in the system
 */
export interface Agent {
  id: string;
  name: string;
  description: string;
  type: 'langchain' | 'langflow' | 'custom';
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
  config: LangChainConfig | LangFlowConfig | Record<string, any>;
  lastRun?: string;
  createdBy: string;
}

/**
 * Configuration for a LangChain agent
 */
export interface LangChainConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  tools: string[];
  memory: string;
  retrievalMode?: string;
  vectorStore?: string;
  documents?: string[];
  apiKey?: string;
  modelParams?: Record<string, any>;
}

/**
 * Configuration for a LangFlow agent
 */
export interface LangFlowConfig {
  flowId?: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  flowName: string;
  description: string;
  enabledChannels: string[];
  apiAccess?: boolean;
}

/**
 * Represents a node in a LangFlow workflow
 */
export interface FlowNode {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    name: string;
    description?: string;
    [key: string]: any;
  };
}

/**
 * Represents an edge connecting nodes in a LangFlow workflow
 */
export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

/**
 * Agent template for creating new agents
 */
export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  type: 'langchain' | 'langflow';
  category: string;
  useCase: string;
  thumbnail: string;
  config: LangChainConfig | LangFlowConfig;
}

/**
 * Result of an agent execution
 */
export interface AgentExecutionResult {
  output: string;
  sessionId: string;
  executionId: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    cost: number;
  };
  steps: AgentExecutionStep[];
  metadata: Record<string, any>;
}

/**
 * A step in the agent execution process
 */
export interface AgentExecutionStep {
  type: 'input' | 'thought' | 'action' | 'observation' | 'output';
  content: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

/**
 * Options for executing an agent
 */
export interface AgentExecutionOptions {
  input: string;
  sessionId?: string;
  retrieval?: boolean;
  tools?: string[];
  documents?: string[];
  streaming?: boolean;
  metadata?: Record<string, any>;
}

/**
 * Usage statistics for agents
 */
export interface AgentUsageStats {
  totalExecutions: number;
  uniqueUsers: number;
  averageResponseTime: number;
  totalTokensUsed: number;
  estimatedCost: number;
  successRate: number;
  byDay: {
    date: string;
    executions: number;
    tokens: number;
    cost: number;
  }[];
  byModel: {
    model: string;
    executions: number;
    tokens: number;
    cost: number;
  }[];
  byTool: {
    tool: string;
    usageCount: number;
    successRate: number;
  }[];
} 