import { api } from './api';

// Helper function to get auth config with token
const getAuthConfig = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  if (!token) {
    return undefined;
  }
  
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Layout types
export interface WidgetPosition {
  id: string;
  widgetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  section: 'header' | 'left' | 'middle' | 'right';
  position?: string; // Optional position field for tracking in the UI
}

export interface Layout {
  _id: string;
  name: string;
  tableId: string;
  tableName: string;
  description?: string;
  widgets: WidgetPosition[];
  created?: string;
  createdBy?: string;
  updatedAt?: string;
  isDefault?: boolean;
}

export interface CreateLayoutDto {
  name: string;
  tableId: string;
  tableName: string;
  description?: string;
  widgets: WidgetPosition[];
  isDefault?: boolean;
}

export interface UpdateLayoutDto extends Partial<CreateLayoutDto> {}

/**
 * Service for layout operations
 */
export const layoutService = {
  /**
   * Get all layouts
   */
  getAllLayouts: async (): Promise<Layout[]> => {
    const authConfig = getAuthConfig();
    return api.get<Layout[]>('/api/layouts', authConfig);
  },
  
  /**
   * Get layouts for a specific table
   * @param tableId The ID of the table
   */
  getLayoutsByTable: async (tableId: string): Promise<Layout[]> => {
    const authConfig = getAuthConfig();
    return api.get<Layout[]>(`/api/layouts/table/${tableId}`, authConfig);
  },
  
  /**
   * Get a layout by ID
   * @param id The layout ID
   */
  getLayoutById: async (id: string): Promise<Layout> => {
    const authConfig = getAuthConfig();
    return api.get<Layout>(`/api/layouts/${id}`, authConfig);
  },
  
  /**
   * Create a new layout
   * @param layout The layout data
   */
  createLayout: async (layout: CreateLayoutDto): Promise<Layout> => {
    const authConfig = getAuthConfig();
    return api.post<Layout>('/api/layouts', layout, authConfig);
  },
  
  /**
   * Update an existing layout
   * @param id The layout ID
   * @param updates The updated layout data
   */
  updateLayout: async (id: string, updates: UpdateLayoutDto): Promise<Layout> => {
    const authConfig = getAuthConfig();
    return api.put<Layout>(`/api/layouts/${id}`, updates, authConfig);
  },
  
  /**
   * Delete a layout
   * @param id The layout ID
   */
  deleteLayout: async (id: string): Promise<void> => {
    const authConfig = getAuthConfig();
    return api.delete(`/api/layouts/${id}`, authConfig);
  },
  
  /**
   * Set a layout as default for a table
   * @param id The layout ID
   */
  setAsDefault: async (id: string): Promise<Layout> => {
    const authConfig = getAuthConfig();
    return api.put<Layout>(`/api/layouts/${id}/set-default`, {}, authConfig);
  }
};

export default layoutService; 