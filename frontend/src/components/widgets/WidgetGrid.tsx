import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Widget } from './renderers/BaseWidget';
import WidgetFactory from './renderers/WidgetFactory';
import { Spinner } from '@/components/ui/Spinner';
import { widgetService } from '@/services/widgetService';

interface WidgetGridProps {
  collection?: string;
  limit?: number;
  onConfigureWidget?: (widget: Widget) => void;
}

const WidgetGrid: React.FC<WidgetGridProps> = ({ 
  collection, 
  limit,
  onConfigureWidget
}) => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchWidgets();
  }, [collection, limit]);
  
  const fetchWidgets = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the widget service to get widgets
      const widgetsData = await widgetService.getAllWidgets(collection, limit);
      setWidgets(widgetsData || []);
    } catch (err) {
      console.error('Error fetching widgets:', err);
      setError('Failed to load widgets');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>{error}</p>
        <button 
          onClick={fetchWidgets}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }
  
  if (widgets.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No widgets found.</p>
        {collection && (
          <p className="mt-2">Collection: {collection}</p>
        )}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {widgets.map(widget => (
        <div key={widget._id} className="h-full">
          <WidgetFactory 
            widget={widget} 
            onConfigure={onConfigureWidget}
          />
        </div>
      ))}
    </div>
  );
};

export default WidgetGrid; 