import { api } from './api';

export interface DatabaseField {
  id: string;
  name: string;
  displayName: string;
  type: string;
  description?: string;
  isRequired?: boolean;
  isUnique?: boolean;
  defaultValue?: any;
  isSystem?: boolean;
}

export interface DatabaseTable {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  fields: DatabaseField[];
  isSystem?: boolean;
  recordCount?: number;
}

/**
 * Service for managing metadata (tables, fields, etc.)
 */
export const metadataService = {
  /**
   * Get all available tables
   * @param token Optional auth token
   */
  getTables: async (token?: string): Promise<DatabaseTable[]> => {
    const config = token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : undefined;
    
    console.log('Fetching tables with auth config:', config ? 'Auth token provided' : 'No auth token');
    try {
      const response = await api.get<DatabaseTable[]>('/api/schema/tables', config);
      console.log('Tables API response:', response);
      
      // Check response type and structure
      if (!response) {
        console.error('Empty response from tables API');
        return [];
      }
      
      if (!Array.isArray(response)) {
        console.error('Tables API response is not an array:', response);
        
        // Try to extract tables from potential response formats
        if (response && typeof response === 'object') {
          const responseObj = response as any;
          
          if ('tables' in responseObj && Array.isArray(responseObj.tables)) {
            console.log('Found tables in response object, returning those');
            return responseObj.tables;
          }
          
          if ('data' in responseObj && Array.isArray(responseObj.data)) {
            console.log('Found data in response object, returning that');
            return responseObj.data;
          }
          
          // Last attempt: see if the response is an object with keys that are tables
          const potentialTables = Object.values(responseObj);
          if (potentialTables.length > 0 && potentialTables.every(t => t && typeof t === 'object')) {
            console.log('Response seems to be an object containing tables, converting to array');
            return potentialTables as DatabaseTable[];
          }
        }
        
        return [];
      }
      
      return response;
    } catch (error) {
      console.error('Error fetching tables:', error);
      return [];
    }
  },
  
  /**
   * Get a specific table by ID
   * @param tableId The ID of the table to get
   * @param token Optional auth token
   */
  getTableById: async (tableId: string, token?: string): Promise<DatabaseTable> => {
    const config = token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : undefined;
    
    return api.get<DatabaseTable>(`/api/schema/tables/${tableId}`, config);
  },
  
  /**
   * Get fields for a specific table
   * @param tableName The name of the table to get fields for
   * @param token Optional auth token
   */
  getTableFields: async (tableName: string, token?: string): Promise<DatabaseField[]> => {
    const config = token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : undefined;
    
    console.log(`Making API request to: /api/schema/tables/${tableName}`);
    return api.get<DatabaseField[]>(`/api/schema/tables/${tableName}`, config);
  },
  
  /**
   * Get a specific field
   * @param tableName The name of the table the field belongs to (not the ID)
   * @param fieldId The ID of the field to get
   * @param token Optional auth token
   */
  getField: async (tableName: string, fieldId: string, token?: string): Promise<DatabaseField> => {
    const config = token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : undefined;
    
    return api.get<DatabaseField>(`/api/schema/tables/${tableName}/fields/${fieldId}`, config);
  },
  
  /**
   * Get fields by type
   * @param tableName The name of the table to get fields for (not the ID)
   * @param fieldType The type of fields to get
   * @param token Optional auth token
   */
  getFieldsByType: async (tableName: string, fieldType: string, token?: string): Promise<DatabaseField[]> => {
    const config = token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : undefined;
    
    console.log(`Making API request to: /api/schema/tables/${tableName}?type=${fieldType}`);
    return api.get<DatabaseField[]>(`/api/schema/tables/${tableName}?type=${fieldType}`, config);
  },
  
  /**
   * Get all available field types
   * @param token Optional auth token
   */
  getFieldTypes: async (token?: string): Promise<string[]> => {
    const config = token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : undefined;
    
    return api.get<string[]>('/api/schema/field-types', config);
  },
  
  /**
   * Create a new table
   * @param table The table to create
   * @param token Optional auth token
   */
  createTable: async (table: Omit<DatabaseTable, 'id'>, token?: string): Promise<DatabaseTable> => {
    const config = token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : undefined;
    
    return api.post<DatabaseTable>('/api/schema/tables', table, config);
  },
  
  /**
   * Update a table
   * @param tableId The ID of the table to update
   * @param table The updated table data
   * @param token Optional auth token
   */
  updateTable: async (tableId: string, table: Partial<DatabaseTable>, token?: string): Promise<DatabaseTable> => {
    const config = token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : undefined;
    
    return api.put<DatabaseTable>(`/api/schema/tables/${tableId}`, table, config);
  },
  
  /**
   * Create a new field in a table
   * @param tableId The ID of the table to add the field to
   * @param field The field to add
   * @param token Optional auth token
   */
  createField: async (tableId: string, field: Omit<DatabaseField, 'id'>, token?: string): Promise<DatabaseField> => {
    const config = token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : undefined;
    
    return api.post<DatabaseField>(`/api/schema/tables/${tableId}/fields`, field, config);
  },
  
  /**
   * Update a field
   * @param tableId The ID of the table the field belongs to
   * @param fieldId The ID of the field to update
   * @param field The updated field data
   * @param token Optional auth token
   */
  updateField: async (
    tableId: string, 
    fieldId: string, 
    field: Partial<DatabaseField>,
    token?: string
  ): Promise<DatabaseField> => {
    const config = token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : undefined;
    
    return api.put<DatabaseField>(`/api/schema/tables/${tableId}/fields/${fieldId}`, field, config);
  },
  
  /**
   * Delete a field
   * @param tableId The ID of the table the field belongs to
   * @param fieldId The ID of the field to delete
   * @param token Optional auth token
   */
  deleteField: async (tableId: string, fieldId: string, token?: string): Promise<void> => {
    const config = token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : undefined;
    
    return api.delete<void>(`/api/schema/tables/${tableId}/fields/${fieldId}`, config);
  },
}; 