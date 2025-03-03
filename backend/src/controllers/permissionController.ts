import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { parseModels, parseModelFields } from './schemaController';

const prisma = new PrismaClient();
const SCHEMA_PATH = path.resolve(__dirname, '../../prisma/schema.prisma');

/**
 * Get all table permissions for a specific role
 */
export const getRoleTablePermissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roleId } = req.params;
    
    const permissions = await prisma.tablePermission.findMany({
      where: { roleId }
    });
    
    res.status(200).json(permissions);
  } catch (error) {
    console.error('Error getting table permissions:', error);
    res.status(500).json({ error: 'Failed to get table permissions' });
  }
};

/**
 * Get all field permissions for a specific role and table
 */
export const getRoleFieldPermissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roleId, tableName } = req.params;
    
    const permissions = await prisma.fieldPermission.findMany({
      where: { 
        roleId,
        tableName 
      }
    });
    
    res.status(200).json(permissions);
  } catch (error) {
    console.error('Error getting field permissions:', error);
    res.status(500).json({ error: 'Failed to get field permissions' });
  }
};

/**
 * Set table permissions for a role
 */
export const setTablePermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roleId } = req.params;
    const { tableName, canRead, canCreate, canUpdate, canDelete } = req.body;
    
    // Check if permission already exists
    const existingPermission = await prisma.tablePermission.findUnique({
      where: {
        roleId_tableName: {
          roleId,
          tableName
        }
      }
    });
    
    let permission;
    
    if (existingPermission) {
      // Update existing permission
      permission = await prisma.tablePermission.update({
        where: {
          id: existingPermission.id
        },
        data: {
          canRead: canRead !== undefined ? canRead : existingPermission.canRead,
          canCreate: canCreate !== undefined ? canCreate : existingPermission.canCreate,
          canUpdate: canUpdate !== undefined ? canUpdate : existingPermission.canUpdate,
          canDelete: canDelete !== undefined ? canDelete : existingPermission.canDelete
        }
      });
    } else {
      // Create new permission
      permission = await prisma.tablePermission.create({
        data: {
          roleId,
          tableName,
          canRead: canRead || false,
          canCreate: canCreate || false,
          canUpdate: canUpdate || false,
          canDelete: canDelete || false
        }
      });
    }
    
    res.status(200).json(permission);
  } catch (error) {
    console.error('Error setting table permission:', error);
    res.status(500).json({ error: 'Failed to set table permission' });
  }
};

/**
 * Set field permission for a role
 */
export const setFieldPermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roleId } = req.params;
    const { tableName, fieldName, canRead, canUpdate } = req.body;
    
    // Check if permission already exists
    const existingPermission = await prisma.fieldPermission.findUnique({
      where: {
        roleId_tableName_fieldName: {
          roleId,
          tableName,
          fieldName
        }
      }
    });
    
    let permission;
    
    if (existingPermission) {
      // Update existing permission
      permission = await prisma.fieldPermission.update({
        where: {
          id: existingPermission.id
        },
        data: {
          canRead: canRead !== undefined ? canRead : existingPermission.canRead,
          canUpdate: canUpdate !== undefined ? canUpdate : existingPermission.canUpdate
        }
      });
    } else {
      // Create new permission
      permission = await prisma.fieldPermission.create({
        data: {
          roleId,
          tableName,
          fieldName,
          canRead: canRead || false,
          canUpdate: canUpdate || false
        }
      });
    }
    
    res.status(200).json(permission);
  } catch (error) {
    console.error('Error setting field permission:', error);
    res.status(500).json({ error: 'Failed to set field permission' });
  }
};

/**
 * Delete table permission
 */
export const deleteTablePermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { permissionId } = req.params;
    
    await prisma.tablePermission.delete({
      where: { id: permissionId }
    });
    
    res.status(200).json({ message: 'Table permission deleted successfully' });
  } catch (error) {
    console.error('Error deleting table permission:', error);
    res.status(500).json({ error: 'Failed to delete table permission' });
  }
};

/**
 * Delete field permission
 */
export const deleteFieldPermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { permissionId } = req.params;
    
    await prisma.fieldPermission.delete({
      where: { id: permissionId }
    });
    
    res.status(200).json({ message: 'Field permission deleted successfully' });
  } catch (error) {
    console.error('Error deleting field permission:', error);
    res.status(500).json({ error: 'Failed to delete field permission' });
  }
};

/**
 * Get all tables with permissions for a role
 */
export const getTablesWithPermissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roleId } = req.params;
    
    // Initialize with a more flexible type that matches the actual return from parseModels
    let tablesData: Array<any> = [];
    
    // Check if schema file exists
    if (!fs.existsSync(SCHEMA_PATH)) {
      console.warn("Schema file not found at path:", SCHEMA_PATH);
      // Continue with empty tables array instead of returning error
    } else {
      try {
        // Get all tables
        const schemaContent = fs.readFileSync(SCHEMA_PATH, 'utf8');
        const parsedTables = parseModels(schemaContent);
        
        if (parsedTables && Array.isArray(parsedTables)) {
          tablesData = parsedTables;
        } else {
          console.error('Error parsing schema models: tablesData is not an array', parsedTables);
        }
      } catch (parseError) {
        console.error('Error parsing schema:', parseError);
        // Continue with empty tables array
      }
    }
    
    // Get permissions for this role
    const permissions = await prisma.tablePermission.findMany({
      where: { roleId }
    }).catch(err => {
      console.error('Error fetching table permissions:', err);
      return []; // Return empty array on error
    });
    
    // Merge tables with permissions
    const tablesWithPermissions = tablesData.map((table: any) => {
      const permission = permissions.find((p: any) => p.tableName === table.name) || {
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false
      };
      
      return {
        ...table,
        permissions: {
          canRead: permission.canRead,
          canCreate: permission.canCreate,
          canUpdate: permission.canUpdate,
          canDelete: permission.canDelete
        }
      };
    });
    
    res.status(200).json(tablesWithPermissions);
  } catch (error) {
    console.error('Error getting tables with permissions:', error);
    res.status(500).json({ error: 'Failed to get tables with permissions' });
  }
};

/**
 * Get all fields with permissions for a role and table
 */
export const getFieldsWithPermissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roleId, tableName } = req.params;
    
    // Initialize with proper type annotation
    let modelInfo: { 
      fields: Array<{
        id: string;
        name: string;
        type: string;
        required: boolean;
        unique: boolean;
        default: string;
        description: string;
      }> 
    } = { fields: [] };
    
    // Check if schema file exists
    if (!fs.existsSync(SCHEMA_PATH)) {
      console.warn("Schema file not found at path:", SCHEMA_PATH);
      // Continue with empty fields array instead of returning error
    } else {
      try {
        // Get fields for the table
        const schemaContent = fs.readFileSync(SCHEMA_PATH, 'utf8');
        const parsedModel = parseModelFields(schemaContent, tableName);
        
        if (parsedModel) {
          modelInfo = parsedModel;
        } else {
          console.warn(`Table ${tableName} not found in schema`);
        }
      } catch (parseError) {
        console.error('Error parsing schema for fields:', parseError);
        // Continue with default empty fields array
      }
    }
    
    // Get permissions for this role and table
    const permissions = await prisma.fieldPermission.findMany({
      where: { 
        roleId,
        tableName 
      }
    }).catch(err => {
      console.error('Error fetching field permissions:', err);
      return []; // Return empty array on error
    });
    
    // Merge fields with permissions
    const fieldsWithPermissions = modelInfo.fields.map((field: any) => {
      const permission = permissions.find((p: any) => p.fieldName === field.name) || {
        canRead: false,
        canUpdate: false
      };
      
      return {
        ...field,
        permissions: {
          canRead: permission.canRead,
          canUpdate: permission.canUpdate
        }
      };
    });
    
    res.status(200).json(fieldsWithPermissions);
  } catch (error) {
    console.error('Error getting fields with permissions:', error);
    res.status(500).json({ error: 'Failed to get fields with permissions' });
  }
}; 