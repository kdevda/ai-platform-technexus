'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PlatformLayout from '@/components/platform/PlatformLayout';
import WidgetGrid from '@/components/widgets/WidgetGrid';
import { Widget } from '@/components/widgets/renderers/BaseWidget';
import { Button } from '@/components/ui/button';
import { PlusCircle, Settings } from 'lucide-react';

const WidgetsDashboardPage: React.FC = () => {
  const router = useRouter();
  const [activeCollection, setActiveCollection] = useState<string | undefined>(undefined);
  
  // Sample collections
  const collections = [
    { id: 'loans', name: 'Loans Overview' },
    { id: 'payments', name: 'Payments Tracking' },
    { id: 'applications', name: 'Loan Applications' },
    { id: 'analytics', name: 'Analytics' },
  ];
  
  // Navigate to widget configuration page
  const handleConfigureWidget = (widget: Widget) => {
    router.push(`/platform/admin/widget-management/edit/${widget._id}`);
  };
  
  // Navigate to widget management
  const navigateToWidgetManagement = () => {
    router.push('/platform/admin/widget-management');
  };
  
  // Render collection selection tabs
  const renderCollectionTabs = () => {
    return (
      <div className="mb-6">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              !activeCollection 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => setActiveCollection(undefined)}
          >
            All Widgets
          </button>
          
          {collections.map(collection => (
            <button
              key={collection.id}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeCollection === collection.id 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCollection(collection.id)}
            >
              {collection.name}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <PlatformLayout>
      <div className="space-y-4 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Widgets Dashboard</h1>
          
          <Button 
            onClick={navigateToWidgetManagement}
            className="flex items-center"
          >
            <Settings className="h-4 w-4 mr-2" />
            Manage Widgets
          </Button>
        </div>
        
        {renderCollectionTabs()}
        
        <WidgetGrid 
          collection={activeCollection}
          onConfigureWidget={handleConfigureWidget}
        />
      </div>
    </PlatformLayout>
  );
};

export default WidgetsDashboardPage; 