'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

// Sample role data
const sampleRoles = [
  {
    id: '1',
    name: 'ADMIN',
    description: 'Full system access with all privileges',
    permissions: ['read', 'write', 'delete', 'approve', 'manage_users', 'manage_roles'],
    userCount: 5
  },
  {
    id: '2',
    name: 'MANAGER',
    description: 'Can manage loans and users but cannot modify system settings',
    permissions: ['read', 'write', 'approve', 'manage_users'],
    userCount: 12
  },
  {
    id: '3',
    name: 'LOAN_OFFICER',
    description: 'Can process loan applications and approve/reject them',
    permissions: ['read', 'write', 'approve'],
    userCount: 28
  },
  {
    id: '4',
    name: 'CUSTOMER_SERVICE',
    description: 'Can view customer information and assist with inquiries',
    permissions: ['read'],
    userCount: 34
  },
  {
    id: '5',
    name: 'AUDITOR',
    description: 'Can view all system data for auditing purposes',
    permissions: ['read'],
    userCount: 7
  }
];

// Available permissions for the system
const availablePermissions = [
  { id: 'read', name: 'Read', description: 'Can view data' },
  { id: 'write', name: 'Write', description: 'Can create and edit data' },
  { id: 'delete', name: 'Delete', description: 'Can delete data' },
  { id: 'approve', name: 'Approve', description: 'Can approve requests' },
  { id: 'manage_users', name: 'Manage Users', description: 'Can manage user accounts' },
  { id: 'manage_roles', name: 'Manage Roles', description: 'Can manage roles and permissions' },
  { id: 'export', name: 'Export Data', description: 'Can export data from the system' },
  { id: 'import', name: 'Import Data', description: 'Can import data into the system' },
  { id: 'configure', name: 'Configure System', description: 'Can modify system configurations' },
];

const RoleManagementPage: React.FC = () => {
  const [roles, setRoles] = useState(sampleRoles);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<any>(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

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
    setIsEditModalOpen(true);
  };

  // Handle opening the delete role modal
  const handleDeleteRole = (role: any) => {
    setCurrentRole(role);
    setIsDeleteModalOpen(true);
  };

  // Handle saving a new role
  const handleSaveNewRole = () => {
    const roleId = `${roles.length + 1}`;
    const roleToAdd = {
      id: roleId,
      name: newRole.name.toUpperCase(),
      description: newRole.description,
      permissions: newRole.permissions,
      userCount: 0
    };
    
    setRoles([...roles, roleToAdd]);
    setIsAddModalOpen(false);
  };

  // Handle updating an existing role
  const handleUpdateRole = () => {
    const updatedRoles = roles.map(role => 
      role.id === currentRole.id 
        ? { 
            ...role, 
            name: newRole.name.toUpperCase(), 
            description: newRole.description,
            permissions: newRole.permissions
          } 
        : role
    );
    
    setRoles(updatedRoles);
    setIsEditModalOpen(false);
  };

  // Handle deleting a role
  const handleConfirmDelete = () => {
    const updatedRoles = roles.filter(role => role.id !== currentRole.id);
    setRoles(updatedRoles);
    setIsDeleteModalOpen(false);
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
      <div className="text-black">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Role Management</h1>
          <button
            onClick={handleAddRole}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
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
                      {role.permissions.map((permission) => (
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
                  onClick={handleSaveNewRole}
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Edit Role</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editRoleName">
                  Role Name
                </label>
                <input
                  id="editRoleName"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter role name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editRoleDescription">
                  Description
                </label>
                <textarea
                  id="editRoleDescription"
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
                        id={`edit-permission-${permission.id}`}
                        type="checkbox"
                        className="mt-1 mr-2"
                        checked={newRole.permissions.includes(permission.id)}
                        onChange={() => handlePermissionChange(permission.id)}
                      />
                      <label htmlFor={`edit-permission-${permission.id}`} className="text-sm">
                        <div className="font-medium">{permission.name}</div>
                        <div className="text-gray-500 text-xs">{permission.description}</div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateRole}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={!newRole.name}
                >
                  Update Role
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
                  onClick={handleConfirmDelete}
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