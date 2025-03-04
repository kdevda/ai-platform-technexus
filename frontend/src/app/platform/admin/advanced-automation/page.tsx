"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Spinner } from '@/components/ui/Spinner';
import Image from 'next/image';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Node types definition
interface WorkflowNode {
  id: string;
  name: string;
  type: string;
  description: string;
  icon?: string;
  x?: number;
  y?: number;
  isTemplate?: boolean;
  config?: any;
}

interface Edge {
  source: string;
  target: string;
  type?: string;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  status: 'active' | 'draft';
  nodes: WorkflowNode[];
  edges: Edge[];
}

// Node types for the workflow
const NODE_TYPES = {
  TRIGGER: 'trigger',
  ACTION: 'action',
  CONDITION: 'condition',
  DELAY: 'delay',
  EMAIL: 'email',
  DATA: 'data',
  CODE: 'code',
  API: 'api'
};

// Available triggers
const AVAILABLE_TRIGGERS = [
  { id: 'record_create', type: NODE_TYPES.TRIGGER, name: 'Record Created', description: 'Triggered when a new record is created', icon: 'plus-circle' },
  { id: 'record_update', type: NODE_TYPES.TRIGGER, name: 'Record Updated', description: 'Triggered when a record is updated', icon: 'refresh' },
  { id: 'record_delete', type: NODE_TYPES.TRIGGER, name: 'Record Deleted', description: 'Triggered when a record is deleted', icon: 'trash' },
  { id: 'scheduled', type: NODE_TYPES.TRIGGER, name: 'Scheduled', description: 'Triggered at scheduled intervals', icon: 'clock' },
  { id: 'webhook', type: NODE_TYPES.TRIGGER, name: 'Webhook', description: 'Triggered by external webhook', icon: 'link' },
  { id: 'form_submission', type: NODE_TYPES.TRIGGER, name: 'Form Submission', description: 'Triggered when a form is submitted', icon: 'clipboard-list' },
];

// Available actions
const AVAILABLE_ACTIONS = [
  { id: 'send_email', type: NODE_TYPES.EMAIL, name: 'Send Email', description: 'Send an email to users', icon: 'mail' },
  { id: 'update_record', type: NODE_TYPES.ACTION, name: 'Update Record', description: 'Update a record in the database', icon: 'edit' },
  { id: 'create_record', type: NODE_TYPES.ACTION, name: 'Create Record', description: 'Create a new record', icon: 'file-plus' },
  { id: 'delete_record', type: NODE_TYPES.ACTION, name: 'Delete Record', description: 'Delete a record', icon: 'trash-2' },
  { id: 'fetch_data', type: NODE_TYPES.DATA, name: 'Fetch Data', description: 'Fetch data from the database', icon: 'database' },
  { id: 'execute_code', type: NODE_TYPES.CODE, name: 'Execute Code', description: 'Run custom JavaScript code', icon: 'code' },
  { id: 'api_request', type: NODE_TYPES.API, name: 'API Request', description: 'Make an API request', icon: 'server' },
  { id: 'condition', type: NODE_TYPES.CONDITION, name: 'Condition', description: 'Add conditional logic', icon: 'git-branch' },
  { id: 'delay', type: NODE_TYPES.DELAY, name: 'Delay', description: 'Add a time delay', icon: 'clock' },
];

// Sample workflow data 
const SAMPLE_WORKFLOWS = [
  {
    id: '1',
    name: 'Customer Welcome Sequence',
    description: 'Send a series of emails when a new customer signs up',
    lastModified: '2023-08-15T10:30:00Z',
    status: 'active',
    nodes: [],
    edges: []
  },
  {
    id: '2',
    name: 'Loan Approval Process',
    description: 'Automate the loan approval workflow with notifications',
    lastModified: '2023-09-02T14:45:00Z',
    status: 'active',
    nodes: [],
    edges: []
  },
  {
    id: '3',
    name: 'Payment Reminder',
    description: 'Send reminders before payment due dates',
    lastModified: '2023-08-28T09:15:00Z',
    status: 'active',
    nodes: [],
    edges: []
  }
];

// Component for a draggable node
const DraggableNode: React.FC<{ node: WorkflowNode; isTemplate?: boolean }> = ({ node, isTemplate = false }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'node',
    item: { ...node, isTemplate },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Get the right icon based on the node type
  const getIcon = () => {
    const iconName = node.icon || 'square';
    
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {iconName === 'plus-circle' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />}
        {iconName === 'refresh' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />}
        {iconName === 'trash' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />}
        {iconName === 'clock' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
        {iconName === 'link' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />}
        {iconName === 'clipboard-list' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />}
        {iconName === 'mail' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
        {iconName === 'edit' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />}
        {iconName === 'file-plus' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />}
        {iconName === 'trash-2' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />}
        {iconName === 'database' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />}
        {iconName === 'code' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />}
        {iconName === 'server' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />}
        {iconName === 'git-branch' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />}
        {iconName === 'square' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />}
      </svg>
    );
  };

  // Define node appearance based on type
  const getNodeStyle = () => {
    let baseStyle = "flex items-center p-3 rounded-lg shadow-sm border cursor-move";
    
    if (isDragging) {
      baseStyle += " opacity-50";
    }
    
    switch (node.type) {
      case NODE_TYPES.TRIGGER:
        return `${baseStyle} bg-blue-50 border-blue-200 text-blue-700`;
      case NODE_TYPES.ACTION:
        return `${baseStyle} bg-green-50 border-green-200 text-green-700`;
      case NODE_TYPES.CONDITION:
        return `${baseStyle} bg-purple-50 border-purple-200 text-purple-700`;
      case NODE_TYPES.DELAY:
        return `${baseStyle} bg-yellow-50 border-yellow-200 text-yellow-700`;
      case NODE_TYPES.EMAIL:
        return `${baseStyle} bg-red-50 border-red-200 text-red-700`;
      case NODE_TYPES.DATA:
        return `${baseStyle} bg-indigo-50 border-indigo-200 text-indigo-700`;
      case NODE_TYPES.CODE:
        return `${baseStyle} bg-gray-50 border-gray-200 text-gray-700`;
      case NODE_TYPES.API:
        return `${baseStyle} bg-teal-50 border-teal-200 text-teal-700`;
      default:
        return `${baseStyle} bg-gray-50 border-gray-200 text-gray-700`;
    }
  };

  return (
    <div 
      ref={drag}
      className={getNodeStyle()}
      style={{ 
        width: isTemplate ? '200px' : '200px',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="mr-3 flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{node.name}</div>
        {!isTemplate && <div className="text-xs opacity-70">{node.description}</div>}
      </div>
    </div>
  );
};

// Component for the workflow canvas
const WorkflowCanvas: React.FC<{ workflow: Workflow; setWorkflow: React.Dispatch<React.SetStateAction<Workflow>> }> = ({ workflow, setWorkflow }) => {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState(workflow.nodes || []);
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
  const [draggingCanvas, setDraggingCanvas] = useState(false);
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isDrawingEdge, setIsDrawingEdge] = useState(false);
  const [edgeStartNode, setEdgeStartNode] = useState(null);
  const [edges, setEdges] = useState(workflow.edges || []);
  const [tempEdge, setTempEdge] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  // Sync nodes and edges with parent workflow when it changes
  useEffect(() => {
    if (workflow) {
      setNodes(workflow.nodes || []);
      setEdges(workflow.edges || []);
    }
  }, [workflow]);

  // Sync workflow with nodes and edges when they change
  useEffect(() => {
    if (workflow) {
      setWorkflow(prev => ({
        ...prev,
        nodes: nodes,
        edges: edges
      }));
    }
  }, [nodes, edges, setWorkflow]);

  // Handle canvas drag
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && !e.target.closest('.node')) { // Left click on canvas (not node)
      setDraggingCanvas(true);
      setStartDragPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    
    if (draggingCanvas) {
      const dx = e.clientX - startDragPos.x;
      const dy = e.clientY - startDragPos.y;
      setCanvasPosition({
        x: canvasPosition.x + dx,
        y: canvasPosition.y + dy
      });
      setStartDragPos({ x: e.clientX, y: e.clientY });
    }
    
    if (isDrawingEdge && tempEdge) {
      // Update the temporary edge endpoint to mouse position
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (canvasRect) {
        const endX = (e.clientX - canvasRect.left - canvasPosition.x) / zoom;
        const endY = (e.clientY - canvasRect.top - canvasPosition.y) / zoom;
        
        setTempEdge({
          ...tempEdge,
          endX,
          endY
        });
      }
    }
  };

  const handleCanvasMouseUp = () => {
    setDraggingCanvas(false);
    
    // If drawing edge, check if we're over a node and create permanent edge
    if (isDrawingEdge && edgeStartNode) {
      // TODO: Check if mouse is over a valid target node
      // For now, just stop drawing
      setIsDrawingEdge(false);
      setEdgeStartNode(null);
      setTempEdge(null);
    }
  };

  // Handle zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    const deltaZoom = -Math.sign(e.deltaY) * zoomFactor;
    const newZoom = Math.max(0.5, Math.min(2, zoom + deltaZoom));
    setZoom(newZoom);
  };

  // Handle node drop
  const [, drop] = useDrop(() => ({
    accept: 'node',
    drop: (item: any, monitor) => {
      const dropPos = monitor.getClientOffset();
      if (!dropPos || !canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = (dropPos.x - canvasRect.left - canvasPosition.x) / zoom;
      const y = (dropPos.y - canvasRect.top - canvasPosition.y) / zoom;

      if (item.isTemplate) {
        // Add new node to the canvas
        const newNode = {
          ...item,
          id: `${item.id}_${Date.now()}`,
          x: x,
          y: y,
          isTemplate: false,
          config: getDefaultConfigForNodeType(item.type, item.id)
        };
        
        // Important: Use functional updates to ensure we're working with the latest state
        setNodes(prevNodes => [...prevNodes, newNode]);
      } else {
        // Update existing node position
        setNodes(prevNodes => 
          prevNodes.map(node => 
            node.id === item.id 
              ? { ...node, x: x, y: y } 
              : node
          )
        );
      }
    }
  }));

  // Get default configuration fields for a node type
  const getDefaultConfigForNodeType = (nodeType: string, nodeId: string) => {
    switch (nodeType) {
      case NODE_TYPES.TRIGGER:
        return {
          table: '',
          field: '',
          value: '',
          condition: 'equals'
        };
      case NODE_TYPES.ACTION:
        return {
          table: '',
          field: '',
          value: '',
          operation: 'set'
        };
      case NODE_TYPES.EMAIL:
        return {
          to: '',
          subject: '',
          template: '',
          cc: '',
          bcc: ''
        };
      case NODE_TYPES.CONDITION:
        return {
          condition: 'equals',
          field: '',
          value: '',
          table: ''
        };
      case NODE_TYPES.DELAY:
        return {
          duration: 1,
          unit: 'minutes'
        };
      case NODE_TYPES.DATA:
        return {
          table: '',
          filter: '',
          limit: 10
        };
      case NODE_TYPES.CODE:
        return {
          code: '// Write your custom code here\n// Example: return record.status === "active";'
        };
      case NODE_TYPES.API:
        return {
          url: '',
          method: 'GET',
          headers: '',
          body: ''
        };
      default:
        return {};
    }
  };

  // Handle node click for configuration
  const handleNodeClick = (node: WorkflowNode) => {
    setSelectedNode(node);
    setIsConfigModalOpen(true);
  };

  // Handle config save
  const handleSaveConfig = (updatedConfig: any) => {
    if (!selectedNode) return;
    
    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.id === selectedNode.id 
          ? { ...node, config: updatedConfig } 
          : node
      )
    );
    
    setIsConfigModalOpen(false);
  };

  // Draw connections between nodes
  const renderEdges = () => {
    return (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {edges.map((edge, index) => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          const targetNode = nodes.find(n => n.id === edge.target);
          
          if (!sourceNode || !targetNode) return null;
          
          const sourceX = sourceNode.x + 100; // Center of node
          const sourceY = sourceNode.y + 25;
          const targetX = targetNode.x + 100;
          const targetY = targetNode.y + 25;
          
          // Create a bezier curve path
          const dx = Math.abs(targetX - sourceX) * 0.5;
          const path = `M ${sourceX} ${sourceY} C ${sourceX + dx} ${sourceY}, ${targetX - dx} ${targetY}, ${targetX} ${targetY}`;
          
          return (
            <g key={index}>
              <path 
                d={path} 
                stroke="#6b7280" 
                strokeWidth="2" 
                fill="none" 
                strokeDasharray={edge.type === 'condition-false' ? "5,5" : "none"}
              />
              <polygon 
                points={`${targetX},${targetY} ${targetX-8},${targetY-4} ${targetX-8},${targetY+4}`}
                fill="#6b7280"
                transform={`rotate(${Math.atan2(targetY - sourceY, targetX - sourceX) * 180 / Math.PI}, ${targetX}, ${targetY})`}
              />
            </g>
          );
        })}
        
        {tempEdge && (
          <path 
            d={`M ${tempEdge.startX} ${tempEdge.startY} L ${tempEdge.endX} ${tempEdge.endY}`} 
            stroke="#6b7280" 
            strokeWidth="2" 
            fill="none" 
            strokeDasharray="5,5"
          />
        )}
      </svg>
    );
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-gray-50 border border-gray-200 rounded-lg"
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleCanvasMouseUp}
      onWheel={handleWheel}
      ref={drop}
    >
      <div 
        ref={canvasRef}
        className="absolute w-full h-full"
        style={{ 
          transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          backgroundImage: 'radial-gradient(circle, #ddd 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      >
        {renderEdges()}
        
        {nodes.map((node) => (
          <div 
            key={node.id} 
            className="absolute node"
            style={{ left: node.x, top: node.y }}
            onClick={(e) => {
              e.stopPropagation();
              handleNodeClick(node);
            }}
          >
            <DraggableNode node={node} />
          </div>
        ))}
      </div>
      
      {/* Node Configuration Modal */}
      {isConfigModalOpen && selectedNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
             onClick={() => setIsConfigModalOpen(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Configure {selectedNode.name}</h2>
              <button onClick={() => setIsConfigModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <NodeConfigForm 
              node={selectedNode} 
              onSave={handleSaveConfig}
              onCancel={() => setIsConfigModalOpen(false)}
            />
          </div>
        </div>
      )}
      
      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md flex">
        <button 
          className="p-2 hover:bg-gray-100"
          onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <div className="px-2 flex items-center">
          {Math.round(zoom * 100)}%
        </div>
        <button 
          className="p-2 hover:bg-gray-100"
          onClick={() => setZoom(Math.min(2, zoom + 0.1))}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Component to render the configuration form for a node
const NodeConfigForm: React.FC<{ 
  node: WorkflowNode; 
  onSave: (config: any) => void;
  onCancel: () => void;
}> = ({ node, onSave, onCancel }) => {
  const [config, setConfig] = useState(node.config || {});
  
  // Available tables for selection
  const availableTables = [
    { id: 'users', name: 'Users' },
    { id: 'loans', name: 'Loans' },
    { id: 'payments', name: 'Payments' },
    { id: 'applications', name: 'Applications' },
    { id: 'documents', name: 'Documents' }
  ];

  // Available fields for each table
  const tableFields: Record<string, Array<{ id: string, name: string }>> = {
    users: [
      { id: 'id', name: 'ID' },
      { id: 'name', name: 'Name' },
      { id: 'email', name: 'Email' },
      { id: 'role', name: 'Role' },
      { id: 'status', name: 'Status' }
    ],
    loans: [
      { id: 'id', name: 'ID' },
      { id: 'userId', name: 'User ID' },
      { id: 'amount', name: 'Amount' },
      { id: 'status', name: 'Status' },
      { id: 'term', name: 'Term' },
      { id: 'interestRate', name: 'Interest Rate' }
    ],
    payments: [
      { id: 'id', name: 'ID' },
      { id: 'loanId', name: 'Loan ID' },
      { id: 'amount', name: 'Amount' },
      { id: 'status', name: 'Status' },
      { id: 'date', name: 'Date' }
    ],
    applications: [
      { id: 'id', name: 'ID' },
      { id: 'userId', name: 'User ID' },
      { id: 'status', name: 'Status' },
      { id: 'applicationType', name: 'Application Type' }
    ],
    documents: [
      { id: 'id', name: 'ID' },
      { id: 'userId', name: 'User ID' },
      { id: 'type', name: 'Type' },
      { id: 'status', name: 'Status' },
      { id: 'url', name: 'URL' }
    ]
  };

  const handleInputChange = (key: string, value: string) => {
    setConfig({ ...config, [key]: value });
  };

  const renderTriggerConfig = () => {
    if (node.id.startsWith('record_create')) {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Table</label>
            <select 
              className="w-full p-2 border rounded" 
              value={config.table || ''} 
              onChange={(e) => handleInputChange('table', e.target.value)}
            >
              <option value="">Select a table</option>
              {availableTables.map(table => (
                <option key={table.id} value={table.id}>{table.name}</option>
              ))}
            </select>
          </div>
        </div>
      );
    }
    
    if (node.id.startsWith('record_update')) {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Table</label>
            <select 
              className="w-full p-2 border rounded" 
              value={config.table || ''} 
              onChange={(e) => handleInputChange('table', e.target.value)}
            >
              <option value="">Select a table</option>
              {availableTables.map(table => (
                <option key={table.id} value={table.id}>{table.name}</option>
              ))}
            </select>
          </div>
          
          {config.table && (
            <div>
              <label className="block text-sm font-medium mb-1">Field</label>
              <select 
                className="w-full p-2 border rounded" 
                value={config.field || ''} 
                onChange={(e) => handleInputChange('field', e.target.value)}
              >
                <option value="">Select a field</option>
                {tableFields[config.table]?.map(field => (
                  <option key={field.id} value={field.id}>{field.name}</option>
                ))}
              </select>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">Condition</label>
            <select 
              className="w-full p-2 border rounded" 
              value={config.condition || 'equals'} 
              onChange={(e) => handleInputChange('condition', e.target.value)}
            >
              <option value="equals">Equals</option>
              <option value="not_equals">Not Equals</option>
              <option value="contains">Contains</option>
              <option value="greater_than">Greater Than</option>
              <option value="less_than">Less Than</option>
              <option value="is_empty">Is Empty</option>
              <option value="is_not_empty">Is Not Empty</option>
            </select>
          </div>
          
          {config.condition && !['is_empty', 'is_not_empty'].includes(config.condition) && (
            <div>
              <label className="block text-sm font-medium mb-1">Value</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={config.value || ''} 
                onChange={(e) => handleInputChange('value', e.target.value)}
                placeholder="Enter value to compare"
              />
            </div>
          )}
        </div>
      );
    }
    
    if (node.id.startsWith('scheduled')) {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Schedule Type</label>
            <select 
              className="w-full p-2 border rounded" 
              value={config.scheduleType || 'interval'} 
              onChange={(e) => handleInputChange('scheduleType', e.target.value)}
            >
              <option value="interval">Interval</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="cron">Custom (CRON)</option>
            </select>
          </div>
          
          {config.scheduleType === 'interval' && (
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Every</label>
                <input 
                  type="number" 
                  min="1"
                  className="w-full p-2 border rounded" 
                  value={config.interval || 1} 
                  onChange={(e) => handleInputChange('interval', e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Unit</label>
                <select 
                  className="w-full p-2 border rounded" 
                  value={config.unit || 'minutes'} 
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                </select>
              </div>
            </div>
          )}
          
          {config.scheduleType === 'cron' && (
            <div>
              <label className="block text-sm font-medium mb-1">CRON Expression</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={config.cronExpression || ''} 
                onChange={(e) => handleInputChange('cronExpression', e.target.value)}
                placeholder="* * * * *"
              />
              <p className="text-xs text-gray-500 mt-1">Format: minute hour day month weekday</p>
            </div>
          )}
        </div>
      );
    }
    
    // Handle other trigger types
    return (
      <div className="p-4 bg-gray-100 rounded">
        <p>Configure settings for this trigger</p>
      </div>
    );
  };
  
  const renderActionConfig = () => {
    if (node.id.startsWith('send_email')) {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              value={config.to || ''} 
              onChange={(e) => handleInputChange('to', e.target.value)}
              placeholder="recipient@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              value={config.subject || ''} 
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Email subject"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email Template</label>
            <select 
              className="w-full p-2 border rounded" 
              value={config.template || ''} 
              onChange={(e) => handleInputChange('template', e.target.value)}
            >
              <option value="">Select a template</option>
              <option value="welcome">Welcome Email</option>
              <option value="notification">Notification</option>
              <option value="reminder">Payment Reminder</option>
              <option value="confirmation">Confirmation</option>
              <option value="custom">Custom Template</option>
            </select>
          </div>
          
          {config.template === 'custom' && (
            <div>
              <label className="block text-sm font-medium mb-1">Email Body</label>
              <textarea 
                className="w-full p-2 border rounded" 
                rows={5}
                value={config.body || ''} 
                onChange={(e) => handleInputChange('body', e.target.value)}
                placeholder="Enter email content here..."
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">CC</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              value={config.cc || ''} 
              onChange={(e) => handleInputChange('cc', e.target.value)}
              placeholder="cc@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">BCC</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              value={config.bcc || ''} 
              onChange={(e) => handleInputChange('bcc', e.target.value)}
              placeholder="bcc@example.com"
            />
          </div>
        </div>
      );
    }
    
    if (node.id.startsWith('update_record') || node.id.startsWith('create_record')) {
      const isCreate = node.id.startsWith('create_record');
      
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Table</label>
            <select 
              className="w-full p-2 border rounded" 
              value={config.table || ''} 
              onChange={(e) => handleInputChange('table', e.target.value)}
            >
              <option value="">Select a table</option>
              {availableTables.map(table => (
                <option key={table.id} value={table.id}>{table.name}</option>
              ))}
            </select>
          </div>
          
          {!isCreate && config.table && (
            <div>
              <label className="block text-sm font-medium mb-1">Record ID Field</label>
              <select 
                className="w-full p-2 border rounded" 
                value={config.idField || 'id'} 
                onChange={(e) => handleInputChange('idField', e.target.value)}
              >
                <option value="id">ID</option>
                {tableFields[config.table]?.filter(f => f.id !== 'id').map(field => (
                  <option key={field.id} value={field.id}>{field.name}</option>
                ))}
              </select>
            </div>
          )}
          
          {!isCreate && (
            <div>
              <label className="block text-sm font-medium mb-1">Record ID Value</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={config.idValue || ''} 
                onChange={(e) => handleInputChange('idValue', e.target.value)}
                placeholder={isCreate ? "Will be generated automatically" : "Enter record ID"}
                disabled={isCreate}
              />
            </div>
          )}
          
          <hr className="my-2" />
          
          <div className="mb-2">
            <h3 className="font-medium">Fields to {isCreate ? 'Set' : 'Update'}</h3>
          </div>
          
          {config.table && tableFields[config.table]?.map(field => (
            <div key={field.id} className="flex gap-2 items-center">
              <label className="block text-sm font-medium w-1/3">{field.name}</label>
              <input 
                type="text" 
                className="flex-1 p-2 border rounded" 
                value={config[`field_${field.id}`] || ''} 
                onChange={(e) => handleInputChange(`field_${field.id}`, e.target.value)}
                placeholder={`Enter ${field.name.toLowerCase()} value`}
              />
            </div>
          ))}
        </div>
      );
    }
    
    // Handle other action types
    return (
      <div className="p-4 bg-gray-100 rounded">
        <p>Configure settings for this action</p>
      </div>
    );
  };
  
  const renderNodeConfig = () => {
    if (node.type === NODE_TYPES.TRIGGER) {
      return renderTriggerConfig();
    } else if ([NODE_TYPES.ACTION, NODE_TYPES.EMAIL].includes(node.type)) {
      return renderActionConfig();
    } else if (node.type === NODE_TYPES.CONDITION) {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Condition Type</label>
            <select 
              className="w-full p-2 border rounded" 
              value={config.conditionType || 'field'} 
              onChange={(e) => handleInputChange('conditionType', e.target.value)}
            >
              <option value="field">Field Comparison</option>
              <option value="expression">Expression</option>
            </select>
          </div>
          
          {config.conditionType === 'field' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Table</label>
                <select 
                  className="w-full p-2 border rounded" 
                  value={config.table || ''} 
                  onChange={(e) => handleInputChange('table', e.target.value)}
                >
                  <option value="">Select a table</option>
                  {availableTables.map(table => (
                    <option key={table.id} value={table.id}>{table.name}</option>
                  ))}
                </select>
              </div>
              
              {config.table && (
                <div>
                  <label className="block text-sm font-medium mb-1">Field</label>
                  <select 
                    className="w-full p-2 border rounded" 
                    value={config.field || ''} 
                    onChange={(e) => handleInputChange('field', e.target.value)}
                  >
                    <option value="">Select a field</option>
                    {tableFields[config.table]?.map(field => (
                      <option key={field.id} value={field.id}>{field.name}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-1">Operator</label>
                <select 
                  className="w-full p-2 border rounded" 
                  value={config.operator || 'equals'} 
                  onChange={(e) => handleInputChange('operator', e.target.value)}
                >
                  <option value="equals">Equals (==)</option>
                  <option value="not_equals">Not Equals (!=)</option>
                  <option value="greater_than">Greater Than (&gt;)</option>
                  <option value="less_than">Less Than (&lt;)</option>
                  <option value="greater_or_equal">Greater Than or Equal (&gt;=)</option>
                  <option value="less_or_equal">Less Than or Equal (&lt;=)</option>
                  <option value="contains">Contains</option>
                  <option value="starts_with">Starts With</option>
                  <option value="ends_with">Ends With</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Value</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded" 
                  value={config.value || ''} 
                  onChange={(e) => handleInputChange('value', e.target.value)}
                  placeholder="Enter comparison value"
                />
              </div>
            </>
          )}
          
          {config.conditionType === 'expression' && (
            <div>
              <label className="block text-sm font-medium mb-1">Expression</label>
              <textarea 
                className="w-full p-2 border rounded" 
                rows={5}
                value={config.expression || ''} 
                onChange={(e) => handleInputChange('expression', e.target.value)}
                placeholder="Enter JavaScript expression (e.g. record.status === 'active' && record.amount > 1000)"
              />
            </div>
          )}
        </div>
      );
    } else if (node.type === NODE_TYPES.CODE) {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Custom Code</label>
            <textarea 
              className="w-full p-2 border rounded font-mono text-sm" 
              rows={10}
              value={config.code || '// Write your custom code here\n// Example: return record.status === "active";'} 
              onChange={(e) => handleInputChange('code', e.target.value)}
            />
          </div>
        </div>
      );
    }
    
    // Default for other node types
    return (
      <div className="p-4 bg-gray-100 rounded">
        <p>Configure settings for this node type</p>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {renderNodeConfig()}
      
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <button 
          onClick={onCancel} 
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button 
          onClick={() => onSave(config)} 
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};

// Main Advanced Automation component
const AdvancedAutomation: React.FC = () => {
  const { state } = useAuth();
  const [workflows, setWorkflows] = useState<Workflow[]>(SAMPLE_WORKFLOWS);
  const [loading, setLoading] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [newWorkflowDescription, setNewWorkflowDescription] = useState('');
  const [isCanvasMode, setIsCanvasMode] = useState(false);
  const [currentWorkflow, setCurrentWorkflow] = useState<Workflow | null>(null);

  const handleSelectWorkflow = (workflow: Workflow) => {
    setCurrentWorkflow(workflow);
    setIsCanvasMode(true);
  };

  const handleCreateWorkflow = () => {
    if (!newWorkflowName.trim()) return;
    
    const newWorkflow = {
      id: `workflow_${Date.now()}`,
      name: newWorkflowName,
      description: newWorkflowDescription,
      lastModified: new Date().toISOString(),
      status: 'draft',
      nodes: [],
      edges: []
    };
    
    setWorkflows([...workflows, newWorkflow]);
    setNewWorkflowName('');
    setNewWorkflowDescription('');
    setIsWorkflowModalOpen(false);
    setCurrentWorkflow(newWorkflow);
    setIsCanvasMode(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const handleSaveWorkflow = () => {
    try {
      // Update the workflow in the list
      const updatedWorkflows = workflows.map(w => 
        w.id === currentWorkflow.id 
          ? { ...currentWorkflow, lastModified: new Date().toISOString() } 
          : w
      );
      
      setWorkflows(updatedWorkflows);
      
      // Save to localStorage until MongoDB backend is implemented
      try {
        localStorage.setItem('automationWorkflows', JSON.stringify(updatedWorkflows));
        console.log('Workflow saved to local storage:', currentWorkflow);
        
        // Show success indicator/message
        alert('Workflow saved successfully!');
      } catch (storageError) {
        console.warn('Could not save to localStorage:', storageError);
      }
      
      // In a real application, you'd make an API call here
      /*
      const saveToAPI = async () => {
        try {
          const response = await fetch('/api/workflows', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${state.user?.token}`
            },
            body: JSON.stringify(currentWorkflow)
          });
          
          if (!response.ok) {
            throw new Error('Failed to save workflow');
          }
          
          const data = await response.json();
          console.log('Workflow saved:', data);
        } catch (error) {
          console.error('Error saving workflow:', error);
          alert('Failed to save workflow to server. Local changes are preserved.');
        }
      };
      
      saveToAPI();
      */
    } catch (error) {
      console.error('Error saving workflow:', error);
      alert('An error occurred while saving. Please try again.');
    }
  };

  // Load workflows from localStorage on initial render
  useEffect(() => {
    try {
      const savedWorkflows = localStorage.getItem('automationWorkflows');
      if (savedWorkflows) {
        setWorkflows(JSON.parse(savedWorkflows));
      }
    } catch (error) {
      console.warn('Error loading saved workflows:', error);
    }
  }, []);

  return (
    <AdminLayout>
      <DndProvider backend={HTML5Backend}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-black">Advanced Automation</h1>
              <p className="text-black mt-2">
                Create and manage automated workflows for your business processes.
              </p>
            </div>
            {!isCanvasMode && (
              <button
                onClick={() => setIsWorkflowModalOpen(true)}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Workflow
              </button>
            )}
            {isCanvasMode && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsCanvasMode(false)}
                  className="px-4 py-2 border border-gray-300 text-black rounded-md hover:bg-gray-50 transition-colors flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Workflows
                </button>
                <button
                  onClick={handleSaveWorkflow}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Workflow
                </button>
              </div>
            )}
          </div>

          {isCanvasMode ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{currentWorkflow.name}</h2>
                  <p className="text-sm text-gray-600">{currentWorkflow.description}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">Last modified: {formatDate(currentWorkflow.lastModified)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    currentWorkflow.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {currentWorkflow.status.charAt(0).toUpperCase() + currentWorkflow.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="flex h-[calc(100vh-300px)]">
                {/* Left sidebar for node templates */}
                <div className="w-64 border-r border-gray-200 pr-4 overflow-y-auto">
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">Triggers</h3>
                    <div className="space-y-2">
                      {AVAILABLE_TRIGGERS.map((trigger) => (
                        <DraggableNode key={trigger.id} node={trigger} isTemplate={true} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">Actions</h3>
                    <div className="space-y-2">
                      {AVAILABLE_ACTIONS.map((action) => (
                        <DraggableNode key={action.id} node={action} isTemplate={true} />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Main canvas area */}
                <div className="flex-1 pl-4">
                  <WorkflowCanvas 
                    workflow={currentWorkflow}
                    setWorkflow={setCurrentWorkflow}
                  />
                </div>
              </div>
            </div>
          ) : (
            // Workflow list view
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflows.map((workflow) => (
                <div 
                  key={workflow.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all p-5 cursor-pointer"
                  onClick={() => handleSelectWorkflow(workflow)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg text-black">{workflow.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      workflow.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{workflow.description}</p>
                  <div className="flex justify-between items-center pt-2 text-xs text-gray-500 mt-auto">
                    <span>Last modified: {formatDate(workflow.lastModified)}</span>
                    <div className="flex items-center">
                      <span className="mr-2">{workflow.nodes.length} nodes</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create workflow modal */}
        {isWorkflowModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Create New Workflow</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Workflow Name</label>
                <input
                  type="text"
                  value={newWorkflowName}
                  onChange={(e) => setNewWorkflowName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="My Workflow"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newWorkflowDescription}
                  onChange={(e) => setNewWorkflowDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="What does this workflow do?"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsWorkflowModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-black rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateWorkflow}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                  disabled={!newWorkflowName.trim()}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </DndProvider>
    </AdminLayout>
  );
};

export default AdvancedAutomation; 