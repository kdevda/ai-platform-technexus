import React from 'react';

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

interface RadioGroupItemProps {
  value: string;
  id?: string;
  checked?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onValueChange,
  className = '',
  children,
}) => {
  return (
    <div className={`flex ${className}`} role="radiogroup">
      {React.Children.map(children, (child) => {
        if (React.isValidElement<RadioGroupItemProps>(child)) {
          return React.cloneElement(child, {
            checked: child.props.value === value,
            onSelect: () => onValueChange(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
};

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  value,
  id,
  checked = false,
  onSelect,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      id={id}
      disabled={disabled}
      onClick={!disabled ? onSelect : undefined}
      className={`
        relative h-4 w-4 rounded-full border 
        ${checked ? 'border-primary' : 'border-gray-300'} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {checked && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-primary" />
        </span>
      )}
    </button>
  );
}; 