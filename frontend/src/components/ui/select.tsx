import React, { useState, useRef, useEffect } from 'react';

interface SelectProps {
  children: React.ReactNode;
  onValueChange: (value: string) => void;
  defaultValue?: string;
}

export const Select: React.FC<SelectProps> = ({ 
  children, 
  onValueChange, 
  defaultValue 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Extract the options from the children
  const options: {value: string, label: React.ReactNode}[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === SelectContent) {
      React.Children.forEach((child.props as { children: React.ReactNode }).children, (item) => {
        if (React.isValidElement(item) && item.type === SelectItem) {
          options.push({
            value: (item.props as { value: string }).value,
            label: (item.props as { children: React.ReactNode }).children
          });
        }
      });
    }
  });

  // Handle selection change
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
    setIsOpen(false);
  };

  // Get the selected option label
  const getSelectedLabel = () => {
    const option = options.find(opt => opt.value === selectedValue);
    return option ? option.label : "Select an option";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black"
      >
        <span className="text-black">{getSelectedLabel()}</span>
        <svg
          className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg z-10">
          <ul className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// These components are just for structure and are not actually rendered directly
export const SelectTrigger: React.FC<{children: React.ReactNode, className?: string}> = ({ children }) => {
  return <>{children}</>;
};

export const SelectValue: React.FC<{children?: React.ReactNode, placeholder?: string}> = ({ children }) => {
  return <>{children}</>;
};

export const SelectContent: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return <>{children}</>;
};

export const SelectItem: React.FC<{children: React.ReactNode, value: string}> = ({ children }) => {
  return <>{children}</>;
}; 