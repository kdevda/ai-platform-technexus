import React from "react";

interface FormProps {
  children: React.ReactNode;
  className?: string;
}

export const Form: React.FC<FormProps> = ({ children, className = "", ...props }) => {
  return <form className={className} {...props}>{children}</form>;
};

interface FormItemProps {
  children: React.ReactNode;
  className?: string;
}

export const FormItem: React.FC<FormItemProps> = ({ 
  children, 
  className = "" 
}) => {
  return <div className={`space-y-2 ${className}`}>{children}</div>;
};

interface FormLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

export const FormLabel: React.FC<FormLabelProps> = ({ 
  children, 
  htmlFor,
  className = "" 
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  );
};

interface FormControlProps {
  children: React.ReactNode;
  className?: string;
}

export const FormControl: React.FC<FormControlProps> = ({ 
  children,
  className = "" 
}) => {
  return <div className={`mt-1 ${className}`}>{children}</div>;
};

interface FormDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const FormDescription: React.FC<FormDescriptionProps> = ({ 
  children,
  className = "" 
}) => {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
};

interface FormMessageProps {
  children?: React.ReactNode;
  className?: string;
}

export const FormMessage: React.FC<FormMessageProps> = ({ 
  children,
  className = "" 
}) => {
  if (!children) return null;

  return (
    <p className={`text-sm font-medium text-red-500 mt-1 ${className}`}>
      {children}
    </p>
  );
};

interface FormFieldProps {
  name: string;
  control: any;
  render: (args: { field: any }) => React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  name, 
  control, 
  render,
  className = "" 
}) => {
  // This is a very simplified implementation
  // In a real project, this would integrate with react-hook-form
  return render({ 
    field: { 
      name,
      value: '', 
      onChange: () => {}, 
      onBlur: () => {},
      ref: () => {}
    } 
  });
}; 