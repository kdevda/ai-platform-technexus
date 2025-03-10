import React from 'react';

interface FlowWidgetConfigProps {
  value: any;
  onChange: (value: any) => void;
}

const FlowWidgetConfig: React.FC<FlowWidgetConfigProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Flow Widget Configuration</h3>
      <p className="text-sm text-gray-500">Configuration options coming soon</p>
    </div>
  );
};

export default FlowWidgetConfig; 