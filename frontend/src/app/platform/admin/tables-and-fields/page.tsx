'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import { Toaster, toast } from 'react-hot-toast';
import { Spinner } from '@/components/ui/Spinner';

// API functions
const fetchTables = async (token: string | undefined) => {
  if (!token) throw new Error('Authentication token is required');
  console.log('Fetching tables from:', `${process.env.NEXT_PUBLIC_API_URL}/schema/tables`);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schema/tables`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to fetch tables:', response.status, errorText);
    throw new Error(`Failed to fetch tables: ${response.status} ${errorText}`);
  }
  const data = await response.json();
  console.log('Tables data received:', data);
  return data;
};

const fetchTableFields = async (tableName: string, token: string | undefined) => {
  if (!token) throw new Error('Authentication token is required');
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schema/tables/${tableName}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error(`Failed to fetch fields for table ${tableName}`);
  return response.json();
};

const fetchDataTypes = async (token: string | undefined) => {
  if (!token) throw new Error('Authentication token is required');
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schema/data-types`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch data types');
  return response.json();
};

const createTable = async (tableData: any, token: string | undefined) => {
  if (!token) throw new Error('Authentication token is required');
  console.log('Creating table with data:', tableData);
  console.log('API URL:', `${process.env.NEXT_PUBLIC_API_URL}/schema/tables`);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schema/tables`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(tableData)
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to create table:', response.status, errorText);
    throw new Error(`Failed to create table: ${response.status} ${errorText}`);
  }
  const data = await response.json();
  console.log('Table creation response:', data);
  return data;
};

const updateTable = async (tableName: string, tableData: any, token: string | undefined) => {
  if (!token) throw new Error('Authentication token is required');
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schema/tables/${tableName}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(tableData)
  });
  if (!response.ok) throw new Error('Failed to update table');
  return response.json();
};

const deleteTable = async (tableName: string, token: string | undefined) => {
  if (!token) throw new Error('Authentication token is required');
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schema/tables/${tableName}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to delete table');
  return response.json();
};

const TablesAndFieldsPage: React.FC = () => {
  const { state } = useAuth();
  const token = state.user?.token;
  const [tables, setTables] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [fields, setFields] = useState<any[]>([]);
  const [dataTypes, setDataTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddTableModal, setShowAddTableModal] = useState(false);
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [showEditFieldModal, setShowEditFieldModal] = useState(false);
  const [currentField, setCurrentField] = useState<any>(null);
  const [newTable, setNewTable] = useState({ 
    name: '', 
    description: ''
  });
  const [newField, setNewField] = useState({ 
    name: '', 
    type: 'String', 
    required: false, 
    unique: false, 
    default: '', 
    description: '' 
  });
  const [showRelationshipModal, setShowRelationshipModal] = useState(false);
  const [relationshipConfig, setRelationshipConfig] = useState({
    sourceTable: '',
    targetTable: '',
    relationType: 'oneToMany',
    sourceField: '',
    targetField: '',
    onDelete: 'CASCADE'
  });

  // Fetch tables on component mount
  useEffect(() => {
    const loadTables = async () => {
      try {
        setLoading(true);
        if (!token) {
          setError('Authentication token not found. Please log in again.');
          setLoading(false);
          return;
        }
        const data = await fetchTables(token);
        setTables(data.tables);
        
        // Also fetch data types
        const typesData = await fetchDataTypes(token);
        setDataTypes(typesData.types);
      } catch (err) {
        setError('Failed to load tables');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTables();
  }, [token]);

  // Fetch fields when a table is selected
  useEffect(() => {
    const loadFields = async () => {
      if (!selectedTable || !token) return;
      
      try {
        setLoading(true);
        const data = await fetchTableFields(selectedTable, token);
        setFields(data.fields);
      } catch (err) {
        setError('Failed to load fields');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedTable) {
      loadFields();
    }
  }, [selectedTable, token]);

  // Handle selecting a table to view its fields
  const handleSelectTable = (tableId: string) => {
    setSelectedTable(tableId);
  };

  // Handle adding a new table
  const handleAddTable = () => {
    setShowAddTableModal(true);
  };

  // Handle submitting new table
  const handleSubmitTable = async () => {
    try {
      setLoading(true);
      // Add empty fields array to match backend requirements
      const tableData = {
        ...newTable,
        fields: [
          {
            name: 'id',
            type: 'String',
            isRequired: true,
            isPrimary: true,
            isUnique: true,
            defaultValue: '@default(uuid())'
          }
        ]
      };
      const result = await createTable(tableData, token);
      setTables([...tables, result.table]);
      setNewTable({ name: '', description: '' });
      setShowAddTableModal(false);
      toast.success('Table created successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create table');
      toast.error('Failed to create table');
      console.error('Create table error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new field
  const handleAddField = () => {
    setShowAddFieldModal(true);
  };

  // Handle submitting new field
  const handleSubmitField = async () => {
    try {
      setLoading(true);
      if (!selectedTable) throw new Error('No table selected');
      
      const updatedTable = await updateTable(selectedTable, {
        addField: newField
      }, token);
      
      // Check if updatedTable and updatedTable.fields exist before accessing length
      if (updatedTable && updatedTable.fields && updatedTable.fields.length > 0) {
        setFields([...fields, updatedTable.fields[updatedTable.fields.length - 1]]);
      } else {
        // If we don't have the updated fields from the response, just add the new field to the local state
        setFields([...fields, { ...newField, id: Date.now().toString() }]);
      }
      
      setNewField({ 
        name: '', 
        type: 'String', 
        required: false, 
        unique: false, 
        default: '', 
        description: '' 
      });
      setShowAddFieldModal(false);
      toast.success('Field added successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add field');
      toast.error('Failed to add field');
    } finally {
      setLoading(false);
    }
  };

  // Handle editing a field
  const handleEditField = (field: any) => {
    setCurrentField(field);
    setNewField({ 
      name: field.name, 
      type: field.type, 
      required: field.required, 
      unique: field.unique, 
      default: field.default, 
      description: field.description 
    });
    setShowEditFieldModal(true);
  };

  // Handle updating a field
  const handleUpdateField = async () => {
    try {
      setLoading(true);
      if (!selectedTable) throw new Error('No table selected');
      
      const updatedTable = await updateTable(selectedTable, {
        updateField: {
          oldName: currentField.name,
          ...newField
        }
      }, token);
      
      setFields(updatedTable.fields);
      setShowEditFieldModal(false);
      toast.success('Field updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update field');
      toast.error('Failed to update field');
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a field
  const handleDeleteField = async (fieldName: string) => {
    try {
      setLoading(true);
      if (!selectedTable) throw new Error('No table selected');
      
      const updatedTable = await updateTable(selectedTable, {
        deleteField: fieldName
      }, token);
      
      setFields(updatedTable.fields);
      toast.success('Field deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete field');
      toast.error('Failed to delete field');
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a relationship
  const handleAddRelationship = () => {
    setShowRelationshipModal(true);
  };

  // Handle submitting relationship
  const handleSubmitRelationship = async () => {
    try {
      setLoading(true);
      if (!selectedTable) throw new Error('No table selected');
      
      const updatedTable = await updateTable(selectedTable, {
        addRelationship: relationshipConfig
      }, token);
      
      setFields(updatedTable.fields);
      setShowRelationshipModal(false);
      toast.success('Relationship added successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add relationship');
      toast.error('Failed to add relationship');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <Toaster position="top-right" />
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Tables and Fields Management</h1>
          <button
            onClick={handleAddTable}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            Add New Table
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && (!tables || !tables.length) ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tables List */}
            <div className="col-span-1 bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4 text-black">Tables</h2>
              <div className="space-y-2">
                {tables && tables.map((table) => (
                  <button
                    key={table.name}
                    onClick={() => handleSelectTable(table.name)}
                    className={`w-full text-left px-4 py-2 rounded ${
                      selectedTable === table.name
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-100 text-black'
                    }`}
                  >
                    <div className="font-medium">{table.name}</div>
                    <div className="text-sm opacity-75">{table.description}</div>
                    <div className="text-xs mt-1">
                      {table.fields} fields · {table.recordCount} records
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fields List */}
            <div className="col-span-2 bg-white rounded-lg shadow p-4">
              {selectedTable ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-black">
                      Fields for {selectedTable}
                    </h2>
                    <div className="space-x-2">
                      <button
                        onClick={handleAddField}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                        disabled={loading}
                      >
                        Add Field
                      </button>
                      <button
                        onClick={handleAddRelationship}
                        className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600"
                        disabled={loading}
                      >
                        Add Relationship
                      </button>
                    </div>
                  </div>

                  {loading ? (
                    <div className="flex justify-center items-center h-48">
                      <Spinner size="lg" />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Required
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Unique
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Default
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Description
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {fields.map((field) => (
                            <tr key={field.name}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                {field.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                {field.type}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                {field.required ? 'Yes' : 'No'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                {field.unique ? 'Yes' : 'No'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                {field.default || '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                {field.description || '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => handleEditField(field)}
                                  className="text-blue-600 hover:text-blue-900 mr-3"
                                  disabled={loading}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteField(field.name)}
                                  className="text-red-600 hover:text-red-900"
                                  disabled={loading}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  Select a table to view and manage its fields
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add Table Modal */}
        {showAddTableModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4 text-black">Add New Table</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Table Name
                  </label>
                  <input
                    type="text"
                    value={newTable.name}
                    onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newTable.description}
                    onChange={(e) => setNewTable({ ...newTable, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    rows={3}
                    disabled={loading}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddTableModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitTable}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={loading}
                  >
                    {loading ? 'Adding...' : 'Add Table'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Field Modal */}
        {showAddFieldModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4 text-black">Add New Field</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field Name
                  </label>
                  <input
                    type="text"
                    value={newField.name}
                    onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newField.type}
                    onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    disabled={loading}
                  >
                    {dataTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newField.required}
                      onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                      className="mr-2"
                      disabled={loading}
                    />
                    <span className="text-sm text-gray-700">Required</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newField.unique}
                      onChange={(e) => setNewField({ ...newField, unique: e.target.checked })}
                      className="mr-2"
                      disabled={loading}
                    />
                    <span className="text-sm text-gray-700">Unique</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Value
                  </label>
                  <input
                    type="text"
                    value={newField.default}
                    onChange={(e) => setNewField({ ...newField, default: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newField.description}
                    onChange={(e) => setNewField({ ...newField, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    rows={3}
                    disabled={loading}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddFieldModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitField}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={loading}
                  >
                    {loading ? 'Adding...' : 'Add Field'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Field Modal */}
        {showEditFieldModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4 text-black">Edit Field</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field Name
                  </label>
                  <input
                    type="text"
                    value={newField.name}
                    onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newField.type}
                    onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    disabled={loading}
                  >
                    {dataTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newField.required}
                      onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                      className="mr-2"
                      disabled={loading}
                    />
                    <span className="text-sm text-gray-700">Required</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newField.unique}
                      onChange={(e) => setNewField({ ...newField, unique: e.target.checked })}
                      className="mr-2"
                      disabled={loading}
                    />
                    <span className="text-sm text-gray-700">Unique</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Value
                  </label>
                  <input
                    type="text"
                    value={newField.default}
                    onChange={(e) => setNewField({ ...newField, default: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newField.description}
                    onChange={(e) => setNewField({ ...newField, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    rows={3}
                    disabled={loading}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowEditFieldModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateField}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Field'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Relationship Modal */}
        {showRelationshipModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4 text-black">Add Relationship</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Table
                  </label>
                  <select
                    value={relationshipConfig.targetTable}
                    onChange={(e) =>
                      setRelationshipConfig({
                        ...relationshipConfig,
                        targetTable: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md text-black"
                    disabled={loading}
                  >
                    <option value="">Select a table</option>
                    {tables
                      .filter((t) => t.name !== selectedTable)
                      .map((table) => (
                        <option key={table.name} value={table.name}>
                          {table.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relationship Type
                  </label>
                  <select
                    value={relationshipConfig.relationType}
                    onChange={(e) =>
                      setRelationshipConfig({
                        ...relationshipConfig,
                        relationType: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md text-black"
                    disabled={loading}
                  >
                    <option value="oneToOne">One-to-One</option>
                    <option value="oneToMany">One-to-Many</option>
                    <option value="manyToOne">Many-to-One</option>
                    <option value="manyToMany">Many-to-Many</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    On Delete Behavior
                  </label>
                  <select
                    value={relationshipConfig.onDelete}
                    onChange={(e) =>
                      setRelationshipConfig({
                        ...relationshipConfig,
                        onDelete: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md text-black"
                    disabled={loading}
                  >
                    <option value="CASCADE">Cascade</option>
                    <option value="SET_NULL">Set Null</option>
                    <option value="RESTRICT">Restrict</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowRelationshipModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitRelationship}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={loading}
                  >
                    {loading ? 'Adding...' : 'Add Relationship'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TablesAndFieldsPage; 