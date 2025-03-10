import React from 'react';

interface TableWidgetConfigProps {
  value: any;
  onChange: (value: any) => void;
}

const TableWidgetConfig: React.FC<TableWidgetConfigProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Table Widget Configuration</h3>
      <p className="text-sm text-gray-500">Configuration options coming soon</p>
    </div>
  );
};

export default TableWidgetConfig; 