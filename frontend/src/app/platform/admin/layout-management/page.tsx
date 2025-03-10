'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, RefreshCcw, Edit, Trash2, AlertCircle, Loader2, Search, Save } from 'lucide-react';
import { metadataService, DatabaseTable } from '@/services/metadataService';
import { widgetService, Widget } from '@/services/widgetService';
import { layoutService, Layout, WidgetPosition } from '@/services/layoutService';
import LayoutCanvas from '@/components/admin/layouts/LayoutCanvas';

// Optional: Import and install react-dnd package for drag and drop functionality
// Run: npm install react-dnd react-dnd-html5-backend

const LayoutManagementPage: React.FC = () => {
  const { state } = useAuth();
  
  // Tables state
  const [tables, setTables] = useState<DatabaseTable[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<DatabaseTable | null>(null);
  const [tablesLoading, setTablesLoading] = useState(false);
  
  // Layouts state
  const [layouts, setLayouts] = useState<Layout[]>([]);
  const [selectedLayoutId, setSelectedLayoutId] = useState<string>('');
  const [selectedLayout, setSelectedLayout] = useState<Layout | null>(null);
  const [layoutsLoading, setLayoutsLoading] = useState(false);
  
  // Widgets state
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [widgetsLoading, setWidgetsLoading] = useState(false);
  
  // Dialog state
  const [newLayoutDialogOpen, setNewLayoutDialogOpen] = useState(false);
  const [newLayoutName, setNewLayoutName] = useState('');
  const [newLayoutDescription, setNewLayoutDescription] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  
  // Canvas state
  const [currentLayoutWidgets, setCurrentLayoutWidgets] = useState<WidgetPosition[]>([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  
  // Fetch tables
  const fetchTables = useCallback(async () => {
    setTablesLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const fetchedTables = await metadataService.getTables(token || undefined);
      
      // Ensure fetchedTables is an array
      if (Array.isArray(fetchedTables)) {
        setTables(fetchedTables);
      } else if (fetchedTables && typeof fetchedTables === 'object' && 'tables' in fetchedTables) {
        // Handle case where API might return an object with tables property
        setTables(Array.isArray((fetchedTables as any).tables) ? (fetchedTables as any).tables : []);
      } else {
        // Handle unexpected response
        setTables([]);
        console.error('Unexpected response format from getTables:', fetchedTables);
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
      toast.error('Failed to load database tables');
      setTables([]); // Reset to empty array on error
    } finally {
      setTablesLoading(false);
    }
  }, []);
  
  // Fetch widgets
  const fetchWidgets = useCallback(async () => {
    setWidgetsLoading(true);
    try {
      const fetchedWidgets = await widgetService.getAllWidgets();
      setWidgets(fetchedWidgets);
    } catch (error) {
      console.error('Error fetching widgets:', error);
      toast.error('Failed to load widgets');
    } finally {
      setWidgetsLoading(false);
    }
  }, []);
  
  // Fetch layouts for selected table
  const fetchLayoutsForTable = useCallback(async (tableId: string) => {
    if (!tableId) return;
    
    setLayoutsLoading(true);
    try {
      const fetchedLayouts = await layoutService.getLayoutsByTable(tableId);
      setLayouts(fetchedLayouts);
      
      // Select the default layout if available
      const defaultLayout = fetchedLayouts.find(l => l.isDefault);
      if (defaultLayout) {
        setSelectedLayoutId(defaultLayout._id);
        setSelectedLayout(defaultLayout);
        setCurrentLayoutWidgets(defaultLayout.widgets);
      } else if (fetchedLayouts.length > 0) {
        setSelectedLayoutId(fetchedLayouts[0]._id);
        setSelectedLayout(fetchedLayouts[0]);
        setCurrentLayoutWidgets(fetchedLayouts[0].widgets);
      } else {
        setSelectedLayoutId('');
        setSelectedLayout(null);
        setCurrentLayoutWidgets([]);
      }
    } catch (error) {
      console.error('Error fetching layouts:', error);
      toast.error('Failed to load layouts for the selected table');
    } finally {
      setLayoutsLoading(false);
    }
  }, []);
  
  // Initial load
  useEffect(() => {
    fetchTables();
    fetchWidgets();
  }, [fetchTables, fetchWidgets]);
  
  // Load layouts when table changes
  useEffect(() => {
    if (selectedTableId) {
      fetchLayoutsForTable(selectedTableId);
      const table = tables.find(t => t.id === selectedTableId) || null;
      setSelectedTable(table);
    }
  }, [selectedTableId, tables, fetchLayoutsForTable]);
  
  // Handle creating a new layout
  const handleCreateLayout = async () => {
    if (!selectedTableId || !newLayoutName.trim()) {
      toast.error('Table and layout name are required');
      return;
    }
    
    setSaveLoading(true);
    try {
      const table = tables.find(t => t.id === selectedTableId);
      if (!table) {
        throw new Error('Selected table not found');
      }
      
      const newLayout = await layoutService.createLayout({
        name: newLayoutName.trim(),
        tableId: selectedTableId,
        tableName: table.name,
        description: newLayoutDescription.trim() || undefined,
        widgets: [],
        isDefault: isDefault && layouts.length === 0, // Make default if it's the first layout
      });
      
      setLayouts(prev => [...prev, newLayout]);
      setSelectedLayoutId(newLayout._id);
      setSelectedLayout(newLayout);
      setCurrentLayoutWidgets([]);
      
      toast.success('New layout created');
      setNewLayoutDialogOpen(false);
      resetNewLayoutForm();
    } catch (error) {
      console.error('Error creating layout:', error);
      toast.error('Failed to create layout');
    } finally {
      setSaveLoading(false);
    }
  };
  
  // Handle deleting a layout
  const handleDeleteLayout = async (layoutId: string) => {
    if (!window.confirm('Are you sure you want to delete this layout?')) {
      return;
    }
    
    try {
      await layoutService.deleteLayout(layoutId);
      setLayouts(prev => prev.filter(l => l._id !== layoutId));
      
      if (selectedLayoutId === layoutId) {
        if (layouts.length > 1) {
          const remainingLayouts = layouts.filter(l => l._id !== layoutId);
          setSelectedLayoutId(remainingLayouts[0]._id);
          setSelectedLayout(remainingLayouts[0]);
          setCurrentLayoutWidgets(remainingLayouts[0].widgets);
        } else {
          setSelectedLayoutId('');
          setSelectedLayout(null);
          setCurrentLayoutWidgets([]);
        }
      }
      
      toast.success('Layout deleted');
    } catch (error) {
      console.error('Error deleting layout:', error);
      toast.error('Failed to delete layout');
    }
  };
  
  // Handle setting a layout as default
  const handleSetAsDefault = async (layoutId: string) => {
    try {
      const updatedLayout = await layoutService.setAsDefault(layoutId);
      
      // Update layouts in state
      setLayouts(prev => prev.map(l => ({
        ...l,
        isDefault: l._id === layoutId
      })));
      
      toast.success('Default layout updated');
    } catch (error) {
      console.error('Error setting default layout:', error);
      toast.error('Failed to update default layout');
    }
  };
  
  // Handle layout widget changes
  const handleUpdateLayoutWidgets = (updatedWidgets: WidgetPosition[]) => {
    setCurrentLayoutWidgets(updatedWidgets);
    setUnsavedChanges(true);
  };
  
  // Save the current layout
  const handleSaveLayout = async () => {
    if (!selectedLayoutId) return;
    
    try {
      await layoutService.updateLayout(selectedLayoutId, {
        widgets: currentLayoutWidgets
      });
      
      // Update the layout in state
      setLayouts(prev => prev.map(l => 
        l._id === selectedLayoutId 
          ? { ...l, widgets: currentLayoutWidgets } 
          : l
      ));
      
      if (selectedLayout) {
        setSelectedLayout({
          ...selectedLayout,
          widgets: currentLayoutWidgets
        });
      }
      
      setUnsavedChanges(false);
      toast.success('Layout saved successfully');
    } catch (error) {
      console.error('Error saving layout:', error);
      toast.error('Failed to save layout');
    }
  };
  
  // Refresh button handler
  const handleRefresh = () => {
    fetchTables();
    fetchWidgets();
    if (selectedTableId) {
      fetchLayoutsForTable(selectedTableId);
    }
  };
  
  // Reset the new layout form
  const resetNewLayoutForm = () => {
    setNewLayoutName('');
    setNewLayoutDescription('');
    setIsDefault(false);
  };
  
  // Handle selecting a layout
  const handleSelectLayout = (layoutId: string) => {
    if (!layoutId) return;
    
    if (unsavedChanges) {
      if (!window.confirm('You have unsaved changes. Do you want to discard them?')) {
        return;
      }
    }
    
    const layout = Array.isArray(layouts) ? layouts.find(l => l._id === layoutId) : null;
    setSelectedLayoutId(layoutId);
    setSelectedLayout(layout || null); // Ensure we never pass undefined
    
    // Make sure we have widget data
    if (layout && Array.isArray(layout.widgets)) {
      setCurrentLayoutWidgets(layout.widgets);
    } else {
      setCurrentLayoutWidgets([]);
    }
    
    setUnsavedChanges(false);
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <Toaster />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-black mb-1">Layout Management</h1>
            <p className="text-gray-600">Create and manage layouts for table displays</p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="flex items-center"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <Button 
              onClick={() => setNewLayoutDialogOpen(true)}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!selectedTableId}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Layout
            </Button>
          </div>
        </div>
        
        {/* Table Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-black">Select Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <Label htmlFor="table-select" className="text-black mb-2 block">
                  Database Table
                </Label>
                {tablesLoading ? (
                  <div className="h-10 flex items-center text-gray-500">
                    <RefreshCcw className="h-4 w-4 animate-spin mr-2" />
                    Loading tables...
                  </div>
                ) : (
                  <Select
                    defaultValue={selectedTableId}
                    onValueChange={setSelectedTableId}
                  >
                    <SelectTrigger className="text-black">
                      <SelectValue placeholder="Select a table" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(tables) && tables.length > 0 ? (
                        tables.map(table => (
                          <SelectItem key={table.id} value={table.id}>
                            {table.displayName || table.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-tables">No tables available</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              </div>
              
              {selectedTableId && (
                <div className="w-full md:w-1/3">
                  <Label htmlFor="layout-select" className="text-black mb-2 block">
                    Layout
                  </Label>
                  {layoutsLoading ? (
                    <div className="h-10 flex items-center text-gray-500">
                      <RefreshCcw className="h-4 w-4 animate-spin mr-2" />
                      Loading layouts...
                    </div>
                  ) : Array.isArray(layouts) && layouts.length > 0 ? (
                    <Select
                      defaultValue={selectedLayoutId}
                      onValueChange={handleSelectLayout}
                    >
                      <SelectTrigger className="text-black">
                        <SelectValue placeholder="Select a layout" />
                      </SelectTrigger>
                      <SelectContent>
                        {layouts.map(layout => (
                          <SelectItem key={layout._id} value={layout._id}>
                            {layout.name} {layout.isDefault ? '(Default)' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="h-10 flex items-center text-gray-500">
                      No layouts found for this table
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Layout Canvas */}
        {selectedTableId && selectedLayoutId && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">
                Canvas: {selectedLayout?.name || 'Untitled Layout'}
              </h2>
              
              <div className="flex space-x-2">
                {selectedLayout?.isDefault ? (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
                    Default Layout
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetAsDefault(selectedLayoutId)}
                  >
                    Set as Default
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => handleDeleteLayout(selectedLayoutId)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
                
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleSaveLayout}
                  disabled={!unsavedChanges}
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save Changes
                </Button>
              </div>
            </div>
            
            {/* Widgets Canvas */}
            <div className="border rounded-md p-4 bg-white">
              <h3 className="font-medium text-black mb-4">
                Drag and drop widgets to create your layout
              </h3>
              
              {widgetsLoading ? (
                <div className="flex items-center justify-center h-60">
                  <RefreshCcw className="h-6 w-6 animate-spin text-blue-600" />
                  <span className="ml-2 text-blue-600">Loading widgets...</span>
                </div>
              ) : widgets.length === 0 ? (
                <div className="flex items-center justify-center h-60 border border-dashed rounded-md">
                  <div className="text-center">
                    <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                    <p className="text-gray-700">No widgets available</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Create widgets in the Widget Management section first
                    </p>
                  </div>
                </div>
              ) : (
                <LayoutCanvas
                  availableWidgets={widgets}
                  placedWidgets={currentLayoutWidgets}
                  onUpdateLayout={handleUpdateLayoutWidgets}
                />
              )}
            </div>
          </div>
        )}
        
        {/* New Layout Dialog */}
        <Dialog open={newLayoutDialogOpen} onOpenChange={setNewLayoutDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-black">Create New Layout</DialogTitle>
              <DialogDescription>
                Create a new layout for the selected table
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-black">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newLayoutName}
                  onChange={(e) => setNewLayoutName(e.target.value)}
                  className="col-span-3 text-black"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right text-black">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newLayoutDescription}
                  onChange={(e) => setNewLayoutDescription(e.target.value)}
                  className="col-span-3 text-black"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="default" className="text-right text-black">
                  Default
                </Label>
                <div className="col-span-3 flex items-center">
                  <input
                    type="checkbox"
                    id="default"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Set as default layout for this table
                  </span>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setNewLayoutDialogOpen(false);
                  resetNewLayoutForm();
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleCreateLayout}
                disabled={saveLoading || !newLayoutName.trim()}
              >
                {saveLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Layout'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default LayoutManagementPage; 