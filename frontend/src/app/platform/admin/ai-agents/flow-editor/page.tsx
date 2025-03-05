'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Spinner } from '@/components/ui/Spinner';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface NodeData {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    name: string;
    description?: string;
    [key: string]: any;
  };
}

interface Edge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

const FlowEditorPage: React.FC = () => {
  const { state } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const flowId = searchParams.get('id');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [flowName, setFlowName] = useState('New Flow');
  const [flowDescription, setFlowDescription] = useState('');
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  
  // Node palette items
  const nodeTypes = [
    {
      type: 'llm',
      category: 'Language Models',
      items: [
        { id: 'openai-llm', name: 'OpenAI', description: 'OpenAI language model' },
        { id: 'anthropic-llm', name: 'Anthropic', description: 'Anthropic language model' },
        { id: 'local-llm', name: 'Local LLM', description: 'Locally deployed language model' },
      ]
    },
    {
      type: 'memory',
      category: 'Memory',
      items: [
        { id: 'buffer-memory', name: 'Buffer Memory', description: 'Simple buffer memory' },
        { id: 'conversation-memory', name: 'Conversation Memory', description: 'Tracks conversation history' },
        { id: 'summary-memory', name: 'Summary Memory', description: 'Summarizes past interactions' },
      ]
    },
    {
      type: 'vectorstore',
      category: 'Vector Stores',
      items: [
        { id: 'pinecone-vs', name: 'Pinecone', description: 'Pinecone vector database' },
        { id: 'chroma-vs', name: 'ChromaDB', description: 'ChromaDB vector database' },
        { id: 'qdrant-vs', name: 'Qdrant', description: 'Qdrant vector database' },
      ]
    },
    {
      type: 'tools',
      category: 'Tools',
      items: [
        { id: 'web-search', name: 'Web Search', description: 'Search the web' },
        { id: 'calculator', name: 'Calculator', description: 'Perform calculations' },
        { id: 'database', name: 'Database', description: 'Query databases' },
        { id: 'api', name: 'API Tool', description: 'Call external APIs' },
      ]
    },
    {
      type: 'input-output',
      category: 'Input/Output',
      items: [
        { id: 'text-input', name: 'Text Input', description: 'Text input node' },
        { id: 'chat-output', name: 'Chat Output', description: 'Chat interface output' },
        { id: 'document-input', name: 'Document Input', description: 'Document loader' },
        { id: 'email-output', name: 'Email', description: 'Email output' },
      ]
    },
    {
      type: 'chains',
      category: 'Chains',
      items: [
        { id: 'llm-chain', name: 'LLM Chain', description: 'Basic LLM chain' },
        { id: 'sequential-chain', name: 'Sequential Chain', description: 'Run chains in sequence' },
        { id: 'router-chain', name: 'Router Chain', description: 'Route between chains' },
        { id: 'retrieval-chain', name: 'Retrieval QA', description: 'Question answering with retrieval' },
      ]
    },
  ];
  
  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      if (flowId) {
        fetchFlow();
      } else {
        // Initialize with a default starter flow
        setNodes([
          {
            id: 'input-1',
            type: 'input-output',
            position: { x: 100, y: 200 },
            data: { name: 'Text Input', description: 'User query input' }
          },
          {
            id: 'llm-1',
            type: 'llm',
            position: { x: 400, y: 200 },
            data: { 
              name: 'OpenAI', 
              description: 'GPT-4 language model', 
              model: 'gpt-4',
              provider: 'openai',
              temperature: 0.7,
              max_tokens: 1000
            }
          },
          {
            id: 'output-1',
            type: 'input-output',
            position: { x: 700, y: 200 },
            data: { name: 'Chat Output', description: 'Chat interface output' }
          }
        ]);
        
        setEdges([
          {
            id: 'edge-1',
            source: 'input-1',
            target: 'llm-1',
          },
          {
            id: 'edge-2',
            source: 'llm-1',
            target: 'output-1',
          }
        ]);
        
        setIsLoading(false);
      }
    }
  }, [state.isAuthenticated, state.user, flowId]);
  
  const fetchFlow = async () => {
    try {
      // Check localStorage first for demo persistence
      let data;
      try {
        const storedFlows = JSON.parse(localStorage.getItem('langflow_flows') || '{}');
        if (flowId && storedFlows[flowId]) {
          data = storedFlows[flowId];
          setFlowName(data.name);
          setFlowDescription(data.description);
          setNodes(data.nodes);
          setEdges(data.edges);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error('Error reading from localStorage:', err);
      }
      
      // This would be replaced with your actual API endpoint
      const response = await fetch(`/api/flows/${flowId || ''}`, {
        headers: {
          Authorization: `Bearer ${state.user?.token}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch flow');
      
      data = await response.json();
      setFlowName(data.name);
      setFlowDescription(data.description);
      setNodes(data.nodes);
      setEdges(data.edges);
    } catch (error) {
      console.error('Error fetching flow:', error);
      // Mock data for demo purposes
      setFlowName('Customer Support Flow');
      setFlowDescription('Handles customer inquiries with document retrieval');
      setNodes([
        {
          id: 'input-1',
          type: 'input-output',
          position: { x: 100, y: 200 },
          data: { name: 'Text Input', description: 'User query input' }
        },
        {
          id: 'memory-1',
          type: 'memory',
          position: { x: 400, y: 100 },
          data: { name: 'Conversation Memory', description: 'Tracks conversation history' }
        },
        {
          id: 'vectorstore-1',
          type: 'vectorstore',
          position: { x: 400, y: 300 },
          data: { name: 'Pinecone', description: 'Document store' }
        },
        {
          id: 'llm-1',
          type: 'llm',
          position: { x: 700, y: 200 },
          data: { 
            name: 'OpenAI', 
            description: 'GPT-4 language model', 
            model: 'gpt-4',
            provider: 'openai',
            temperature: 0.7,
            max_tokens: 1000
          }
        },
        {
          id: 'output-1',
          type: 'input-output',
          position: { x: 1000, y: 200 },
          data: { name: 'Chat Output', description: 'Chat interface output' }
        }
      ]);
      
      setEdges([
        {
          id: 'edge-1',
          source: 'input-1',
          target: 'llm-1',
        },
        {
          id: 'edge-2',
          source: 'memory-1',
          target: 'llm-1',
        },
        {
          id: 'edge-3',
          source: 'vectorstore-1',
          target: 'llm-1',
        },
        {
          id: 'edge-4',
          source: 'llm-1',
          target: 'output-1',
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveFlow = async () => {
    setIsSaving(true);
    
    try {
      const flowData = {
        name: flowName,
        description: flowDescription,
        nodes,
        edges,
      };
      
      // This would be replaced with your actual API endpoint
      const url = flowId ? `/api/flows/${flowId}` : '/api/flows';
      const method = flowId ? 'PUT' : 'POST';
      
      // Mock API response for development/testing
      // In production, uncomment the actual fetch call and remove this mock
      // const response = await fetch(url, {
      //   method,
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${state.user?.token}`,
      //   },
      //   body: JSON.stringify(flowData),
      // });
      
      // Mock successful response
      const mockResponse = {
        ok: true,
        json: async () => ({
          id: flowId || `flow-${Date.now()}`,
          ...flowData
        })
      };
      
      const response = mockResponse;
      
      if (!response.ok) throw new Error('Failed to save flow');
      
      const data = await response.json();
      
      // If this was opened from the agent creation page, send a message to the parent window
      if (window.opener) {
        window.opener.postMessage({
          type: 'FLOW_SAVED',
          flowId: data.id,
          flowData,
        }, '*');
      }
      
      // Store flow data in local storage for demo persistence
      try {
        const storedFlows = JSON.parse(localStorage.getItem('langflow_flows') || '{}');
        storedFlows[data.id] = data;
        localStorage.setItem('langflow_flows', JSON.stringify(storedFlows));
      } catch (err) {
        console.error('Error storing flow in localStorage:', err);
      }
      
      alert('Flow saved successfully!');
      
      // Navigate to flow details page if created new flow
      if (!flowId) {
        router.push(`/platform/admin/ai-agents/flow-editor?id=${data.id}`);
      }
    } catch (error) {
      console.error('Error saving flow:', error);
      alert('Failed to save flow. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, nodeType: string, nodeData: any) => {
    e.dataTransfer.setData('nodeType', nodeType);
    e.dataTransfer.setData('nodeData', JSON.stringify(nodeData));
    e.dataTransfer.effectAllowed = 'copy';
  };
  
  const handleCanvasDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };
  
  const handleCanvasDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const nodeType = e.dataTransfer.getData('nodeType');
    if (!nodeType) return;
    
    const nodeData = JSON.parse(e.dataTransfer.getData('nodeData'));
    
    // Get the canvas bounds
    const canvas = canvasRef.current?.getBoundingClientRect();
    if (!canvas) return;
    
    // Calculate the position relative to the canvas, accounting for zoom and pan
    const x = (e.clientX - canvas.left - panOffset.x) / zoom;
    const y = (e.clientY - canvas.top - panOffset.y) / zoom;
    
    const newNode: NodeData = {
      id: `${nodeType}-${Date.now()}`,
      type: nodeType,
      position: { x, y },
      data: {
        ...nodeData
      }
    };
    
    setNodes((prev) => [...prev, newNode]);
  };
  
  const startNodeDrag = (e: React.MouseEvent, nodeId: string) => {
    // Don't start dragging if we clicked on the node settings or delete button
    if ((e.target as HTMLElement).closest('.node-settings, .node-delete')) {
      return;
    }
    
    e.stopPropagation();
    setIsDragging(true);
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setDragStartPos({
        x: e.clientX - node.position.x * zoom - panOffset.x,
        y: e.clientY - node.position.y * zoom - panOffset.y
      });
    }
  };
  
  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedNode) {
      e.stopPropagation();
      
      // Update node position based on mouse movement
      setNodes(nodes.map(node => 
        node.id === selectedNode.id 
          ? {
              ...node,
              position: {
                x: (e.clientX - dragStartPos.x - panOffset.x) / zoom,
                y: (e.clientY - dragStartPos.y - panOffset.y) / zoom
              }
            }
          : node
      ));
    }
  };
  
  const handleCanvasMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };
  
  const handleNodeClick = (e: React.MouseEvent, node: NodeData) => {
    e.stopPropagation();
    setSelectedNode(node);
  };
  
  const handleCanvasClick = () => {
    setSelectedNode(null);
  };
  
  const handleDeleteNode = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    
    // Remove the node
    setNodes(nodes.filter(node => node.id !== nodeId));
    
    // Remove any edges connected to this node
    setEdges(edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };
  
  const handleCreateEdge = (sourceId: string, targetId: string) => {
    // Don't create self-loops
    if (sourceId === targetId) return;
    
    // Don't create duplicate edges
    if (edges.some(edge => edge.source === sourceId && edge.target === targetId)) return;
    
    const newEdge: Edge = {
      id: `edge-${Date.now()}`,
      source: sourceId,
      target: targetId
    };
    
    setEdges([...edges, newEdge]);
  };
  
  const handleNodeSettingsClick = (e: React.MouseEvent, node: NodeData) => {
    e.stopPropagation();
    setSelectedNode(node);
  };
  
  const handleNodeSettingsChange = (field: string, value: any) => {
    if (!selectedNode) return;
    
    setNodes(nodes.map(node => 
      node.id === selectedNode.id 
        ? {
            ...node,
            data: {
              ...node.data,
              [field]: value
            }
          }
        : node
    ));
    
    setSelectedNode({
      ...selectedNode,
      data: {
        ...selectedNode.data,
        [field]: value
      }
    });
  };
  
  const handleCanvasWheel = (e: React.WheelEvent) => {
    // Handle zoom with Ctrl + wheel
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(prevZoom => Math.max(0.1, Math.min(2, prevZoom + delta)));
    }
    // Handle pan with wheel
    else {
      setPanOffset(prev => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY
      }));
    }
  };
  
  const getNodeColor = (type: string) => {
    switch (type) {
      case 'llm':
        return 'bg-blue-100 border-blue-300';
      case 'memory':
        return 'bg-purple-100 border-purple-300';
      case 'vectorstore':
        return 'bg-green-100 border-green-300';
      case 'tools':
        return 'bg-yellow-100 border-yellow-300';
      case 'input-output':
        return 'bg-gray-100 border-gray-300';
      case 'chains':
        return 'bg-red-100 border-red-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };
  
  const renderNode = (node: NodeData) => {
    const isSelected = selectedNode?.id === node.id;
    const nodeColorClasses = getNodeColor(node.type);
    
    return (
      <div
        key={node.id}
        className={`absolute cursor-move rounded-lg border-2 ${nodeColorClasses} ${isSelected ? 'ring-2 ring-black' : ''}`}
        style={{
          transform: `translate(${node.position.x * zoom}px, ${node.position.y * zoom}px)`,
          width: '180px',
          zIndex: isSelected ? 10 : 1
        }}
        onMouseDown={(e) => {
          startNodeDrag(e, node.id);
          handleNodeClick(e, node);
        }}
      >
        <div className="p-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-sm">{node.data.name}</h3>
            <div className="flex space-x-1">
              <button 
                className="node-settings p-1 rounded hover:bg-gray-200"
                onClick={(e) => handleNodeSettingsClick(e, node)}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button 
                className="node-delete p-1 rounded hover:bg-red-100"
                onClick={(e) => handleDeleteNode(e, node.id)}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          {node.data.description && (
            <p className="text-xs text-gray-500 mt-1">{node.data.description}</p>
          )}
        </div>
        
        {/* Node ports */}
        <div className="flex justify-between px-3 pb-2">
          <div
            className="h-4 w-4 rounded-full bg-gray-400 cursor-pointer flex items-center justify-center"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('sourceNodeId', node.id);
            }}
          >
            <span className="text-white text-xs">in</span>
          </div>
          <div
            className="h-4 w-4 rounded-full bg-gray-400 cursor-pointer flex items-center justify-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const sourceId = e.dataTransfer.getData('sourceNodeId');
              if (sourceId) {
                handleCreateEdge(sourceId, node.id);
              }
            }}
          >
            <span className="text-white text-xs">out</span>
          </div>
        </div>
      </div>
    );
  };
  
  const renderEdge = (edge: Edge) => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    
    if (!sourceNode || !targetNode) return null;
    
    // Calculate edge start and end positions
    const start = {
      x: (sourceNode.position.x + 180 - 20) * zoom + panOffset.x, // right port
      y: (sourceNode.position.y + 40) * zoom + panOffset.y
    };
    
    const end = {
      x: (targetNode.position.x + 20) * zoom + panOffset.x, // left port
      y: (targetNode.position.y + 40) * zoom + panOffset.y
    };
    
    // Create a bezier curve path
    const dx = end.x - start.x;
    const controlPointOffset = Math.min(Math.abs(dx) * 0.5, 150);
    
    const path = `M ${start.x},${start.y} C ${start.x + controlPointOffset},${start.y} ${end.x - controlPointOffset},${end.y} ${end.x},${end.y}`;
    
    return (
      <svg
        key={edge.id}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <path
          d={path}
          stroke="#888"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead)"
        />
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
          </marker>
        </defs>
      </svg>
    );
  };
  
  const renderNodeSettings = () => {
    if (!selectedNode) return null;
    
    switch (selectedNode.type) {
      case 'llm':
        return (
          <div>
            <h3 className="font-medium text-lg mb-4">Language Model Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Provider
                </label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={selectedNode.data.provider || 'openai'}
                  onChange={(e) => {
                    const updatedNodes = nodes.map(node => 
                      node.id === selectedNode.id 
                        ? { ...node, data: { ...node.data, provider: e.target.value } } 
                        : node
                    );
                    setNodes(updatedNodes);
                    setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, provider: e.target.value } });
                  }}
                >
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="local">Local LLM</option>
                  <option value="azure">Azure OpenAI</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={selectedNode.data.model || ''}
                  onChange={(e) => {
                    const updatedNodes = nodes.map(node => 
                      node.id === selectedNode.id 
                        ? { ...node, data: { ...node.data, model: e.target.value } } 
                        : node
                    );
                    setNodes(updatedNodes);
                    setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, model: e.target.value } });
                  }}
                  placeholder="gpt-4-turbo, claude-3-opus, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperature (0-1)
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  className="w-full"
                  value={selectedNode.data.temperature || 0.7}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    const updatedNodes = nodes.map(node => 
                      node.id === selectedNode.id 
                        ? { ...node, data: { ...node.data, temperature: value } } 
                        : node
                    );
                    setNodes(updatedNodes);
                    setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, temperature: value } });
                  }}
                />
                <div className="text-right text-sm">{selectedNode.data.temperature || 0.7}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Tokens
                </label>
                <input
                  type="number"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={selectedNode.data.max_tokens || 1000}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    const updatedNodes = nodes.map(node => 
                      node.id === selectedNode.id 
                        ? { ...node, data: { ...node.data, max_tokens: value } } 
                        : node
                    );
                    setNodes(updatedNodes);
                    setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, max_tokens: value } });
                  }}
                />
              </div>
            </div>
          </div>
        );
        
      case 'vectorstore':
        return (
          <div>
            <h3 className="font-medium text-lg mb-4">Vector Store Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Provider
                </label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={selectedNode.data.provider || 'pinecone'}
                  onChange={(e) => {
                    const updatedNodes = nodes.map(node => 
                      node.id === selectedNode.id 
                        ? { ...node, data: { ...node.data, provider: e.target.value } } 
                        : node
                    );
                    setNodes(updatedNodes);
                    setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, provider: e.target.value } });
                  }}
                >
                  <option value="pinecone">Pinecone</option>
                  <option value="chroma">ChromaDB</option>
                  <option value="qdrant">Qdrant</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collection Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={selectedNode.data.collection || ''}
                  onChange={(e) => {
                    const updatedNodes = nodes.map(node => 
                      node.id === selectedNode.id 
                        ? { ...node, data: { ...node.data, collection: e.target.value } } 
                        : node
                    );
                    setNodes(updatedNodes);
                    setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, collection: e.target.value } });
                  }}
                  placeholder="documents, knowledge-base, etc."
                />
              </div>
            </div>
          </div>
        );
    
      // Add more node type settings as needed
      
      default:
        return (
          <div>
            <h3 className="font-medium text-lg mb-4">Node Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={selectedNode.data.name || ''}
                  onChange={(e) => {
                    const updatedNodes = nodes.map(node => 
                      node.id === selectedNode.id 
                        ? { ...node, data: { ...node.data, name: e.target.value } } 
                        : node
                    );
                    setNodes(updatedNodes);
                    setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, name: e.target.value } });
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={selectedNode.data.description || ''}
                  onChange={(e) => {
                    const updatedNodes = nodes.map(node => 
                      node.id === selectedNode.id 
                        ? { ...node, data: { ...node.data, description: e.target.value } } 
                        : node
                    );
                    setNodes(updatedNodes);
                    setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, description: e.target.value } });
                  }}
                />
              </div>
            </div>
          </div>
        );
    }
  };
  
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" />
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white border-b px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div>
              <input
                type="text"
                className="text-xl font-semibold border-none focus:ring-0 p-0"
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
                placeholder="Flow Name"
              />
              <input
                type="text"
                className="text-sm text-gray-500 border-none focus:ring-0 p-0 w-full"
                value={flowDescription}
                onChange={(e) => setFlowDescription(e.target.value)}
                placeholder="Flow Description"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 mr-4">
              <button
                className="p-1 rounded hover:bg-gray-100"
                onClick={() => setZoom(zoom + 0.1)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <span className="text-sm">{Math.round(zoom * 100)}%</span>
              <button
                className="p-1 rounded hover:bg-gray-100"
                onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
            </div>
            
            <Link
              href="/platform/admin/ai-agents"
              className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
            >
              Cancel
            </Link>
            
            <button
              className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800 disabled:bg-gray-400"
              onClick={saveFlow}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Spinner size="sm" />
                  <span className="ml-2">Saving...</span>
                </>
              ) : 'Save Flow'}
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar (node palette) */}
          <div className="w-64 border-r bg-gray-50 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500">Node Palette</h3>
              
              {nodeTypes.map((category) => (
                <div key={category.type} className="mt-4">
                  <h4 className="font-medium text-sm text-gray-700">{category.category}</h4>
                  <div className="mt-1 space-y-1">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className={`p-2 rounded cursor-grab ${getNodeColor(category.type)}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, category.type, item)}
                      >
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Center canvas */}
          <div className="flex-1 relative overflow-hidden">
            <div
              ref={canvasRef}
              className="absolute inset-0 bg-gray-100"
              onDragOver={handleCanvasDragOver}
              onDrop={handleCanvasDrop}
              onClick={handleCanvasClick}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
              onWheel={handleCanvasWheel}
              style={{
                backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
                backgroundImage: 'radial-gradient(circle, #00000011 1px, transparent 1px)',
                transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
              }}
            >
              {/* Edges */}
              {edges.map(renderEdge)}
              
              {/* Nodes */}
              {nodes.map(renderNode)}
            </div>
          </div>
          
          {/* Right sidebar (node settings) */}
          {selectedNode && (
            <div className="w-72 border-l bg-white p-4 overflow-y-auto">
              {renderNodeSettings()}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default FlowEditorPage; 