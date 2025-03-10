import React, { useState, useEffect } from 'react';
import BaseWidget, { Widget } from './BaseWidget';
import { useAuth } from '@/context/AuthContext';
import { widgetService, ProgressWidgetSettings, ProgressThreshold } from '@/services/widgetService';

interface ProgressWidgetProps {
  widget: Widget & { settings: { progress: ProgressWidgetSettings } };
  onConfigure?: () => void;
}

const ProgressWidget: React.FC<ProgressWidgetProps> = ({ widget, onConfigure }) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get settings from widget
  const { settings } = widget;
  const { minValue, maxValue, thresholds, fieldName, tableId, fieldId } = settings.progress;
  
  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the widget service to get data for this progress
      const value = await widgetService.getProgressData(tableId, fieldId);
      setCurrentValue(value);
    } catch (err) {
      console.error('Error fetching progress data:', err);
      setError('Failed to load progress data');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Calculate percentage for progress bar
  const calculatePercentage = (): number => {
    if (currentValue <= minValue) return 0;
    if (currentValue >= maxValue) return 100;
    
    return ((currentValue - minValue) / (maxValue - minValue)) * 100;
  };
  
  // Get color for current value
  const getColorForValue = (): string => {
    // Default color if no thresholds
    if (!thresholds || thresholds.length === 0) {
      return '#3B82F6'; // Default blue
    }
    
    // Sort thresholds by value ascending
    const sortedThresholds = [...thresholds].sort((a, b) => a.value - b.value);
    
    // Find the highest threshold that's less than or equal to current value
    for (let i = sortedThresholds.length - 1; i >= 0; i--) {
      if (currentValue >= sortedThresholds[i].value) {
        return sortedThresholds[i].color;
      }
    }
    
    // Return first threshold color if none found
    return sortedThresholds[0].color;
  };
  
  // Render progress bar
  const renderProgressBar = () => {
    const percentage = calculatePercentage();
    const color = getColorForValue();
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div 
          className="h-4 rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color 
          }}
        ></div>
      </div>
    );
  };
  
  // Render thresholds markers
  const renderThresholdMarkers = () => {
    if (!thresholds || thresholds.length === 0) return null;
    
    return (
      <div className="relative h-6 mb-2">
        {thresholds.map((threshold: ProgressThreshold, index: number) => {
          // Calculate marker position as percentage of width
          const position = ((threshold.value - minValue) / (maxValue - minValue)) * 100;
          
          // Don't show markers that would be off the scale
          if (position < 0 || position > 100) return null;
          
          return (
            <div 
              key={index}
              className="absolute top-0 w-0.5 h-3 bg-gray-500"
              style={{ 
                left: `${position}%`,
                marginLeft: '-1px'
              }}
              title={`${threshold.value}`}
            />
          );
        })}
      </div>
    );
  };
  
  // Render min and max labels
  const renderMinMaxLabels = () => {
    return (
      <div className="flex justify-between text-xs text-gray-500 px-1">
        <div>{minValue}</div>
        <div>{maxValue}</div>
      </div>
    );
  };
  
  // Render progress content
  const renderProgress = () => {
    return (
      <div className="p-4">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-gray-700">
              {fieldName}
            </div>
            <div className="text-xl font-semibold">
              {currentValue}
            </div>
          </div>
          
          {renderProgressBar()}
          {renderThresholdMarkers()}
          {renderMinMaxLabels()}
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
      {renderProgress()}
    </BaseWidget>
  );
};

export default ProgressWidget; 