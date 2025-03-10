import React, { useEffect, useState, useRef } from 'react';

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
  const [activeValue, setActiveValue] = useState(value || defaultValue);
  const tabsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (value) {
      setActiveValue(value);
    }
  }, [value]);

  useEffect(() => {
    // Show the default tab content on initial render
    const tabContents = document.querySelectorAll('[data-tab-content]');
    tabContents.forEach(content => {
      const contentElement = content as HTMLElement;
      if (contentElement.getAttribute('data-tab-value') === activeValue) {
        contentElement.style.display = 'block';
      } else {
        contentElement.style.display = 'none';
      }
    });
  }, [activeValue]);

  useEffect(() => {
    // Add event listener for tab changes
    const handleTabChange = (e: Event) => {
      const customEvent = e as CustomEvent<{value: string}>;
      if (customEvent.detail && customEvent.detail.value) {
        setActiveValue(customEvent.detail.value);
        if (onValueChange) {
          onValueChange(customEvent.detail.value);
        }
      }
    };

    const tabsElement = tabsRef.current;
    if (tabsElement) {
      tabsElement.addEventListener('tabChange', handleTabChange as EventListener);
    }

    return () => {
      if (tabsElement) {
        tabsElement.removeEventListener('tabChange', handleTabChange as EventListener);
      }
    };
  }, [onValueChange]);

  return (
    <div 
      ref={tabsRef}
      className={`${className || ''}`} 
      data-value={activeValue} 
      data-tabs-root
      {...props}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        
        // Handle TabsList
        if (child.type === TabsList) {
          return React.cloneElement(child as React.ReactElement<TabsListProps>, {
            'data-active-tab': activeValue,
          });
        }
        
        // Handle TabsContent
        if (child.type === TabsContent) {
          return React.cloneElement(child as React.ReactElement<TabsContentProps>, {
            style: {
              display: (child.props as TabsContentProps).value === activeValue ? 'block' : 'none',
            },
          });
        }
        
        return child;
      })}
    </div>
  );
};

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-active-tab'?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ 
  className, 
  children,
  'data-active-tab': activeTab,
  ...props 
}) => {
  return (
    <div 
      className={`inline-flex h-14 items-center justify-center rounded-xl bg-gray-100 p-1.5 gap-1 text-gray-600 border-b border-gray-200 ${className || ''}`} 
      data-tabs-list
      {...props}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        
        if (child.type === TabsTrigger) {
          return React.cloneElement(child as React.ReactElement<TabsTriggerProps>, {
            isActive: activeTab === (child.props as TabsTriggerProps).value,
          });
        }
        
        return child;
      })}
    </div>
  );
};

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  isActive?: boolean;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ 
  value,
  className, 
  children,
  isActive,
  ...props 
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tabs = e.currentTarget.closest('[data-tabs-root]');
    if (tabs) {
      const tabsElement = tabs as HTMLElement;
      const currentValue = value;
      tabsElement.setAttribute('data-value', currentValue);
      
      // Find all tab contents and hide/show as needed
      const tabContents = document.querySelectorAll('[data-tab-content]');
      tabContents.forEach(content => {
        const contentElement = content as HTMLElement;
        if (contentElement.getAttribute('data-tab-value') === currentValue) {
          contentElement.style.display = 'block';
        } else {
          contentElement.style.display = 'none';
        }
      });
      
      // Find the Tabs component parent to trigger value change
      const customEvent = new CustomEvent('tabChange', { detail: { value: currentValue } });
      tabsElement.dispatchEvent(customEvent);
      
      // Execute the onClick callback if it exists
      if (props.onClick) {
        props.onClick(e);
      }
    }
  };
  
  return (
    <button 
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-5 py-3 text-sm font-medium transition-all 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 
      disabled:pointer-events-none disabled:opacity-50
      hover:bg-gray-200
      ${isActive 
        ? 'bg-black text-white font-bold shadow-md hover:bg-gray-900' 
        : 'bg-transparent text-gray-600'} 
      ${className || ''}`}
      data-state={isActive ? 'active' : 'inactive'}
      data-tab-trigger={value}
      {...props}
      onClick={handleClick}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-1.5 left-0 right-0 h-1 bg-black rounded-full mx-auto w-2/3" />
      )}
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
  style,
  ...props 
}) => {
  return (
    <div 
      className={`mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 transition-all duration-300 ease-in-out ${className || ''}`} 
      {...props}
      data-tab-content
      data-tab-value={value}
      style={{
        ...style,
        opacity: style?.display === 'none' ? 0 : 1,
        transform: style?.display === 'none' ? 'translateY(10px)' : 'translateY(0)'
      }}
    >
      {children}
    </div>
  );
}; 