import { Request, Response } from 'express';
import { Integration } from '../models';

// Get all integrations
export const getAllIntegrations = async (req: Request, res: Response): Promise<void> => {
  try {
    const integrations = await Integration.find({});
    
    res.status(200).json({
      success: true,
      count: integrations.length,
      data: integrations,
    });
  } catch (error) {
    console.error('Error fetching integrations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch integrations',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get single integration by ID
export const getIntegrationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const integration = await Integration.findById(req.params.id);
    
    if (!integration) {
      res.status(404).json({
        success: false,
        message: 'Integration not found',
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: integration,
    });
  } catch (error) {
    console.error('Error fetching integration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch integration',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Create new integration
export const createIntegration = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
      return;
    }

    // Extract integration details from request body
    const {
      name,
      provider,
      type,
      apiKey,
      apiEndpoint,
      organizationId,
      isActive,
      metadata,
    } = req.body;
    
    // Create the integration
    const integration = await Integration.create({
      name,
      provider,
      type,
      apiKey,
      apiEndpoint,
      organizationId,
      isActive: isActive !== undefined ? isActive : true,
      metadata: metadata || {},
      createdBy: req.user.id, // Using id instead of _id
    });
    
    res.status(201).json({
      success: true,
      data: integration,
    });
  } catch (error) {
    console.error('Error creating integration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create integration',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update integration
export const updateIntegration = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      provider,
      type,
      apiKey,
      apiEndpoint,
      organizationId,
      isActive,
      metadata,
    } = req.body;
    
    // Find and update the integration
    const integration = await Integration.findByIdAndUpdate(
      req.params.id,
      {
        name,
        provider,
        type,
        apiKey,
        apiEndpoint,
        organizationId,
        isActive,
        metadata,
      },
      { new: true, runValidators: true }
    );
    
    if (!integration) {
      res.status(404).json({
        success: false,
        message: 'Integration not found',
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: integration,
    });
  } catch (error) {
    console.error('Error updating integration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update integration',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Toggle integration status
export const toggleIntegrationStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const integration = await Integration.findById(req.params.id);
    
    if (!integration) {
      res.status(404).json({
        success: false,
        message: 'Integration not found',
      });
      return;
    }
    
    // Toggle the isActive status
    integration.isActive = !integration.isActive;
    await integration.save();
    
    res.status(200).json({
      success: true,
      data: integration,
    });
  } catch (error) {
    console.error('Error toggling integration status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle integration status',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete integration
export const deleteIntegration = async (req: Request, res: Response): Promise<void> => {
  try {
    const integration = await Integration.findByIdAndDelete(req.params.id);
    
    if (!integration) {
      res.status(404).json({
        success: false,
        message: 'Integration not found',
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Integration deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting integration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete integration',
      error: error instanceof Error ? error.message : String(error),
    });
  }
}; 