import React, { forwardRef } from 'react';

interface ScrollbarProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal' | 'both';
  maxHeight?: string;
  maxWidth?: string;
}

export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
  ({ 
    children, 
    orientation = 'vertical', 
    maxHeight = '100%', 
    maxWidth = '100%',
    className = '', 
    ...props 
  }, ref) => {
    // Base styles
    const baseStyles = 'relative';
    
    // Orientation styles
    const orientationStyles = {
      vertical: 'overflow-y-auto overflow-x-hidden',
      horizontal: 'overflow-x-auto overflow-y-hidden',
      both: 'overflow-auto'
    };
    
    // Scrollbar styles
    const scrollbarStyles = `
      scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
      dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800
    `;
    
    // Combined styles
    const styles = `
      ${baseStyles} 
      ${orientationStyles[orientation]} 
      ${scrollbarStyles} 
      ${className}
    `;
    
    const inlineStyles = {
      maxHeight: maxHeight,
      maxWidth: maxWidth
    };
    
    return (
      <div 
        ref={ref} 
        className={styles} 
        style={inlineStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Scrollbar.displayName = 'Scrollbar'; 