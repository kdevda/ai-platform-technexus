import mongoose, { Document, Schema } from 'mongoose';

export interface IAgent extends Document {
  name: string;
  description: string;
  type: 'langchain' | 'langflow' | 'custom';
  status: 'active' | 'inactive' | 'draft';
  config: any;
  integrationId?: mongoose.Types.ObjectId | string;
  createdBy: mongoose.Types.ObjectId | string;
  lastRun?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAgentExecution extends Document {
  agentId: mongoose.Types.ObjectId | string;
  input: string;
  output: string;
  sessionId: string;
  executionId: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    cost: number;
  };
  steps: [{
    type: string;
    content: string;
    timestamp: Date;
    metadata?: any;
  }];
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAgentTemplate extends Document {
  name: string;
  description: string;
  type: 'langchain' | 'langflow';
  category: string;
  useCase: string;
  thumbnail: string;
  config: any;
  integrationId?: mongoose.Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}

// Agent Schema
const agentSchema = new Schema<IAgent>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['langchain', 'langflow', 'custom'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'draft'],
      default: 'draft',
    },
    config: {
      type: Schema.Types.Mixed,
      required: true,
    },
    integrationId: {
      type: Schema.Types.ObjectId,
      ref: 'Integration',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lastRun: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Agent Execution Schema
const agentExecutionSchema = new Schema<IAgentExecution>(
  {
    agentId: {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
      required: true,
    },
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    executionId: {
      type: String,
      required: true,
    },
    usage: {
      promptTokens: { type: Number, required: true },
      completionTokens: { type: Number, required: true },
      totalTokens: { type: Number, required: true },
      cost: { type: Number, required: true },
    },
    steps: [
      {
        type: { type: String, required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, required: true },
        metadata: { type: Schema.Types.Mixed },
      },
    ],
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Agent Template Schema
const agentTemplateSchema = new Schema<IAgentTemplate>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['langchain', 'langflow'],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    useCase: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: '/assets/images/templates/default.jpg',
    },
    config: {
      type: Schema.Types.Mixed,
      required: true,
    },
    integrationId: {
      type: Schema.Types.ObjectId,
      ref: 'Integration',
    },
  },
  {
    timestamps: true,
  }
);

// Agent Flow Schema (for storing LangFlow visual designs)
interface IAgentFlow extends Document {
  name: string;
  description: string;
  version: string;
  nodes: any[];
  edges: any[];
  agentId: mongoose.Types.ObjectId | string;
  integrationId?: mongoose.Types.ObjectId | string;
  createdBy: mongoose.Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}

const agentFlowSchema = new Schema<IAgentFlow>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    version: {
      type: String,
      required: true,
    },
    nodes: {
      type: Schema.Types.Mixed,
      required: true,
    },
    edges: {
      type: Schema.Types.Mixed,
      required: true,
    },
    agentId: {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
      required: true,
    },
    integrationId: {
      type: Schema.Types.ObjectId,
      ref: 'Integration',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export models
const Agent = mongoose.model<IAgent>('Agent', agentSchema);
const AgentExecution = mongoose.model<IAgentExecution>('AgentExecution', agentExecutionSchema);
const AgentTemplate = mongoose.model<IAgentTemplate>('AgentTemplate', agentTemplateSchema);
const AgentFlow = mongoose.model<IAgentFlow>('AgentFlow', agentFlowSchema);

export { Agent, AgentExecution, AgentTemplate, AgentFlow }; 