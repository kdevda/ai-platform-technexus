import React, { useState, useEffect } from 'react';
import BaseWidget, { Widget } from './BaseWidget';
import { useAuth } from '@/context/AuthContext';
import { widgetService, FlowWidgetSettings, FlowStage } from '@/services/widgetService';

interface FlowWidgetProps {
  widget: Widget & { settings: { flow: FlowWidgetSettings } };
  onConfigure?: () => void;
}

const FlowWidget: React.FC<FlowWidgetProps> = ({ widget, onConfigure }) => {
  const [flowData, setFlowData] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get settings from widget
  const { settings } = widget;
  const { stages, tableId, fieldId } = settings.flow;
  
  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the widget service to get data for this flow
      const data = await widgetService.getFlowData(tableId, fieldId);
      
      // Initialize all stages with 0 to ensure they show up even if no data
      const statusCounts: Record<string, number> = {};
      stages.forEach((stage: FlowStage) => {
        statusCounts[stage.value] = data[stage.value] || 0;
      });
      
      setFlowData(statusCounts);
    } catch (err) {
      console.error('Error fetching flow data:', err);
      setError('Failed to load flow data');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Find a stage by its value
  const findStage = (value: string): FlowStage | undefined => {
    return stages.find((stage: FlowStage) => stage.value === value);
  };
  
  // Get total count of all items
  const getTotalCount = (): number => {
    return Object.values(flowData).reduce((sum, count) => sum + count, 0);
  };
  
  // Render stage as part of the flow
  const renderStage = (stage: FlowStage, index: number) => {
    const count = flowData[stage.value] || 0;
    const total = getTotalCount();
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    
    // Minimum width for visibility
    const width = percentage > 0 ? Math.max(percentage, 5) : 0;
    
    return (
      <div key={stage.value} className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: stage.color }}
            ></div>
            <span>{stage.label}</span>
          </div>
          <div className="text-gray-600">
            {count} ({percentage}%)
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full" 
            style={{ 
              width: `${width}%`, 
              backgroundColor: stage.color 
            }}
          ></div>
        </div>
      </div>
    );
  };
  
  // Render as a flow/path
  const renderFlow = () => {
    if (stages.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          No stages configured for this flow widget.
        </div>
      );
    }
    
    return (
      <div className="p-4">
        <div className="mb-4 text-sm font-medium text-gray-700">
          {settings.flow.fieldName} Distribution
        </div>
        
        <div className="space-y-2">
          {stages.map((stage: FlowStage, index: number) => renderStage(stage, index))}
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          Total: {getTotalCount()}
        </div>
      </div>
    );
  };
  
  return (
    <BaseWidget
      widget={widget}
      onRefresh={fetchData}
      onConfigure={onConfigure}
      isLoading={isLoading}
      error={error}
    >
      {renderFlow()}
    </BaseWidget>
  );
};

export default FlowWidget; 