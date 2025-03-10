import React, { useState, useEffect } from 'react';
import BaseWidget, { Widget } from './BaseWidget';
import { useAuth } from '@/context/AuthContext';
import { widgetService, TableWidgetSettings } from '@/services/widgetService';

interface TableField {
  fieldId: string;
  fieldName: string;
  position: string;
  viewType: 'condensed' | 'detailed';
}

interface TableWidgetProps {
  widget: Widget & { settings: { table: TableWidgetSettings } };
  onConfigure?: () => void;
}

const TableWidget: React.FC<TableWidgetProps> = ({ widget, onConfigure }) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'condensed' | 'detailed'>(
    widget.settings.table.defaultView || 'condensed'
  );
  
  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the widget service to get data for this table
      const tableData = await widgetService.getTableData(widget.settings.table.tableId);
      setData(tableData);
    } catch (err) {
      console.error('Error fetching table data:', err);
      setError('Failed to load table data');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Toggle between condensed and detailed views
  const toggleView = () => {
    setCurrentView(currentView === 'condensed' ? 'detailed' : 'condensed');
  };
  
  // Get fields ordered by position
  const getOrderedFields = () => {
    return [...widget.settings.table.fields].sort((a, b) => 
      parseInt(a.position) - parseInt(b.position)
    );
  };
  
  // Render table content
  const renderTable = () => {
    const fields = getOrderedFields();
    
    // No fields to display
    if (fields.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          No fields configured for this table widget.
        </div>
      );
    }
    
    // No data to display
    if (data.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          No data available.
        </div>
      );
    }
    
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {fields.map((field) => (
                <th
                  key={field.fieldId}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {field.fieldName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={row.id || rowIndex}>
                {fields.map((field) => {
                  // In a real application, you would match fieldId to the correct property
                  // Here we're just using the fieldId as the property name for demonstration
                  const value = row[field.fieldId.toLowerCase()] || row[field.fieldName.toLowerCase()];
                  
                  return (
                    <td
                      key={`${rowIndex}-${field.fieldId}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  // Additional controls for the widget
  const renderControls = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-medium text-gray-700">
          {widget.settings.table.tableName}
        </h4>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleView}
            className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
          >
            {currentView === 'condensed' ? 'Detailed View' : 'Condensed View'}
          </button>
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
      {renderControls()}
      {renderTable()}
    </BaseWidget>
  );
};

export default TableWidget; 