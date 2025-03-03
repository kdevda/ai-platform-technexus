'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

// Sample permissions for the permissions tab
const availablePermissions = [
  { id: 'view', name: 'View', description: 'Can view data' },
  { id: 'create', name: 'Create', description: 'Can create new records' },
  { id: 'edit', name: 'Edit', description: 'Can edit existing records' },
  { id: 'delete', name: 'Delete', description: 'Can delete records' },
  { id: 'approve', name: 'Approve', description: 'Can approve requests' },
  { id: 'manage_users', name: 'Manage Users', description: 'Can manage user accounts' },
  { id: 'manage_roles', name: 'Manage Roles', description: 'Can manage roles and permissions' },
  { id: 'export', name: 'Export Data', description: 'Can export data from the system' },
  { id: 'import', name: 'Import Data', description: 'Can import data into the system' },
  { id: 'configure', name: 'Configure System', description: 'Can modify system configurations' },
];

const RoleManagementPage: React.FC = () => {
  const { state } = useAuth();
  const token = state.user?.token;
  const [roles, setRoles] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<any>(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });
  const [activeTab, setActiveTab] = useState('general');
  const [tables, setTables] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableFields, setTableFields] = useState<any[]>([]);
  const [tablePermissions, setTablePermissions] = useState<any[]>([]);
  const [fieldPermissions, setFieldPermissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch roles from the database
  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch roles');
      const data = await response.json();
      
      // Map roles to the format expected by the UI
      const formattedRoles = data.map((role: any) => ({
        id: role.id,
        name: role.name,
        description: role.description,
        permissions: role.permissions || [],
        userCount: role.userCount || 0
      }));
      
      setRoles(formattedRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load roles when component mounts
  useEffect(() => {
    if (token) {
      fetchRoles();
    }
  }, [token]);

  // Fetch tables for permissions
  const fetchTables = async () => {
    if (!currentRole || !token) return;
    
    setLoading(true);
    try {
      // Call the actual API endpoint to get tables with permissions
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/permissions/tables/${currentRole.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to fetch tables: ${response.status} ${errorText}`);
        throw new Error('Failed to fetch tables');
      }
      
      const data = await response.json();
      
      if (!data || !Array.isArray(data)) {
        console.error('Invalid data format received:', data);
        throw new Error('Invalid data format received');
      }
      
      setTables(data);
      setTablePermissions(data.map((table: any) => ({
        tableId: table.id,
        tableName: table.name,
        ...table.permissions
      })));
    } catch (error) {
      console.error('Error fetching tables:', error);
      // Fallback to schema/tables endpoint if permission endpoint fails
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schema/tables`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to fetch tables (fallback): ${response.status} ${errorText}`);
          throw new Error('Failed to fetch tables');
        }
        
        const data = await response.json();
        
        if (!data || !Array.isArray(data)) {
          console.error('Invalid data format received (fallback):', data);
          throw new Error('Invalid data format received');
        }
        
        // Set tables with default permissions
        const tablesWithPermissions = data.map((table: any) => ({
          ...table,
          permissions: {
            canRead: false,
            canCreate: false,
            canUpdate: false,
            canDelete: false
          }
        }));
        
        setTables(tablesWithPermissions);
        setTablePermissions(tablesWithPermissions.map((table: any) => ({
          tableId: table.id,
          tableName: table.name,
          ...table.permissions
        })));
      } catch (fallbackError) {
        console.error('Error fetching tables (fallback):', fallbackError);
        
        // Set empty data when both API calls fail
        setTables([]);
        setTablePermissions([]);
        toast.error('Failed to load tables. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch fields for a selected table
  const fetchTableFields = async (tableName: string) => {
    if (!currentRole || !token) return;
    
    setLoading(true);
    try {
      // Call the actual API endpoint to get fields with permissions
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/permissions/fields/${currentRole.id}/${tableName}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to fetch fields: ${response.status} ${errorText}`);
        throw new Error('Failed to fetch fields');
      }
      
      const data = await response.json();
      
      if (!data || !Array.isArray(data)) {
        console.error('Invalid data format received for fields:', data);
        throw new Error('Invalid field data format received');
      }
      
      setTableFields(data);
      setFieldPermissions(data.map((field: any) => ({
        fieldId: field.id || field.name,
        fieldName: field.name,
        tableName,
        ...field.permissions
      })));
    } catch (error) {
      console.error('Error fetching fields:', error);
      // Fallback to schema/tables/fields endpoint if permission endpoint fails
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schema/tables/${tableName}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to fetch fields (fallback): ${response.status} ${errorText}`);
          throw new Error('Failed to fetch fields');
        }
        
        const tableData = await response.json();
        
        if (!tableData || !tableData.fields || !Array.isArray(tableData.fields)) {
          console.error('Invalid data format received for fields (fallback):', tableData);
          throw new Error('Invalid field data format received');
        }
        
        // Set fields with default permissions
        const fieldsWithPermissions = tableData.fields.map((field: any) => ({
          ...field,
          permissions: {
            canRead: false,
            canUpdate: false
          }
        }));
        
        setTableFields(fieldsWithPermissions);
        setFieldPermissions(fieldsWithPermissions.map((field: any) => ({
          fieldId: field.id || field.name,
          fieldName: field.name,
          tableName,
          ...field.permissions
        })));
      } catch (fallbackError) {
        console.error('Error fetching fields (fallback):', fallbackError);
        
        // Set empty data when both API calls fail
        setTableFields([]);
        setFieldPermissions([]);
        toast.error('Failed to load field data. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Load table data when the edit modal is opened or tab changes
  useEffect(() => {
    if (isEditModalOpen && activeTab === 'tableAccess' && token) {
      fetchTables();
    }
  }, [isEditModalOpen, activeTab, token]);

  // Load field data when a table is selected
  useEffect(() => {
    if (selectedTable && token) {
      fetchTableFields(selectedTable);
    } else {
      setTableFields([]);
      setFieldPermissions([]);
    }
  }, [selectedTable, token]);

  // Handle table permission change
  const handleTablePermissionChange = async (tableName: string, permission: string, value: boolean) => {
    if (!currentRole || !token) return;
    
    // Update local state first for immediate UI feedback
    const updatedPermissions = tablePermissions.map(perm => 
      perm.tableName === tableName ? { ...perm, [permission]: value } : perm
    );
    setTablePermissions(updatedPermissions);
    
    // Prepare permission data
    const permData = updatedPermissions.find(p => p.tableName === tableName);
    if (!permData) return;
    
    try {
      // Save to database
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/permissions/tables/${currentRole.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tableName: permData.tableName,
          canRead: permData.canRead,
          canCreate: permData.canCreate,
          canUpdate: permData.canUpdate,
          canDelete: permData.canDelete
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update table permission');
      }
    } catch (error) {
      console.error('Error updating table permission:', error);
      // Revert local state if API call fails
      fetchTables();
    }
  };

  // Handle field permission change
  const handleFieldPermissionChange = async (fieldName: string, permission: string, value: boolean) => {
    if (!currentRole || !selectedTable || !token) return;
    
    // Update local state first for immediate UI feedback
    const updatedPermissions = fieldPermissions.map(perm => 
      perm.fieldName === fieldName ? { ...perm, [permission]: value } : perm
    );
    setFieldPermissions(updatedPermissions);
    
    // Prepare permission data
    const permData = updatedPermissions.find(p => p.fieldName === fieldName);
    if (!permData) return;
    
    try {
      // Save to database
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/permissions/fields/${currentRole.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tableName: selectedTable,
          fieldName: permData.fieldName,
          canRead: permData.canRead,
          canUpdate: permData.canUpdate
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update field permission');
      }
    } catch (error) {
      console.error('Error updating field permission:', error);
      // Revert local state if API call fails
      if (selectedTable) fetchTableFields(selectedTable);
    }
  };

  // Handle opening the add role modal
  const handleAddRole = () => {
    setNewRole({
      name: '',
      description: '',
      permissions: []
    });
    setIsAddModalOpen(true);
  };

  // Handle opening the edit role modal
  const handleEditRole = (role: any) => {
    setCurrentRole(role);
    setNewRole({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions]
    });
    setActiveTab('general');
    setSelectedTable(null);
    setIsEditModalOpen(true);
  };

  // Handle opening the delete role modal
  const handleDeleteRole = (role: any) => {
    setCurrentRole(role);
    setIsDeleteModalOpen(true);
  };

  // Handle form submission for adding a new role
  const handleAddRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newRole)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add role');
      }
      
      // Refresh roles list and close modal
      await fetchRoles();
      setIsAddModalOpen(false);
      setNewRole({
        name: '',
        description: '',
        permissions: []
      });
    } catch (error) {
      console.error('Error adding role:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for editing a role
  const handleEditRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentRole || !token) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles/${currentRole.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: currentRole.name,
          description: currentRole.description,
          permissions: currentRole.permissions
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update role');
      }
      
      // Refresh roles list and close modal
      await fetchRoles();
      setIsEditModalOpen(false);
      setCurrentRole(null);
      setActiveTab('general');
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete role
  const handleDeleteRoleSubmit = async () => {
    if (!currentRole || !token) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles/${currentRole.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete role');
      }
      
      // Refresh roles list and close modal
      await fetchRoles();
      setIsDeleteModalOpen(false);
      setCurrentRole(null);
    } catch (error) {
      console.error('Error deleting role:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle permission checkbox change
  const handlePermissionChange = (permissionId: string) => {
    if (newRole.permissions.includes(permissionId)) {
      setNewRole({
        ...newRole,
        permissions: newRole.permissions.filter(id => id !== permissionId)
      });
    } else {
      setNewRole({
        ...newRole,
        permissions: [...newRole.permissions, permissionId]
      });
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <Toaster position="top-right" />
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Role Management</h1>
          <button
            onClick={handleAddRole}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Role
          </button>
        </div>

        {/* Roles Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permissions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map((role) => (
                <tr key={role.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{role.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{role.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission: string) => (
                        <span 
                          key={permission} 
                          className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{role.userCount} users</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEditRole(role)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteRole(role)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Role Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Add New Role</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roleName">
                  Role Name
                </label>
                <input
                  id="roleName"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter role name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roleDescription">
                  Description
                </label>
                <textarea
                  id="roleDescription"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter role description"
                  rows={3}
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Permissions
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-start">
                      <input
                        id={`permission-${permission.id}`}
                        type="checkbox"
                        className="mt-1 mr-2"
                        checked={newRole.permissions.includes(permission.id)}
                        onChange={() => handlePermissionChange(permission.id)}
                      />
                      <label htmlFor={`permission-${permission.id}`} className="text-sm">
                        <div className="font-medium">{permission.name}</div>
                        <div className="text-gray-500 text-xs">{permission.description}</div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRoleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={!newRole.name}
                >
                  Save Role
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Role Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Edit Role</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex">
                  <button
                    onClick={() => setActiveTab('general')}
                    className={`py-2 px-4 ${
                      activeTab === 'general'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    General
                  </button>
                  <button
                    onClick={() => setActiveTab('permissions')}
                    className={`py-2 px-4 ${
                      activeTab === 'permissions'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Permissions
                  </button>
                  <button
                    onClick={() => setActiveTab('tableAccess')}
                    className={`py-2 px-4 ${
                      activeTab === 'tableAccess'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Table & Field Access
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'general' && (
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Role Name
                    </label>
                    <input
                      type="text"
                      value={newRole.name}
                      onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      value={newRole.description}
                      onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows={3}
                    ></textarea>
                  </div>
                </div>
              )}

              {activeTab === 'permissions' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Role Permissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availablePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-start">
                        <input
                          type="checkbox"
                          id={`perm-${permission.id}`}
                          checked={newRole.permissions.includes(permission.id)}
                          onChange={() => handlePermissionChange(permission.id)}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <label
                            htmlFor={`perm-${permission.id}`}
                            className="font-medium text-gray-700"
                          >
                            {permission.name}
                          </label>
                          <p className="text-sm text-gray-500">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'tableAccess' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Table & Field Access Control</h3>
                  
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Tables List */}
                      <div className="w-full md:w-1/3 border-r pr-4">
                        <h4 className="font-medium text-lg mb-3">Tables</h4>
                        <div className="space-y-4">
                          {tables.map((table) => (
                            <div key={table.id} className="border-b pb-3">
                              <div className="flex justify-between items-center">
                                <div>
                                  <button 
                                    onClick={() => setSelectedTable(table.name)}
                                    className={`font-medium ${selectedTable === table.name ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-500`}
                                  >
                                    {table.name}
                                  </button>
                                  <p className="text-sm text-gray-500">{table.description}</p>
                                </div>
                              </div>
                              <div className="mt-2 grid grid-cols-2 gap-x-4">
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`${table.name}-read`}
                                    checked={tablePermissions.find(p => p.tableName === table.name)?.canRead || false}
                                    onChange={(e) => handleTablePermissionChange(table.name, 'canRead', e.target.checked)}
                                    className="mr-2"
                                  />
                                  <label htmlFor={`${table.name}-read`} className="text-sm">Read</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`${table.name}-create`}
                                    checked={tablePermissions.find(p => p.tableName === table.name)?.canCreate || false}
                                    onChange={(e) => handleTablePermissionChange(table.name, 'canCreate', e.target.checked)}
                                    className="mr-2"
                                  />
                                  <label htmlFor={`${table.name}-create`} className="text-sm">Create</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`${table.name}-update`}
                                    checked={tablePermissions.find(p => p.tableName === table.name)?.canUpdate || false}
                                    onChange={(e) => handleTablePermissionChange(table.name, 'canUpdate', e.target.checked)}
                                    className="mr-2"
                                  />
                                  <label htmlFor={`${table.name}-update`} className="text-sm">Update</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`${table.name}-delete`}
                                    checked={tablePermissions.find(p => p.tableName === table.name)?.canDelete || false}
                                    onChange={(e) => handleTablePermissionChange(table.name, 'canDelete', e.target.checked)}
                                    className="mr-2"
                                  />
                                  <label htmlFor={`${table.name}-delete`} className="text-sm">Delete</label>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fields List */}
                      <div className="w-full md:w-2/3">
                        <h4 className="font-medium text-lg mb-3">
                          {selectedTable ? `Fields for ${selectedTable}` : 'Select a table to view fields'}
                        </h4>
                        
                        {selectedTable ? (
                          tableFields.length > 0 ? (
                            <div className="border rounded-lg overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Can Read</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Can Update</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {tableFields.map((field) => (
                                    <tr key={field.id}>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {field.name}
                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{field.type}</td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <input
                                          type="checkbox"
                                          checked={fieldPermissions.find(p => p.fieldName === field.name)?.canRead || false}
                                          onChange={(e) => handleFieldPermissionChange(field.name, 'canRead', e.target.checked)}
                                          className="rounded"
                                        />
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <input
                                          type="checkbox"
                                          checked={fieldPermissions.find(p => p.fieldName === field.name)?.canUpdate || false}
                                          onChange={(e) => handleFieldPermissionChange(field.name, 'canUpdate', e.target.checked)}
                                          className="rounded"
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                              No fields found for this table
                            </div>
                          )
                        ) : (
                          <div className="bg-gray-50 p-8 rounded-lg text-center">
                            <p className="text-gray-500 mb-2">Select a table to view and configure field permissions</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditRoleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Role Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Delete Role</h2>
              <p className="mb-6">
                Are you sure you want to delete the role <span className="font-bold">{currentRole?.name}</span>?
                {currentRole?.userCount > 0 && (
                  <span className="block text-red-600 mt-2">
                    Warning: This role is assigned to {currentRole.userCount} users. Deleting it will remove the role from these users.
                  </span>
                )}
              </p>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteRoleSubmit}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default RoleManagementPage; 