import React, { ReactNode, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Maximize2, Minimize2, Settings, MoreVertical, RefreshCw } from 'lucide-react';

// Common widget interface that all widget types will use
export interface Widget {
  _id: string;
  name: string;
  type: string;
  description?: string;
  collection?: string;
  settings: any;
  created?: string;
  createdBy?: string;
}

interface BaseWidgetProps {
  widget: Widget;
  children: ReactNode;
  onRefresh?: () => void;
  onConfigure?: () => void;
  isConfigurable?: boolean;
  isExpandable?: boolean;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
}

const BaseWidget: React.FC<BaseWidgetProps> = ({
  widget,
  children,
  onRefresh,
  onConfigure,
  isConfigurable = true,
  isExpandable = true,
  className = '',
  isLoading = false,
  error = null
}) => {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };
  
  const handleConfigure = () => {
    if (onConfigure) {
      onConfigure();
    }
    setMenuOpen(false);
  };
  
  // Determine size classes based on expanded state
  const sizeClasses = expanded
    ? 'fixed inset-4 z-50 overflow-auto'
    : 'h-full';
  
  // Error display component
  const ErrorDisplay = () => (
    <div className="flex items-center justify-center h-32 text-red-500">
      <div className="text-center">
        <p>Error loading widget</p>
        {error && <p className="text-sm mt-2">{error}</p>}
        {onRefresh && (
          <button 
            onClick={handleRefresh}
            className="mt-2 text-sm text-blue-500 hover:underline flex items-center justify-center"
          >
            <RefreshCw className="h-3 w-3 mr-1" /> Retry
          </button>
        )}
      </div>
    </div>
  );
  
  // Loading display component
  const LoadingDisplay = () => (
    <div className="flex items-center justify-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
  
  return (
    <Card className={`${sizeClasses} ${className} shadow-md transition-all duration-300`}>
      <CardHeader className="p-4 bg-gray-50 flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">{widget.name}</h3>
          {widget.description && (
            <p className="text-sm text-gray-500">{widget.description}</p>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {onRefresh && (
            <button 
              onClick={handleRefresh}
              className="p-1 hover:bg-gray-200 rounded-full"
              title="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          
          {isExpandable && (
            <button 
              onClick={toggleExpand}
              className="p-1 hover:bg-gray-200 rounded-full"
              title={expanded ? 'Minimize' : 'Maximize'}
            >
              {expanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>
          )}
          
          {isConfigurable && onConfigure && (
            <button 
              onClick={handleConfigure}
              className="p-1 hover:bg-gray-200 rounded-full"
              title="Configure"
            >
              <Settings className="h-4 w-4" />
            </button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className={`p-4 ${expanded ? 'overflow-auto' : ''}`}>
        {isLoading ? (
          <LoadingDisplay />
        ) : error ? (
          <ErrorDisplay />
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
};

export default BaseWidget; 