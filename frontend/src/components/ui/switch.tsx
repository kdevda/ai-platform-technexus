import React, { useState } from 'react';

interface SwitchProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({ 
  id,
  checked = false, 
  onCheckedChange,
  className = ''
}) => {
  // Use internal state if no external control is provided
  const [internalChecked, setInternalChecked] = useState(checked);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = onCheckedChange !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    
    // Call external handler if provided
    if (onCheckedChange) {
      onCheckedChange(e.target.checked);
    }
  };

  // Generate a random ID if none is provided
  const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <label 
      htmlFor={switchId}
      className={`relative inline-flex items-center cursor-pointer ${className}`}
    >
      <input
        id={switchId}
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={handleChange}
      />
      <div
        className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
          isChecked ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <div
          className={`absolute left-0.5 top-0.5 bg-white h-5 w-5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
            isChecked ? 'translate-x-5' : 'translate-x-0'
          }`}
        ></div>
      </div>
    </label>
  );
}; 