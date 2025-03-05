# AI Agents Admin Panel

The AI Agents section in the admin panel allows administrators to create, manage, and deploy AI agents that can assist users throughout the loan management platform. These agents can handle customer inquiries, automate processes, and provide personalized assistance.

## Overview

The AI Agents feature integrates with two powerful frameworks:

1. **LangChain** - For building custom AI agents with defined tools, memory, and capabilities
2. **LangFlow** - For creating visual workflows that define agent behavior using a drag-and-drop interface

## Key Features

- **Agent Management**: Create, edit, delete, and manage AI agents
- **Multiple Agent Types**: Support for LangChain and LangFlow agents
- **Testing Interface**: Test agents directly from the admin panel
- **Usage Statistics**: Track agent performance, costs, and usage
- **Template Library**: Start with pre-built agent templates for common use cases
- **Visual Flow Editor**: Design complex agent workflows visually

## Pages and Components

### Main Agents Page

Located at `/platform/admin/ai-agents`, this page displays all available agents with status indicators and quick actions.

### Agent Detail Page

Located at `/platform/admin/ai-agents/[id]`, this page shows:
- Agent configuration details
- Usage statistics
- Execution history
- Testing interface
- Management options (edit, delete, activate/deactivate)

### Agent Creation Page

Located at `/platform/admin/ai-agents/create`, this page allows:
- Selection of agent type (LangChain or LangFlow)
- Configuration of agent parameters
- Selection of model, tools, and memory type
- Starting from a template

### Agent Edit Page

Located at `/platform/admin/ai-agents/edit/[id]`, this page provides:
- Editing of agent name, description, and configuration
- Updating model parameters and tools
- Changing enabled channels

### Flow Editor Page

Located at `/platform/admin/ai-agents/flow-editor`, this visual editor allows:
- Creating and editing agent workflows
- Adding nodes for different components (models, tools, memory)
- Connecting nodes to define the flow of information
- Testing the flow with sample inputs

## Agent Types

### LangChain Agents

These agents use the LangChain framework and allow customization of:
- **Model**: The language model used (GPT-4, Claude, etc.)
- **Temperature**: Controls the randomness of responses
- **System Prompt**: Defines the agent's personality and capabilities
- **Tools**: Additional capabilities like web search or document retrieval
- **Memory**: How the agent maintains conversation context

### LangFlow Agents

These agents use a visual flow-based approach and allow:
- **Custom Workflows**: Design complex decision trees and processes
- **Multiple Components**: Combine different nodes for specialized functionality
- **Channel Integration**: Deploy to specific channels (Web, API, Slack, etc.)

## API Endpoints

All agent interactions are available through the API, allowing integration with any part of the platform:

- `GET /api/agents` - List all agents
- `GET /api/agents/:id` - Get agent details
- `POST /api/agents` - Create a new agent
- `PUT /api/agents/:id` - Update an agent
- `DELETE /api/agents/:id` - Delete an agent
- `PUT /api/agents/:id/status` - Toggle agent status
- `POST /api/agents/:id/execute` - Execute an agent with input
- `GET /api/agent-templates` - List available templates
- `POST /api/agent-templates/:templateId/create` - Create agent from template
- `GET /api/agents/:id/history` - Get execution history
- `GET /api/agents/:id/stats` - Get usage statistics
- `POST /api/agents/:id/documents` - Upload documents for agent

## Integration Examples

### Adding an Agent to a Loan Application Page

```typescript
import { executeAgent } from '@/utils/langchain/agent-service';

// In your component
const [response, setResponse] = useState('');
const [isLoading, setIsLoading] = useState(false);

const askAgentForHelp = async (question) => {
  setIsLoading(true);
  try {
    // Loan Application Assistant agent ID
    const result = await executeAgent('e5f6g7h8', { input: question }, token);
    setResponse(result.output);
  } catch (error) {
    console.error('Error executing agent:', error);
  } finally {
    setIsLoading(false);
  }
};
```

### Displaying an AI Chat Widget

```typescript
import { AgentChatWidget } from '@/components/agents/AgentChatWidget';

// In your component
return (
  <div>
    <h1>Loan Application</h1>
    <form>
      {/* Form fields */}
    </form>
    
    <AgentChatWidget 
      agentId="e5f6g7h8"
      title="Loan Application Assistant"
      placeholder="Ask me about the application process"
    />
  </div>
);
```

## Best Practices

1. **Start with Templates**: Use pre-built templates to get started quickly
2. **Test Thoroughly**: Always test agents with various inputs before deploying
3. **Monitor Usage**: Keep an eye on token usage and costs
4. **Refine Prompts**: Continuously improve system prompts for better results
5. **Add Documentation**: Provide context by uploading relevant documents

## Troubleshooting

### Agent Not Responding

- Check that the agent status is "Active"
- Verify that the model API key is valid
- Test the agent in the admin panel

### Flow Editor Issues

- Make sure nodes are properly connected
- Check that input and output types match between nodes
- Verify that required node configurations are complete

### High Token Usage

- Review system prompts for unnecessary verbosity
- Consider using a more efficient model
- Add usage limits in the agent configuration

## Future Enhancements

- Support for additional language models
- More sophisticated agent tools
- Advanced retrieval and memory options
- Multi-agent collaboration
- Agent monitoring and alerting 