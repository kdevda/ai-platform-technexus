import { Request, Response } from 'express';
import { roleRepository } from '../repositories/roleRepository';
import { userRepository } from '../repositories/userRepository';
import { Role } from '@prisma/client';

// Define a type for the role with userRoles included
type RoleWithUserRoles = Role & {
  userRoles?: { userId: string }[];
};

/**
 * Get all roles
 * @route GET /api/roles
 * @access Admin
 */
export const getAllRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await roleRepository.getAll() as RoleWithUserRoles[];
    
    // Format the response to include user count
    const formattedRoles = roles.map(role => ({
      id: role.id,
      name: role.name,
      description: role.description,
      userCount: role.userRoles?.length || 0,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt
    }));
    
    res.status(200).json(formattedRoles);
  } catch (error) {
    console.error('Error getting roles:', error);
    res.status(500).json({ message: 'Server error while getting roles' });
  }
};

/**
 * Get a single role by ID
 * @route GET /api/roles/:id
 * @access Admin
 */
export const getRoleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Role ID is required' });
      return;
    }
    
    const role = await roleRepository.findById(id) as RoleWithUserRoles | null;
    
    if (!role) {
      res.status(404).json({ message: 'Role not found' });
      return;
    }
    
    res.status(200).json({
      id: role.id,
      name: role.name,
      description: role.description,
      userCount: role.userRoles?.length || 0,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt
    });
  } catch (error) {
    console.error('Error getting role:', error);
    res.status(500).json({ message: 'Server error while getting role' });
  }
};

/**
 * Create a new role
 * @route POST /api/roles
 * @access Admin
 */
export const createRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      res.status(400).json({ message: 'Role name is required' });
      return;
    }
    
    // Check if role with this name already exists
    const existingRole = await roleRepository.findByName(name);
    
    if (existingRole) {
      res.status(400).json({ message: 'Role with this name already exists' });
      return;
    }
    
    // Create the role
    const newRole = await roleRepository.create({
      name,
      description
    });
    
    res.status(201).json({
      id: newRole.id,
      name: newRole.name,
      description: newRole.description,
      userCount: 0,
      createdAt: newRole.createdAt,
      updatedAt: newRole.updatedAt
    });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ message: 'Server error while creating role' });
  }
};

/**
 * Update a role
 * @route PUT /api/roles/:id
 * @access Admin
 */
export const updateRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    if (!id) {
      res.status(400).json({ message: 'Role ID is required' });
      return;
    }
    
    // Check if role exists
    const existingRole = await roleRepository.findById(id) as RoleWithUserRoles | null;
    
    if (!existingRole) {
      res.status(404).json({ message: 'Role not found' });
      return;
    }
    
    // If name is changing, check if new name already exists
    if (name && name !== existingRole.name) {
      const roleWithName = await roleRepository.findByName(name);
      
      if (roleWithName && roleWithName.id !== id) {
        res.status(400).json({ message: 'Role with this name already exists' });
        return;
      }
    }
    
    // Update the role
    const updatedRole = await roleRepository.update(id, {
      name,
      description
    });
    
    res.status(200).json({
      id: updatedRole.id,
      name: updatedRole.name,
      description: updatedRole.description,
      userCount: existingRole.userRoles?.length || 0,
      createdAt: updatedRole.createdAt,
      updatedAt: updatedRole.updatedAt
    });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Server error while updating role' });
  }
};

/**
 * Delete a role
 * @route DELETE /api/roles/:id
 * @access Admin
 */
export const deleteRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Role ID is required' });
      return;
    }
    
    // Check if role exists
    const existingRole = await roleRepository.findById(id) as RoleWithUserRoles | null;
    
    if (!existingRole) {
      res.status(404).json({ message: 'Role not found' });
      return;
    }
    
    // Check if role has users
    if (existingRole.userRoles && existingRole.userRoles.length > 0) {
      res.status(400).json({ message: 'Cannot delete role with assigned users' });
      return;
    }
    
    // Delete the role
    await roleRepository.delete(id);
    
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ message: 'Server error while deleting role' });
  }
}; 