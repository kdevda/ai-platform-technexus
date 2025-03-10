'use client';

import React, { useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { XCircle } from 'lucide-react';
import { Widget } from '@/services/widgetService';
import { WidgetPosition } from '@/services/layoutService';

const ITEM_TYPE = 'WIDGET';

// Extend the Widget type to include tableName if needed
interface ExtendedWidget extends Widget {
  tableName?: string;
}

interface DraggableWidgetProps {
  widget: ExtendedWidget;
  isPlaced?: boolean;
}

interface PlacedWidgetProps extends DraggableWidgetProps {
  position: string;
  onRemove: () => void;
}

interface DroppableZoneProps {
  position: string;
  onDrop: (widgetId: string, position: string) => void;
  children?: React.ReactNode;
}

interface LayoutCanvasProps {
  availableWidgets: ExtendedWidget[];
  placedWidgets: WidgetPosition[];
  onUpdateLayout: (widgets: WidgetPosition[]) => void;
}

// Enhanced WidgetPosition to match what we're using in the component
interface EnhancedWidgetPosition extends WidgetPosition {
  position?: string;
}

// Widget that can be dragged from the palette
const DraggableWidget: React.FC<DraggableWidgetProps> = ({ widget, isPlaced = false }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { id: widget._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !isPlaced, // Prevent dragging if it's already placed
  }));

  return (
    <div 
      ref={dragRef as any}  // Use 'any' to bypass the type checking issue
      className={`p-3 mb-2 rounded-md cursor-pointer transition-colors ${
        isPlaced ? 'bg-gray-100 text-gray-500' : 'bg-white border shadow-sm hover:shadow-md'
      } ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="text-sm font-medium">{widget.name}</div>
      <div className="text-xs text-gray-500">{widget.type} - {widget.tableName || 'N/A'}</div>
    </div>
  );
};

// Widget that has been placed on the canvas
const PlacedWidget: React.FC<PlacedWidgetProps> = ({ widget, position, onRemove }) => {
  return (
    <div className="relative p-3 mb-2 bg-white border rounded-md shadow-sm group">
      <button 
        className="absolute top-1 right-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onRemove}
      >
        <XCircle size={18} />
      </button>
      <div className="text-sm font-medium">{widget.name}</div>
      <div className="text-xs text-gray-500">{widget.type} - {widget.tableName || 'N/A'}</div>
      <div className="text-xs text-blue-600 mt-1">Position: {position}</div>
    </div>
  );
};

// Zone where widgets can be dropped
const DroppableZone: React.FC<DroppableZoneProps> = ({ position, onDrop, children }) => {
  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: { id: string }) => {
      onDrop(item.id, position);
      return { position };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div 
      ref={dropRef as any}  // Use 'any' to bypass the type checking issue
      className={`
        p-3 rounded-md min-h-40 transition-colors
        ${isOver && canDrop ? 'bg-blue-50 border-blue-200 border-2' : 'bg-gray-50 border border-dashed'}
      `}
    >
      <div className="text-sm font-medium mb-2 text-gray-700">{position}</div>
      {children}
    </div>
  );
};

// Main canvas component
const LayoutCanvas: React.FC<LayoutCanvasProps> = ({ 
  availableWidgets, 
  placedWidgets,
  onUpdateLayout 
}) => {
  const [placedWidgetIds, setPlacedWidgetIds] = useState<Set<string>>(
    new Set(placedWidgets.map(pw => pw.widgetId))
  );

  // Handle dropping a widget on the canvas
  const handleDrop = (widgetId: string, position: string) => {
    if (placedWidgetIds.has(widgetId)) return; // Skip if already placed
    
    // Create a new widget position with all required properties from WidgetPosition interface
    const newWidgetPosition: WidgetPosition = {
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      widgetId: widgetId,
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      section: position as 'header' | 'left' | 'middle' | 'right',
      position: position // Add position property for our own tracking
    };
    
    const updatedWidgets = [...placedWidgets, newWidgetPosition];
    
    setPlacedWidgetIds(new Set([...placedWidgetIds, widgetId]));
    onUpdateLayout(updatedWidgets);
  };

  // Handle removing a widget from the canvas
  const handleRemoveWidget = (widgetId: string) => {
    const updatedWidgets = placedWidgets.filter(pw => pw.widgetId !== widgetId);
    const updatedIds = new Set(placedWidgetIds);
    updatedIds.delete(widgetId);
    
    setPlacedWidgetIds(updatedIds);
    onUpdateLayout(updatedWidgets);
  };

  // Get widgets for a specific position
  const getWidgetsForPosition = (position: string) => {
    return placedWidgets
      .filter(pw => pw.section === position || pw.position === position)
      .map(pw => {
        const widget = availableWidgets.find(w => w._id === pw.widgetId);
        return widget ? { widget, position: pw.position || pw.section } : null;
      })
      .filter((item): item is { widget: ExtendedWidget; position: string } => item !== null);
  };

  // Get all available widgets that aren't placed yet
  const getAvailableWidgetsForPalette = () => {
    return availableWidgets.filter(w => !placedWidgetIds.has(w._id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Widget Palette */}
        <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="font-medium text-gray-800 mb-3">Available Widgets</h3>
          <div className="max-h-[500px] overflow-y-auto">
            {getAvailableWidgetsForPalette().map(widget => (
              <DraggableWidget key={widget._id} widget={widget} />
            ))}
            {getAvailableWidgetsForPalette().length === 0 && (
              <div className="text-center py-4 text-gray-500 text-sm">
                All widgets have been placed
              </div>
            )}
          </div>
        </div>

        {/* Layout Canvas */}
        <div className="lg:col-span-3">
          <div className="mb-4">
            <DroppableZone position="header" onDrop={handleDrop}>
              {getWidgetsForPosition('header').map(({ widget, position }) => (
                <PlacedWidget 
                  key={widget._id} 
                  widget={widget} 
                  position={position} 
                  onRemove={() => handleRemoveWidget(widget._id)} 
                  isPlaced 
                />
              ))}
            </DroppableZone>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DroppableZone position="left" onDrop={handleDrop}>
              {getWidgetsForPosition('left').map(({ widget, position }) => (
                <PlacedWidget 
                  key={widget._id} 
                  widget={widget} 
                  position={position} 
                  onRemove={() => handleRemoveWidget(widget._id)} 
                  isPlaced 
                />
              ))}
            </DroppableZone>
            
            <DroppableZone position="center" onDrop={handleDrop}>
              {getWidgetsForPosition('center').map(({ widget, position }) => (
                <PlacedWidget 
                  key={widget._id} 
                  widget={widget} 
                  position={position} 
                  onRemove={() => handleRemoveWidget(widget._id)} 
                  isPlaced 
                />
              ))}
            </DroppableZone>
            
            <DroppableZone position="right" onDrop={handleDrop}>
              {getWidgetsForPosition('right').map(({ widget, position }) => (
                <PlacedWidget 
                  key={widget._id} 
                  widget={widget} 
                  position={position} 
                  onRemove={() => handleRemoveWidget(widget._id)} 
                  isPlaced 
                />
              ))}
            </DroppableZone>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default LayoutCanvas; 