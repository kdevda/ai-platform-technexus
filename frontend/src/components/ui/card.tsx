import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ 
  children, 
  className = '' 
}) => {
  return <div className={`p-6 pb-4 ${className}`}>{children}</div>;
};

export const CardTitle: React.FC<CardProps> = ({ 
  children, 
  className = '' 
}) => {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
};

export const CardDescription: React.FC<CardProps> = ({ 
  children, 
  className = '' 
}) => {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
};

export const CardContent: React.FC<CardProps> = ({ 
  children, 
  className = '' 
}) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<CardProps> = ({ 
  children, 
  className = '' 
}) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}; 