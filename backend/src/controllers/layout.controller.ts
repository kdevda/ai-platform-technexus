import { Request, Response } from 'express';
import { LayoutModel } from '../models/layout.model';
import mongoose from 'mongoose';

export class LayoutController {
  /**
   * Get all layouts
   */
  public getAllLayouts = async (req: Request, res: Response): Promise<void> => {
    try {
      const layouts = await LayoutModel.find().sort({ updatedAt: -1 });
      res.status(200).json(layouts);
    } catch (error) {
      console.error('Error getting layouts:', error);
      res.status(500).json({ message: 'Failed to retrieve layouts', error });
    }
  };

  /**
   * Get layouts for a specific table
   */
  public getLayoutsByTable = async (req: Request, res: Response): Promise<void> => {
    try {
      const { tableId } = req.params;
      const layouts = await LayoutModel.find({ tableId }).sort({ isDefault: -1, updatedAt: -1 });
      res.status(200).json(layouts);
    } catch (error) {
      console.error('Error getting layouts by table:', error);
      res.status(500).json({ message: 'Failed to retrieve layouts for table', error });
    }
  };

  /**
   * Get a layout by ID
   */
  public getLayoutById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid layout ID format' });
        return;
      }
      
      const layout = await LayoutModel.findById(id);
      
      if (!layout) {
        res.status(404).json({ message: 'Layout not found' });
        return;
      }
      
      res.status(200).json(layout);
    } catch (error) {
      console.error('Error getting layout by ID:', error);
      res.status(500).json({ message: 'Failed to retrieve layout', error });
    }
  };

  /**
   * Create a new layout
   */
  public createLayout = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, tableId, tableName, description, widgets, isDefault } = req.body;
      
      // Validate required fields
      if (!name || !tableId || !tableName) {
        res.status(400).json({ message: 'Name, tableId, and tableName are required' });
        return;
      }
      
      // Check if we need to update existing default layout
      if (isDefault) {
        await LayoutModel.updateMany(
          { tableId, isDefault: true }, 
          { $set: { isDefault: false } }
        );
      }
      
      const newLayout = new LayoutModel({
        name,
        tableId,
        tableName,
        description,
        widgets: widgets || [],
        isDefault: isDefault || false,
      });
      
      const savedLayout = await newLayout.save();
      res.status(201).json(savedLayout);
    } catch (error) {
      console.error('Error creating layout:', error);
      res.status(500).json({ message: 'Failed to create layout', error });
    }
  };

  /**
   * Update a layout
   */
  public updateLayout = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid layout ID format' });
        return;
      }
      
      // Check if we need to update existing default layout
      if (updates.isDefault === true) {
        const layout = await LayoutModel.findById(id);
        if (layout) {
          await LayoutModel.updateMany(
            { tableId: layout.tableId, isDefault: true, _id: { $ne: id } }, 
            { $set: { isDefault: false } }
          );
        }
      }
      
      const updatedLayout = await LayoutModel.findByIdAndUpdate(
        id, 
        { $set: updates }, 
        { new: true, runValidators: true }
      );
      
      if (!updatedLayout) {
        res.status(404).json({ message: 'Layout not found' });
        return;
      }
      
      res.status(200).json(updatedLayout);
    } catch (error) {
      console.error('Error updating layout:', error);
      res.status(500).json({ message: 'Failed to update layout', error });
    }
  };

  /**
   * Delete a layout
   */
  public deleteLayout = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid layout ID format' });
        return;
      }
      
      const layout = await LayoutModel.findByIdAndDelete(id);
      
      if (!layout) {
        res.status(404).json({ message: 'Layout not found' });
        return;
      }
      
      // If we deleted a default layout, make another one default if available
      if (layout.isDefault) {
        const anotherLayout = await LayoutModel.findOneAndUpdate(
          { tableId: layout.tableId },
          { $set: { isDefault: true } },
          { new: true }
        );
      }
      
      res.status(200).json({ message: 'Layout deleted successfully' });
    } catch (error) {
      console.error('Error deleting layout:', error);
      res.status(500).json({ message: 'Failed to delete layout', error });
    }
  };

  /**
   * Set a layout as default for its table
   */
  public setAsDefault = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid layout ID format' });
        return;
      }
      
      const layout = await LayoutModel.findById(id);
      
      if (!layout) {
        res.status(404).json({ message: 'Layout not found' });
        return;
      }
      
      // Update all other layouts for this table to not be default
      await LayoutModel.updateMany(
        { tableId: layout.tableId, _id: { $ne: id } },
        { $set: { isDefault: false } }
      );
      
      // Set this layout as default
      layout.isDefault = true;
      const updatedLayout = await layout.save();
      
      res.status(200).json(updatedLayout);
    } catch (error) {
      console.error('Error setting layout as default:', error);
      res.status(500).json({ message: 'Failed to update default layout', error });
    }
  };
} 