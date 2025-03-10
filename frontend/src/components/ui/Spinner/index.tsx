import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  
  return (
    <div className={`inline-block animate-spin rounded-full 
      border-t-transparent border-solid border-primary ${sizeClass} ${className}`}
      role="status" aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 