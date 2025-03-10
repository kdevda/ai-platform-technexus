import { api } from './api';

// Helper function to get auth config with token
const getAuthConfig = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  // Debug info
  if (token) {
    console.log(`Using token from localStorage (length: ${token.length})`);
  } else {
    console.warn('No token found in localStorage');
    
    // Try to get token from sessionStorage as fallback
    const sessionToken = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
    if (sessionToken) {
      console.log('Found token in sessionStorage, saving to localStorage');
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', sessionToken);
      }
      return {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      };
    }
  }
  
  if (!token) {
    return undefined;
  }
  
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Widget interfaces matching our existing components
export interface TableFieldConfig {
  fieldId: string;
  fieldName: string;
  position: string;
  viewType: 'condensed' | 'detailed';
}

export interface TableWidgetSettings {
  tableId: string;
  tableName: string;
  fields: TableFieldConfig[];
  defaultView: 'condensed' | 'detailed';
}

export interface FieldWidgetSettings {
  tableId: string;
  tableName: string;
  fieldId: string;
  fieldName: string;
  displayOptions: {
    showLabel: boolean;
    labelPosition: 'top' | 'left';
    emphasize: boolean;
  };
}

export interface FlowStage {
  value: string;
  label: string;
  color: string;
}

export interface FlowWidgetSettings {
  tableId: string;
  tableName: string;
  fieldId: string;
  fieldName: string;
  stages: FlowStage[];
}

export interface ProgressThreshold {
  value: number;
  color: string;
}

export interface ProgressWidgetSettings {
  tableId: string;
  tableName: string;
  fieldId: string;
  fieldName: string;
  minValue: number;
  maxValue: number;
  thresholds: ProgressThreshold[];
}

export interface WidgetSettings {
  table?: TableWidgetSettings;
  field?: FieldWidgetSettings;
  flow?: FlowWidgetSettings;
  progress?: ProgressWidgetSettings;
}

export interface Widget {
  _id: string;
  name: string;
  type: 'table' | 'field' | 'flow' | 'progress';
  description?: string;
  collection?: string;
  settings: WidgetSettings;
  created?: string;
  createdBy?: string;
  updatedAt?: string;
}

export interface CreateWidgetDto {
  name: string;
  type: 'table' | 'field' | 'flow' | 'progress';
  description?: string;
  collection?: string;
  settings: WidgetSettings;
}

export interface UpdateWidgetDto extends Partial<CreateWidgetDto> {}

/**
 * Service for widget operations
 */
export const widgetService = {
  /**
   * Get all widgets with optional filtering
   * @param collection Filter by collection
   * @param limit Maximum number of widgets to retrieve
   */
  getAllWidgets: async (collection?: string, limit?: number): Promise<Widget[]> => {
    let url = '/api/widgets';
    const params: Record<string, string> = {};
    const authConfig = getAuthConfig();
    
    if (collection) {
      params.collection = collection;
    }
    
    if (limit) {
      params.limit = limit.toString();
    }
    
    const queryParams = new URLSearchParams(params).toString();
    if (queryParams) {
      url += `?${queryParams}`;
    }
    
    return api.get<Widget[]>(url, authConfig);
  },
  
  /**
   * Get a specific widget by ID
   * @param id Widget ID
   */
  getWidgetById: async (id: string): Promise<Widget> => {
    const authConfig = getAuthConfig();
    return api.get<Widget>(`/api/widgets/${id}`, authConfig);
  },
  
  /**
   * Create a new widget
   * @param widget Widget data
   */
  createWidget: async (widget: CreateWidgetDto): Promise<Widget> => {
    const authConfig = getAuthConfig();
    return api.post<Widget>('/api/widgets', widget, authConfig);
  },
  
  /**
   * Update an existing widget
   * @param id Widget ID
   * @param widget Updated widget data
   */
  updateWidget: async (id: string, widget: UpdateWidgetDto): Promise<Widget> => {
    const authConfig = getAuthConfig();
    return api.put<Widget>(`/api/widgets/${id}`, widget, authConfig);
  },
  
  /**
   * Delete a widget
   * @param id Widget ID
   */
  deleteWidget: async (id: string): Promise<void> => {
    const authConfig = getAuthConfig();
    return api.delete<void>(`/api/widgets/${id}`, authConfig);
  },
  
  /**
   * Get widgets by collection
   * @param collection Collection name
   */
  getWidgetsByCollection: async (collection: string): Promise<Widget[]> => {
    return api.get<Widget[]>(`/api/widgets/collection/${collection}`);
  },
  
  /**
   * Get table data for a widget
   * @param tableId ID of the table
   */
  getTableData: async (tableId: string): Promise<any[]> => {
    return api.get<any[]>(`/api/data/${tableId}`);
  },
  
  /**
   * Get field data
   * @param tableId ID of the table
   * @param fieldId ID of the field
   */
  getFieldData: async (tableId: string, fieldId: string): Promise<any> => {
    return api.get<any>(`/api/data/${tableId}/field/${fieldId}`);
  },
  
  /**
   * Get flow/stage data
   * @param tableId ID of the table
   * @param fieldId ID of the field
   */
  getFlowData: async (tableId: string, fieldId: string): Promise<Record<string, number>> => {
    return api.get<Record<string, number>>(`/api/data/${tableId}/flow/${fieldId}`);
  },
  
  /**
   * Get progress data
   * @param tableId ID of the table
   * @param fieldId ID of the field
   */
  getProgressData: async (tableId: string, fieldId: string): Promise<number> => {
    const response = await api.get<{ value: number }>(`/api/data/${tableId}/progress/${fieldId}`);
    return response.value;
  },
  
  /**
   * Get available tables and their fields
   */
  getTables: async (): Promise<any[]> => {
    return api.get<any[]>('/api/metadata/tables');
  },
}; 