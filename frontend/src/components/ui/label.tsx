import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

export const Label: React.FC<LabelProps> = ({ 
  className = '',
  children,
  htmlFor,
  ...props
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}; 