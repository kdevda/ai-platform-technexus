import React, { useState, useEffect } from 'react';
import BaseWidget, { Widget } from './BaseWidget';
import { useAuth } from '@/context/AuthContext';
import { widgetService, FieldWidgetSettings } from '@/services/widgetService';

interface FieldWidgetProps {
  widget: Widget & { settings: { field: FieldWidgetSettings } };
  onConfigure?: () => void;
}

const FieldWidget: React.FC<FieldWidgetProps> = ({ widget, onConfigure }) => {
  const { state } = useAuth();
  const token = state.user?.token;
  const [fieldValue, setFieldValue] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { settings } = widget;
  const { fieldName, displayOptions, tableId, fieldId } = settings.field;
  
  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the widget service to get data for this field
      const fieldData = await widgetService.getFieldData(tableId, fieldId);
      setFieldValue(fieldData.value);
    } catch (err) {
      console.error('Error fetching field data:', err);
      setError('Failed to load field data');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to format the field value based on field type
  // In a real application, you'd have more sophisticated formatting
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return '-';
    
    return String(value);
  };
  
  // Render field content
  const renderField = () => {
    const { showLabel, labelPosition, emphasize } = displayOptions;
    
    // Style classes for the value display
    const valueClasses = emphasize
      ? 'text-2xl font-semibold text-primary'
      : 'text-xl text-gray-800';
    
    // Layout classes based on label position
    const layoutClasses = labelPosition === 'left'
      ? 'flex items-center'
      : 'flex flex-col';
    
    // Label classes based on position
    const labelClasses = labelPosition === 'left'
      ? 'mr-2 text-gray-500'
      : 'mb-1 text-gray-500';
    
    return (
      <div className={`p-4 ${layoutClasses}`}>
        {showLabel && (
          <div className={labelClasses}>
            {fieldName}:
          </div>
        )}
        <div className={valueClasses}>
          {formatValue(fieldValue)}
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
      {renderField()}
    </BaseWidget>
  );
};

export default FieldWidget; 