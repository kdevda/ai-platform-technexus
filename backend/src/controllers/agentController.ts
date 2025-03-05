import { Request, Response } from 'express';
import { Agent, AgentExecution, AgentTemplate, AgentFlow } from '../models/Agent';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { authenticateToken } from '../middleware/auth';
import { logger } from '../utils/logger';

dotenv.config();

// Mock data for demonstration
const mockAgents = [
  {
    id: 'a1b2c3d4',
    name: 'Customer Support Agent',
    description: 'Handles common customer inquiries and provides support information',
    type: 'langchain',
    status: 'active',
    createdAt: '2023-11-15T08:30:00Z',
    updatedAt: '2023-12-01T14:20:00Z',
    config: {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000,
      systemPrompt: 'You are a helpful customer support agent for a loan management platform. Answer user queries accurately and professionally.',
      tools: ['document-retrieval', 'web-search'],
      memory: 'conversation',
    },
    lastRun: '2023-12-05T09:15:33Z',
    createdBy: 'admin',
  },
  {
    id: 'e5f6g7h8',
    name: 'Loan Application Assistant',
    description: 'Guides users through the loan application process',
    type: 'langflow',
    status: 'active',
    createdAt: '2023-10-25T11:45:00Z',
    updatedAt: '2023-11-10T16:30:00Z',
    config: {
      flowName: 'Loan Application Flow',
      description: 'Interactive process for loan applications',
      nodes: [],
      edges: [],
      enabledChannels: ['web', 'api'],
    },
    lastRun: '2023-12-04T13:20:45Z',
    createdBy: 'admin',
  },
];

const mockTemplates = [
  {
    id: 't1u2v3w4',
    name: 'Customer Support',
    description: 'Template for handling customer inquiries and support',
    type: 'langchain',
    category: 'support',
    useCase: 'customer-service',
    thumbnail: '/assets/images/templates/customer-support.jpg',
    config: {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000,
      systemPrompt: 'You are a helpful customer support agent. Answer user queries accurately and professionally.',
      tools: ['document-retrieval'],
      memory: 'conversation',
    },
  },
  {
    id: 'x5y6z7a8',
    name: 'Loan Processor',
    description: 'Template for processing and analyzing loan applications',
    type: 'langflow',
    category: 'finance',
    useCase: 'loan-processing',
    thumbnail: '/assets/images/templates/loan-processor.jpg',
    config: {
      flowName: 'Loan Processing Flow',
      description: 'Process for handling loan applications',
      nodes: [],
      edges: [],
      enabledChannels: ['web', 'api'],
    },
  },
];

const mockExecutionHistory = [
  {
    executionId: 'exec123',
    agentId: 'a1b2c3d4',
    input: 'What are the requirements for a business loan?',
    timestamp: '2023-12-05T09:15:33Z',
    success: true,
    tokens: 450,
    cost: 0.009,
  },
  {
    executionId: 'exec124',
    agentId: 'a1b2c3d4',
    input: 'How can I check my loan status?',
    timestamp: '2023-12-01T14:22:10Z',
    success: true,
    tokens: 320,
    cost: 0.006,
  },
  {
    executionId: 'exec125',
    agentId: 'e5f6g7h8',
    input: 'I want to apply for a personal loan',
    timestamp: '2023-12-04T13:20:45Z',
    success: true,
    tokens: 800,
    cost: 0.016,
  },
];

const mockUsageStats = {
  totalExecutions: 245,
  uniqueUsers: 78,
  averageResponseTime: 1.2,
  totalTokensUsed: 95000,
  estimatedCost: 1.85,
  successRate: 97.5,
  byDay: [
    { date: '2023-12-01', executions: 32, tokens: 12800, cost: 0.24 },
    { date: '2023-12-02', executions: 28, tokens: 11200, cost: 0.22 },
    { date: '2023-12-03', executions: 35, tokens: 14000, cost: 0.28 },
    { date: '2023-12-04', executions: 41, tokens: 16400, cost: 0.32 },
    { date: '2023-12-05', executions: 37, tokens: 14800, cost: 0.30 },
  ],
  byModel: [
    { model: 'gpt-4', executions: 150, tokens: 60000, cost: 1.2 },
    { model: 'gpt-3.5-turbo', executions: 95, tokens: 35000, cost: 0.65 },
  ],
  byTool: [
    { tool: 'document-retrieval', usageCount: 120, successRate: 98.2 },
    { tool: 'web-search', usageCount: 75, successRate: 96.0 },
    { tool: 'code-interpreter', usageCount: 50, successRate: 94.5 },
  ],
};

// Helper to validate if a MongoDB object ID is valid
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// API Keys are stored in environment variables for security
const API_KEYS = {
  openai: process.env.OPENAI_API_KEY,
  anthropic: process.env.ANTHROPIC_API_KEY,
  cohere: process.env.COHERE_API_KEY,
  google: process.env.GOOGLE_API_KEY,
  // Add more providers as needed
};

/**
 * Get all agents
 */
export const getAgents = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required',
      });
    }

    // Get agents from MongoDB, filtering by the current user
    const agents = await Agent.find({ createdBy: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: agents.length,
      data: agents,
    });
  } catch (error: any) {
    console.error('Error getting agents:', error);
    return res.status(500).json({
      success: false,
      message: 'Error getting agents',
      error: error.message,
    });
  }
};

/**
 * Get a single agent by ID
 */
export const getAgentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid agent ID format',
      });
    }

    const agent = await Agent.findById(id);
    
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent not found',
      });
    }

    // Check if the agent belongs to the authenticated user
    if (agent.createdBy.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this agent',
      });
    }

    return res.status(200).json({
      success: true,
      data: agent,
    });
  } catch (error: any) {
    console.error('Error getting agent by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Error getting agent',
      error: error.message,
    });
  }
};

/**
 * Create a new agent
 */
export const createAgent = async (req: Request, res: Response) => {
  try {
    const { name, description, type, config } = req.body;
    
    // Check if required fields are present
    if (!name || !description || !type || !config) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, description, type, and config are required',
      });
    }
    
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required',
      });
    }

    // Create a new agent in MongoDB
    const newAgent = await Agent.create({
      name,
      description,
      type,
      config,
      status: 'draft',
      createdBy: userId,
    });

    return res.status(201).json({
      success: true,
      data: newAgent,
    });
  } catch (error: any) {
    console.error('Error creating agent:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating agent',
      error: error.message,
    });
  }
};

/**
 * Update an existing agent
 */
export const updateAgent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, type, config, status } = req.body;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid agent ID format',
      });
    }

    // Find the agent
    let agent = await Agent.findById(id);
    
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent not found',
      });
    }

    // Check if the agent belongs to the authenticated user
    if (agent.createdBy.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this agent',
      });
    }

    // Update agent in MongoDB
    agent = await Agent.findByIdAndUpdate(
      id,
      {
        name,
        description,
        type,
        config,
        status,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: agent,
    });
  } catch (error: any) {
    console.error('Error updating agent:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating agent',
      error: error.message,
    });
  }
};

/**
 * Delete an agent
 */
export const deleteAgent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid agent ID format',
      });
    }

    const agent = await Agent.findById(id);
    
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent not found',
      });
    }

    // Check if the agent belongs to the authenticated user
    if (agent.createdBy.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this agent',
      });
    }

    // Delete agent from MongoDB
    await Agent.findByIdAndDelete(id);
    
    // Optionally delete associated executions
    await AgentExecution.deleteMany({ agentId: id });

    return res.status(200).json({
      success: true,
      data: {},
      message: 'Agent deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting agent:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting agent',
      error: error.message,
    });
  }
};

/**
 * Toggle agent status (active/inactive/draft)
 */
export const toggleAgentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid agent ID format',
      });
    }

    if (!status || !['active', 'inactive', 'draft'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Status must be one of: active, inactive, draft',
      });
    }

    const agent = await Agent.findById(id);
    
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent not found',
      });
    }

    // Check if the agent belongs to the authenticated user
    if (agent.createdBy.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this agent',
      });
    }

    // Update agent status in MongoDB
    const updatedAgent = await Agent.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedAgent,
    });
  } catch (error: any) {
    console.error('Error updating agent status:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating agent status',
      error: error.message,
    });
  }
};

/**
 * Execute an agent
 */
export const executeAgent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { input, sessionId } = req.body;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid agent ID format',
      });
    }

    if (!input) {
      return res.status(400).json({
        success: false,
        message: 'Input is required',
      });
    }

    const agent = await Agent.findById(id);
    
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent not found',
      });
    }

    if (agent.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Agent is not active',
      });
    }

    // Generate a unique execution ID
    const executionId = uuidv4();
    const session = sessionId || uuidv4();

    // For demonstration, simulate agent execution
    // In real scenario, this would call LangChain or LangFlow runtime
    const output = `Response to: ${input}`;
    
    // Update agent's lastRun timestamp
    await Agent.findByIdAndUpdate(id, { lastRun: new Date() });

    // Record the execution
    const execution = await AgentExecution.create({
      agentId: id,
      input,
      output,
      sessionId: session,
      executionId,
      usage: {
        promptTokens: 20,
        completionTokens: 15,
        totalTokens: 35,
        cost: 0.0007,
      },
      steps: [
        {
          type: 'input',
          content: input,
          timestamp: new Date(),
        },
        {
          type: 'output',
          content: output,
          timestamp: new Date(),
        },
      ],
      metadata: {},
    });

    return res.status(200).json({
      success: true,
      data: {
        executionId,
        sessionId: session,
        input,
        output,
      },
    });
  } catch (error: any) {
    console.error('Error executing agent:', error);
    return res.status(500).json({
      success: false,
      message: 'Error executing agent',
      error: error.message,
    });
  }
};

/**
 * Get agent templates
 */
export const getAgentTemplates = async (req: Request, res: Response) => {
  try {
    // Get templates from MongoDB
    const templates = await AgentTemplate.find().sort({ category: 1, name: 1 });

    return res.status(200).json({
      success: true,
      count: templates.length,
      data: templates,
    });
  } catch (error: any) {
    console.error('Error getting agent templates:', error);
    return res.status(500).json({
      success: false,
      message: 'Error getting agent templates',
      error: error.message,
    });
  }
};

/**
 * Create an agent from a template
 */
export const createAgentFromTemplate = async (req: Request, res: Response) => {
  try {
    const { templateId } = req.params;
    const customizations = req.body;
    
    // In a real implementation, we would:
    // 1. Find the template
    // 2. Create a new agent based on the template with customizations
    
    // Using mock data for demonstration
    const template = mockTemplates.find(t => t.id === templateId);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    
    const newAgent = {
      id: uuidv4(),
      name: customizations.name || `${template.name} Agent`,
      description: customizations.description || template.description,
      type: template.type,
      config: {
        ...template.config,
        ...(customizations.config || {}),
      },
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin', // In real implementation, this would be req.user.id
    };
    
    // This is just for the mock - in a real implementation, we'd create a DB record
    mockAgents.push(newAgent as any);
    
    res.status(201).json(newAgent);
  } catch (error) {
    logger.error(`Error creating agent from template ${req.params.templateId}:`, error);
    res.status(500).json({ error: 'Failed to create agent from template' });
  }
};

/**
 * Get agent execution history
 */
export const getAgentExecutionHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid agent ID format',
      });
    }

    // Validate that the agent exists and belongs to the user
    const agent = await Agent.findById(id);
    
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent not found',
      });
    }

    if (agent.createdBy.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this agent',
      });
    }

    // Get execution history from MongoDB
    const executions = await AgentExecution.find({ agentId: id })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json({
      success: true,
      count: executions.length,
      data: executions,
    });
  } catch (error: any) {
    console.error('Error getting agent execution history:', error);
    return res.status(500).json({
      success: false,
      message: 'Error getting agent execution history',
      error: error.message,
    });
  }
};

/**
 * Get agent usage statistics
 */
export const getAgentUsageStats = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid agent ID format',
      });
    }

    // Validate that the agent exists and belongs to the user
    const agent = await Agent.findById(id);
    
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent not found',
      });
    }

    if (agent.createdBy.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this agent',
      });
    }

    // Calculate usage statistics from MongoDB
    const executions = await AgentExecution.find({ agentId: id });
    
    // Calculate total tokens and cost
    const totalTokens = executions.reduce((sum, exec) => sum + exec.usage.totalTokens, 0);
    const totalCost = executions.reduce((sum, exec) => sum + exec.usage.cost, 0);
    
    // Calculate daily usage
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    const dailyStats = await AgentExecution.aggregate([
      {
        $match: {
          agentId: new mongoose.Types.ObjectId(id),
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: { 
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          count: { $sum: 1 },
          tokens: { $sum: "$usage.totalTokens" },
          cost: { $sum: "$usage.cost" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalExecutions: executions.length,
        totalTokens,
        totalCost,
        dailyStats: dailyStats.map(stat => ({
          date: new Date(stat._id.year, stat._id.month - 1, stat._id.day),
          count: stat.count,
          tokens: stat.tokens,
          cost: stat.cost
        }))
      },
    });
  } catch (error: any) {
    console.error('Error getting agent usage statistics:', error);
    return res.status(500).json({
      success: false,
      message: 'Error getting agent usage statistics',
      error: error.message,
    });
  }
};

/**
 * Upload documents for agent knowledge base
 */
export const uploadAgentDocuments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // In a real implementation, we would:
    // 1. Process uploaded files
    // 2. Extract text content
    // 3. Store in vector database for retrieval
    
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded' });
    }
    
    // Mock response
    res.json({
      success: true,
      message: 'Documents uploaded and processed successfully',
      documents: [
        {
          id: `doc-${uuidv4().substring(0, 8)}`,
          filename: 'document1.pdf',
          contentType: 'application/pdf',
          pages: 5,
          chunks: 20,
        },
        {
          id: `doc-${uuidv4().substring(0, 8)}`,
          filename: 'document2.docx',
          contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          pages: 8,
          chunks: 32,
        },
      ],
    });
  } catch (error) {
    logger.error(`Error uploading documents for agent with ID ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to upload documents' });
  }
};

// Save a flow
export const saveFlow = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, nodes, edges } = req.body;
    
    if (!name || !nodes || !edges) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, nodes, and edges are required',
      });
    }
    
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required',
      });
    }

    let flow;
    
    // If ID is provided, update existing flow
    if (id && isValidObjectId(id)) {
      // Find the flow
      flow = await AgentFlow.findById(id);
      
      if (!flow) {
        return res.status(404).json({
          success: false,
          message: 'Flow not found',
        });
      }

      // Check if the flow belongs to the authenticated user
      if (flow.createdBy.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this flow',
        });
      }

      // Update flow
      flow = await AgentFlow.findByIdAndUpdate(
        id,
        {
          name,
          description: description || '',
          nodes,
          edges,
        },
        { new: true }
      );
    } else {
      // Create new flow
      flow = await AgentFlow.create({
        name,
        description: description || '',
        nodes,
        edges,
        createdBy: userId,
      });
    }

    return res.status(200).json({
      success: true,
      data: flow,
    });
  } catch (error: any) {
    console.error('Error saving flow:', error);
    return res.status(500).json({
      success: false,
      message: 'Error saving flow',
      error: error.message,
    });
  }
};

// Get a flow by ID
export const getFlowById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid flow ID format',
      });
    }

    const flow = await AgentFlow.findById(id);
    
    if (!flow) {
      return res.status(404).json({
        success: false,
        message: 'Flow not found',
      });
    }

    // Check if the flow belongs to the authenticated user
    if (flow.createdBy.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this flow',
      });
    }

    return res.status(200).json({
      success: true,
      data: flow,
    });
  } catch (error: any) {
    console.error('Error getting flow by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Error getting flow',
      error: error.message,
    });
  }
};

// Get API provider settings
export const getApiProviderSettings = async (req: Request, res: Response) => {
  try {
    // Only return which providers are configured, never return the actual keys
    const providers = {
      openai: Boolean(API_KEYS.openai),
      anthropic: Boolean(API_KEYS.anthropic),
      cohere: Boolean(API_KEYS.cohere),
      google: Boolean(API_KEYS.google),
    };

    return res.status(200).json({
      success: true,
      data: providers,
    });
  } catch (error: any) {
    console.error('Error getting API provider settings:', error);
    return res.status(500).json({
      success: false,
      message: 'Error getting API provider settings',
      error: error.message,
    });
  }
};

// Export controller functions
export const agentController = {
  getAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent,
  toggleAgentStatus,
  executeAgent,
  getAgentTemplates,
  createAgentFromTemplate,
  getAgentExecutionHistory,
  getAgentUsageStats,
  uploadAgentDocuments,
  saveFlow,
  getFlowById,
  getApiProviderSettings,
}; 