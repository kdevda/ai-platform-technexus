import React from 'react';

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ 
  defaultValue, 
  value, 
  onValueChange,
  className, 
  children, 
  ...props 
}) => {
  return (
    <div className={`${className || ''}`} data-value={value || defaultValue} {...props}>
      {children}
    </div>
  );
};

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList: React.FC<TabsListProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 dark:bg-gray-800 dark:text-gray-400 ${className || ''}`} 
      {...props}
    >
      {children}
    </div>
  );
};

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ 
  value,
  className, 
  children, 
  ...props 
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tabs = e.currentTarget.closest('[data-value]');
    if (tabs) {
      const tabsElement = tabs as HTMLElement;
      tabsElement.setAttribute('data-value', value);
      
      // Find all tab contents and hide/show as needed
      const tabContents = document.querySelectorAll('[data-tab-content]');
      tabContents.forEach(content => {
        const contentElement = content as HTMLElement;
        if (contentElement.getAttribute('data-tab-value') === value) {
          contentElement.style.display = 'block';
        } else {
          contentElement.style.display = 'none';
        }
      });
      
      // Execute the onValueChange callback if it exists
      const onValueChange = props.onClick;
      if (onValueChange) {
        onValueChange(e);
      }
    }
  };
  
  return (
    <button 
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm dark:ring-offset-gray-950 dark:focus-visible:ring-gray-800 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-50 ${className || ''}`} 
      {...props}
      onClick={handleClick}
      data-tab-trigger={value}
    >
      {children}
    </button>
  );
};

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ 
  value,
  className, 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-800 ${className || ''}`} 
      {...props}
      data-tab-content
      data-tab-value={value}
      style={{ display: 'none' }}
    >
      {children}
    </div>
  );
}; 