import { Model } from 'mongoose';
import { getModelByName } from './mongoDbService';

/**
 * Get data for a table widget
 */
export const getTableData = async (tableId: string): Promise<any[]> => {
  try {
    const model = await getModelByName(tableId);
    if (!model) {
      throw new Error(`Table ${tableId} not found`);
    }
    
    return model.find().limit(100);
  } catch (error) {
    console.error('Error getting table data:', error);
    throw error;
  }
};

/**
 * Get data for a field widget
 */
export const getFieldData = async (tableId: string, fieldId: string): Promise<any> => {
  try {
    const model = await getModelByName(tableId);
    if (!model) {
      throw new Error(`Table ${tableId} not found`);
    }
    
    const projection: any = {};
    projection[fieldId] = 1;
    
    const result = await model.findOne({}, projection);
    return { value: result ? result[fieldId] : null };
  } catch (error) {
    console.error('Error getting field data:', error);
    throw error;
  }
};

/**
 * Get data for a flow widget
 */
export const getFlowData = async (tableId: string, fieldId: string): Promise<Record<string, number>> => {
  try {
    const model = await getModelByName(tableId);
    if (!model) {
      throw new Error(`Table ${tableId} not found`);
    }
    
    const aggregation = await model.aggregate([
      {
        $group: {
          _id: `$${fieldId}`,
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Convert aggregation result to record
    const result: Record<string, number> = {};
    aggregation.forEach((item: any) => {
      if (item._id !== null && item._id !== undefined) {
        result[item._id] = item.count;
      }
    });
    
    return result;
  } catch (error) {
    console.error('Error getting flow data:', error);
    throw error;
  }
};

/**
 * Get data for a progress widget
 */
export const getProgressData = async (tableId: string, fieldId: string): Promise<number> => {
  try {
    const model = await getModelByName(tableId);
    if (!model) {
      throw new Error(`Table ${tableId} not found`);
    }
    
    const result = await model.findOne({}, { [fieldId]: 1 });
    return result ? result[fieldId] || 0 : 0;
  } catch (error) {
    console.error('Error getting progress data:', error);
    throw error;
  }
}; 