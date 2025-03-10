import React from 'react';

interface ProgressWidgetConfigProps {
  value: any;
  onChange: (value: any) => void;
}

const ProgressWidgetConfig: React.FC<ProgressWidgetConfigProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Progress Widget Configuration</h3>
      <p className="text-sm text-gray-500">Configuration options coming soon</p>
    </div>
  );
};

export default ProgressWidgetConfig; 