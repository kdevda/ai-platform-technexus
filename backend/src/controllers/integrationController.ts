import { Request, Response } from 'express';
import { getPrismaClient } from '../services/postgresDbService';
import { Integration, IntegrationConfiguration, Prisma } from '@prisma/client';

const prisma = getPrismaClient();

// Type for configuration object
interface ConfigurationObject {
  [key: string]: string;
}

// Type for integration with formatted configuration
interface FormattedIntegration extends Omit<Integration, 'configurations'> {
  configuration: ConfigurationObject;
  configurations?: IntegrationConfiguration[];
}

// Get all integrations
export const getAllIntegrations = async (req: Request, res: Response): Promise<void> => {
  try {
    const integrations = await prisma.integration.findMany({
      include: {
        configurations: {
          select: {
            fieldName: true,
            fieldValue: true,
            isEncrypted: true,
          },
        },
      },
    });

    // Process the integrations to format them for the frontend
    const formattedIntegrations = integrations.map((integration) => {
      const configuration: ConfigurationObject = {};
      
      // Convert configuration array to object and mask encrypted values
      integration.configurations.forEach((config) => {
        configuration[config.fieldName] = config.isEncrypted 
          ? '••••••••' // Mask encrypted values
          : config.fieldValue;
      });
      
      return {
        ...integration,
        configurations: undefined, // Remove the original configurations array
        configuration, // Add the formatted configuration object
      };
    });

    res.status(200).json(formattedIntegrations);
  } catch (error) {
    console.error('Error fetching integrations:', error);
    res.status(500).json({ message: 'Error fetching integrations', error: (error as Error).message });
  }
};

// Get integration by ID
export const getIntegrationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const integration = await prisma.integration.findUnique({
      where: { id },
      include: {
        configurations: {
          select: {
            fieldName: true,
            fieldValue: true,
            isEncrypted: true,
          },
        },
      },
    });

    if (!integration) {
      res.status(404).json({ message: 'Integration not found' });
      return;
    }

    // Process the integration configuration
    const configuration: ConfigurationObject = {};
    integration.configurations.forEach((config) => {
      configuration[config.fieldName] = config.isEncrypted 
        ? '••••••••' // Mask encrypted values
        : config.fieldValue;
    });

    const formattedIntegration = {
      ...integration,
      configurations: undefined,
      configuration,
    };

    res.status(200).json(formattedIntegration);
  } catch (error) {
    console.error('Error fetching integration:', error);
    res.status(500).json({ message: 'Error fetching integration', error: (error as Error).message });
  }
};

// Create integration
export const createIntegration = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, type, description, logoUrl, configuration } = req.body;

    // Validate required fields
    if (!name || !type || !description) {
      res.status(400).json({ message: 'Name, type, and description are required' });
      return;
    }

    // Create the integration
    const newIntegration = await prisma.integration.create({
      data: {
        name,
        type,
        description,
        logoUrl,
        isEnabled: false, // Default to disabled
      },
    });

    // Create configuration entries if provided
    if (configuration && typeof configuration === 'object') {
      const configEntries = Object.entries(configuration).map(([fieldName, fieldValue]) => {
        // Determine if field should be encrypted (e.g., API keys, passwords)
        const isEncrypted = fieldName.toLowerCase().includes('key') || 
                           fieldName.toLowerCase().includes('secret') || 
                           fieldName.toLowerCase().includes('password');
        
        return {
          integrationId: newIntegration.id,
          fieldName,
          fieldValue: fieldValue as string,
          isEncrypted,
        };
      });

      if (configEntries.length > 0) {
        await prisma.integrationConfiguration.createMany({
          data: configEntries,
        });
      }
    }

    // Get the complete integration with configurations
    const completeIntegration = await prisma.integration.findUnique({
      where: { id: newIntegration.id },
      include: {
        configurations: {
          select: {
            fieldName: true,
            fieldValue: true,
            isEncrypted: true,
          },
        },
      },
    });

    // Format the response
    const formattedConfiguration: ConfigurationObject = {};
    completeIntegration?.configurations.forEach((config) => {
      formattedConfiguration[config.fieldName] = config.isEncrypted 
        ? '••••••••' // Mask encrypted values
        : config.fieldValue;
    });

    const formattedIntegration = {
      ...completeIntegration,
      configurations: undefined,
      configuration: formattedConfiguration,
    };

    res.status(201).json(formattedIntegration);
  } catch (error) {
    console.error('Error creating integration:', error);
    res.status(500).json({ message: 'Error creating integration', error: (error as Error).message });
  }
};

// Update integration
export const updateIntegration = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, type, description, logoUrl, isEnabled, configuration } = req.body;

    // Check if integration exists
    const existingIntegration = await prisma.integration.findUnique({
      where: { id },
    });

    if (!existingIntegration) {
      res.status(404).json({ message: 'Integration not found' });
      return;
    }

    // Update the integration
    const updatedIntegration = await prisma.integration.update({
      where: { id },
      data: {
        name: name !== undefined ? name : existingIntegration.name,
        type: type !== undefined ? type : existingIntegration.type,
        description: description !== undefined ? description : existingIntegration.description,
        logoUrl: logoUrl !== undefined ? logoUrl : existingIntegration.logoUrl,
        isEnabled: isEnabled !== undefined ? isEnabled : existingIntegration.isEnabled,
      },
    });

    // Update configuration if provided
    if (configuration && typeof configuration === 'object') {
      // Get existing configurations
      const existingConfigs = await prisma.integrationConfiguration.findMany({
        where: { integrationId: id },
      });

      const existingConfigsMap = new Map<string, IntegrationConfiguration>(
        existingConfigs.map((config) => [config.fieldName, config])
      );

      // Process each configuration field
      for (const [fieldName, fieldValue] of Object.entries(configuration)) {
        // Skip masked values (unchanged encrypted fields)
        if (fieldValue === '••••••••' && existingConfigsMap.has(fieldName)) {
          continue;
        }

        const isEncrypted = fieldName.toLowerCase().includes('key') || 
                           fieldName.toLowerCase().includes('secret') || 
                           fieldName.toLowerCase().includes('password');

        if (existingConfigsMap.has(fieldName)) {
          // Update existing configuration
          const configToUpdate = existingConfigsMap.get(fieldName);
          if (configToUpdate) {
            await prisma.integrationConfiguration.update({
              where: { id: configToUpdate.id },
              data: {
                fieldValue: fieldValue as string,
                isEncrypted,
              },
            });
          }
        } else {
          // Create new configuration
          await prisma.integrationConfiguration.create({
            data: {
              integrationId: id,
              fieldName,
              fieldValue: fieldValue as string,
              isEncrypted,
            },
          });
        }
      }
    }

    // Get the updated integration with configurations
    const completeIntegration = await prisma.integration.findUnique({
      where: { id },
      include: {
        configurations: {
          select: {
            fieldName: true,
            fieldValue: true,
            isEncrypted: true,
          },
        },
      },
    });

    // Format the response
    const formattedConfiguration: ConfigurationObject = {};
    completeIntegration?.configurations.forEach((config) => {
      formattedConfiguration[config.fieldName] = config.isEncrypted 
        ? '••••••••' // Mask encrypted values
        : config.fieldValue;
    });

    const formattedIntegration = {
      ...completeIntegration,
      configurations: undefined,
      configuration: formattedConfiguration,
    };

    res.status(200).json(formattedIntegration);
  } catch (error) {
    console.error('Error updating integration:', error);
    res.status(500).json({ message: 'Error updating integration', error: (error as Error).message });
  }
};

// Toggle integration status
export const toggleIntegrationStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { isEnabled } = req.body;

    // Check if status is provided
    if (isEnabled === undefined) {
      res.status(400).json({ message: 'isEnabled status is required' });
      return;
    }

    // Check if integration exists
    const existingIntegration = await prisma.integration.findUnique({
      where: { id },
    });

    if (!existingIntegration) {
      res.status(404).json({ message: 'Integration not found' });
      return;
    }

    // Update the integration status
    const updatedIntegration = await prisma.integration.update({
      where: { id },
      data: {
        isEnabled,
      },
    });

    res.status(200).json(updatedIntegration);
  } catch (error) {
    console.error('Error toggling integration status:', error);
    res.status(500).json({ message: 'Error toggling integration status', error: (error as Error).message });
  }
};

// Delete integration
export const deleteIntegration = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if integration exists
    const existingIntegration = await prisma.integration.findUnique({
      where: { id },
    });

    if (!existingIntegration) {
      res.status(404).json({ message: 'Integration not found' });
      return;
    }

    // Delete the integration (configurations will be deleted due to cascade)
    await prisma.integration.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Integration deleted successfully' });
  } catch (error) {
    console.error('Error deleting integration:', error);
    res.status(500).json({ message: 'Error deleting integration', error: (error as Error).message });
  }
}; 