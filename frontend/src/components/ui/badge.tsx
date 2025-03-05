import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const variantClasses = {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      destructive: 'bg-destructive text-destructive-foreground',
      outline: 'border border-primary text-foreground',
      success: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
    };

    const sizeClasses = {
      sm: 'text-xs px-2 py-0.5 rounded',
      md: 'text-xs px-2.5 py-0.5 rounded-md',
      lg: 'text-sm px-3 py-1 rounded-md'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge }; 