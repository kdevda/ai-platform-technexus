import { Request, Response } from 'express';
import { Widget, IWidgetDocument } from '../models/Widget';

/**
 * Get all widgets
 * GET /api/widgets
 */
export const getAllWidgets = async (req: Request, res: Response) => {
  try {
    const { collection, limit } = req.query;
    const query: any = { createdBy: req.user?.id };
    
    // Add collection filter if provided
    if (collection) {
      query.collectionName = collection;
    }
    
    // Execute query with optional limit
    let widgetsQuery = Widget.find(query);
    if (limit) {
      widgetsQuery = widgetsQuery.limit(Number(limit));
    }
    
    const widgets = await widgetsQuery.sort('-createdAt');
    res.json(widgets);
  } catch (error) {
    console.error('Error getting widgets:', error);
    res.status(500).json({ message: 'Failed to get widgets' });
  }
};

/**
 * Get a widget by ID
 * GET /api/widgets/:id
 */
export const getWidgetById = async (req: Request, res: Response) => {
  try {
    const widget = await Widget.findOne({
      _id: req.params.id,
      createdBy: req.user?.id,
    });
    
    if (!widget) {
      return res.status(404).json({ message: 'Widget not found' });
    }
    
    res.json(widget);
  } catch (error) {
    console.error('Error getting widget:', error);
    res.status(500).json({ message: 'Failed to get widget' });
  }
};

/**
 * Create a new widget
 * POST /api/widgets
 */
export const createWidget = async (req: Request, res: Response) => {
  try {
    const widgetData = {
      ...req.body,
      createdBy: req.user?.id,
    };
    
    const widget = new Widget(widgetData);
    await widget.save();
    
    res.status(201).json(widget);
  } catch (error) {
    console.error('Error creating widget:', error);
    res.status(500).json({ message: 'Failed to create widget' });
  }
};

/**
 * Update a widget
 * PUT /api/widgets/:id
 */
export const updateWidget = async (req: Request, res: Response) => {
  try {
    const widget = await Widget.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user?.id,
      },
      req.body,
      { new: true }
    );
    
    if (!widget) {
      return res.status(404).json({ message: 'Widget not found' });
    }
    
    res.json(widget);
  } catch (error) {
    console.error('Error updating widget:', error);
    res.status(500).json({ message: 'Failed to update widget' });
  }
};

/**
 * Delete a widget
 * DELETE /api/widgets/:id
 */
export const deleteWidget = async (req: Request, res: Response) => {
  try {
    const widget = await Widget.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user?.id,
    });
    
    if (!widget) {
      return res.status(404).json({ message: 'Widget not found' });
    }
    
    res.json({ message: 'Widget deleted successfully' });
  } catch (error) {
    console.error('Error deleting widget:', error);
    res.status(500).json({ message: 'Failed to delete widget' });
  }
};

/**
 * Get widgets by collection
 * GET /api/widgets/collection/:collection
 */
export const getWidgetsByCollection = async (req: Request, res: Response) => {
  try {
    const widgets = await Widget.find({
      collectionName: req.params.collection,
      createdBy: req.user?.id,
    }).sort('-createdAt');
    
    res.json(widgets);
  } catch (error) {
    console.error('Error getting widgets by collection:', error);
    res.status(500).json({ message: 'Failed to get widgets' });
  }
}; 