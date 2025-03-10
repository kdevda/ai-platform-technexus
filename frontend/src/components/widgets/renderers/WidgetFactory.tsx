import React from 'react';
import { Widget } from './BaseWidget';
import TableWidget from './TableWidget';
import FieldWidget from './FieldWidget';
import FlowWidget from './FlowWidget';
import ProgressWidget from './ProgressWidget';

interface WidgetFactoryProps {
  widget: Widget;
  onConfigure?: (widget: Widget) => void;
}

/**
 * WidgetFactory component that renders the appropriate widget component based on widget type
 */
const WidgetFactory: React.FC<WidgetFactoryProps> = ({ widget, onConfigure }) => {
  const handleConfigure = () => {
    if (onConfigure) {
      onConfigure(widget);
    }
  };
  
  // Render the appropriate widget based on type
  switch (widget.type) {
    case 'table':
      return (
        <TableWidget 
          widget={widget as any} 
          onConfigure={handleConfigure} 
        />
      );
    
    case 'field':
      return (
        <FieldWidget 
          widget={widget as any} 
          onConfigure={handleConfigure} 
        />
      );
    
    case 'flow':
      return (
        <FlowWidget 
          widget={widget as any} 
          onConfigure={handleConfigure} 
        />
      );
    
    case 'progress':
      return (
        <ProgressWidget 
          widget={widget as any} 
          onConfigure={handleConfigure} 
        />
      );
    
    default:
      // Fallback for unknown widget types
      return (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-lg font-medium mb-2">{widget.name}</div>
          <div className="text-gray-500">
            Unknown widget type: {widget.type}
          </div>
        </div>
      );
  }
};

export default WidgetFactory; 