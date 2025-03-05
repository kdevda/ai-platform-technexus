import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className = '',
  variant = 'default',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  ...props
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // Size styles
  const sizeStyles = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-6 py-3 text-lg',
    icon: 'h-10 w-10'
  };
  
  // Variant styles
  const variantStyles = {
    default: 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-300',
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-300',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-300',
    outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:text-gray-900 focus-visible:ring-gray-300',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-300',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-300',
    link: 'text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-300 p-0 h-auto'
  };
  
  // Combine styles
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  
  return (
    <button 
      className={buttonStyles} 
      disabled={disabled || isLoading} 
      {...props}
    >
      {isLoading ? (
        <>
          <svg 
            className="mr-2 h-4 w-4 animate-spin" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}; 