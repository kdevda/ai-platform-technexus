import React from 'react';

interface FieldWidgetConfigProps {
  value: any;
  onChange: (value: any) => void;
}

const FieldWidgetConfig: React.FC<FieldWidgetConfigProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Field Widget Configuration</h3>
      <p className="text-sm text-gray-500">Configuration options coming soon</p>
    </div>
  );
};

export default FieldWidgetConfig; 