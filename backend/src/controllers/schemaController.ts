import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const prisma = new PrismaClient();

const SCHEMA_PATH = path.resolve(__dirname, '../../prisma/schema.prisma');

/**
 * Get all tables (models) from the Prisma schema
 */
export const getTables = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Getting tables from schema...");
    const schemaPath = path.join(__dirname, '../../prisma/schema.prisma');
    console.log("Schema path:", schemaPath);
    
    // Check if the schema file exists
    if (!fs.existsSync(schemaPath)) {
      console.warn("Schema file not found at path:", schemaPath);
      res.status(404).json({ message: 'Schema file not found' });
      return;
    }

    const schemaContent = fs.readFileSync(schemaPath, 'utf8');
    
    // Parse models from the schema
    const models = parseModels(schemaContent);
    console.log("Models found in schema:", models.map(m => m.name));
    
    if (models.length === 0) {
      console.warn("No models found in schema");
      res.status(200).json({ tables: [] });
      return;
    }

    // Get record counts for each model
    const tables = [];
    for (const model of models) {
      try {
        // Check if the model exists in the Prisma client
        if (!(model.name in prisma)) {
          console.warn(`Model ${model.name} not found in Prisma client`);
          tables.push({
            ...model,
            recordCount: 0,
          });
          continue;
        }

        // Get record count
        const count = await (prisma as any)[model.name].count();
        tables.push({
          ...model,
          recordCount: count,
        });
      } catch (error) {
        console.error(`Error counting records for model ${model.name}:`, error);
        tables.push({
          ...model,
          recordCount: 0,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    res.status(200).json({ tables });
  } catch (error) {
    console.error('Error in getTables:', error);
    res.status(500).json({ 
      message: 'Error getting tables', 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
};

/**
 * Get fields for a specific table
 */
export const getTableFields = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tableName } = req.params;
    const schemaContent = fs.readFileSync(SCHEMA_PATH, 'utf8');
    
    // Extract the specific model fields
    const model = parseModelFields(schemaContent, tableName);
    
    if (!model) {
      res.status(404).json({ error: 'Model not found' });
      return;
    }
    
    res.status(200).json(model);
  } catch (error) {
    console.error('Error getting table fields:', error);
    res.status(500).json({ error: 'Failed to get table fields' });
  }
};

/**
 * Create a new table
 */
export const createTable = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, fields } = req.body;
    
    if (!name || !Array.isArray(fields) || fields.length === 0) {
      res.status(400).json({ error: 'Invalid table data' });
      return;
    }
    
    const schemaContent = fs.readFileSync(SCHEMA_PATH, 'utf8');
    const existingTables = parseModels(schemaContent);
    
    if (existingTables.some((table) => table.name.toLowerCase() === name.toLowerCase())) {
      res.status(400).json({ error: 'Table already exists' });
      return;
    }
    
    // Generate the model definition
    const modelDefinition = generateModelDefinition(name, description, fields);
    
    // Add the new model to the schema
    const updatedSchema = `${schemaContent}\n${modelDefinition}`;
    
    // Write the updated schema back to the file
    fs.writeFileSync(SCHEMA_PATH, updatedSchema);
    
    // Apply the schema changes
    await applySchemaChanges();
    
    res.status(201).json({ message: 'Table created successfully' });
  } catch (error) {
    console.error('Error creating table:', error);
    res.status(500).json({ error: 'Failed to create table' });
  }
};

/**
 * Update an existing table (add/modify/remove fields)
 */
export const updateTable = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tableName } = req.params;
    const { fields, newName, description } = req.body;
    
    // Read the current schema
    const schemaContent = fs.readFileSync(SCHEMA_PATH, 'utf8');
    
    // Find the model and its current fields
    const modelInfo = parseModelFields(schemaContent, tableName);
    
    if (!modelInfo) {
      res.status(404).json({ error: 'Table not found' });
      return;
    }
    
    // Generate updated model definition
    const updatedDefinition = generateModelDefinition(
      newName || tableName,
      description || modelInfo.description,
      fields || modelInfo.fields
    );
    
    // Replace the old model definition with the new one
    const modelRegex = new RegExp(`model ${tableName} {[\\s\\S]*?}\\s*`, 'g');
    const updatedSchema = schemaContent.replace(modelRegex, updatedDefinition);
    
    // Write the updated schema back to the file
    fs.writeFileSync(SCHEMA_PATH, updatedSchema);
    
    // Apply the schema changes
    await applySchemaChanges();
    
    res.status(200).json({ message: 'Table updated successfully' });
  } catch (error) {
    console.error('Error updating table:', error);
    res.status(500).json({ error: 'Failed to update table' });
  }
};

/**
 * Delete a table
 */
export const deleteTable = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tableName } = req.params;
    
    // Read the current schema
    const schemaContent = fs.readFileSync(SCHEMA_PATH, 'utf8');
    
    // Check if model exists
    if (!schemaContent.includes(`model ${tableName} {`)) {
      res.status(404).json({ error: 'Table not found' });
      return;
    }
    
    // Remove the model definition
    const modelRegex = new RegExp(`model ${tableName} {[\\s\\S]*?}\\s*`, 'g');
    const updatedSchema = schemaContent.replace(modelRegex, '');
    
    // Write the updated schema back to the file
    fs.writeFileSync(SCHEMA_PATH, updatedSchema);
    
    // Apply the schema changes
    await applySchemaChanges();
    
    res.status(200).json({ message: 'Table deleted successfully' });
  } catch (error) {
    console.error('Error deleting table:', error);
    res.status(500).json({ error: 'Failed to delete table' });
  }
};

/**
 * Helper function to parse models from schema
 */
function parseModels(schemaContent: string) {
  const models: Array<{
    id: string;
    name: string;
    description: string;
    fields: number;
    lastUpdated: string;
  }> = [];
  
  // Regular expression to match model definitions
  const modelRegex = /model\s+(\w+)\s+{([\s\S]*?)}/g;
  
  let match;
  let id = 1;
  
  while ((match = modelRegex.exec(schemaContent)) !== null) {
    const name = match[1];
    const modelBody = match[2];
    
    // Count fields (lines that don't start with whitespace followed by //)
    const fieldLines = modelBody
      .split('\n')
      .filter(line => line.trim() && !line.trim().startsWith('//'));
    
    // Extract description from comments if available
    const descriptionMatch = modelBody.match(/\/\/\s*Description:\s*(.*)/);
    const description = descriptionMatch ? descriptionMatch[1] : '';
    
    models.push({
      id: id.toString(),
      name,
      description,
      fields: fieldLines.length,
      lastUpdated: new Date().toISOString()
    });
    
    id++;
  }
  
  return models;
}

/**
 * Helper function to parse fields for a specific model
 */
function parseModelFields(schemaContent: string, modelName: string) {
  // Regular expression to match the specific model
  const modelRegex = new RegExp(`model\\s+${modelName}\\s+{([\\s\\S]*?)}`, 'g');
  const match = modelRegex.exec(schemaContent);
  
  if (!match) return null;
  
  const modelBody = match[1];
  const fields: Array<{
    id: string;
    name: string;
    type: string;
    required: boolean;
    unique: boolean;
    default: string;
    description: string;
  }> = [];
  
  // Extract description from comments if available
  const descriptionMatch = modelBody.match(/\/\/\s*Description:\s*(.*)/);
  const description = descriptionMatch ? descriptionMatch[1] : '';
  
  // Parse each field line
  const fieldLines = modelBody.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));
  
  fieldLines.forEach((line, index) => {
    const lineParts = line.trim().split(/\s+/);
    if (lineParts.length < 2) return;
    
    const name = lineParts[0];
    let type = lineParts[1];
    const required = !type.endsWith('?');
    
    // Remove ? from type if it's optional
    if (!required) {
      type = type.substring(0, type.length - 1);
    }
    
    // Check for unique attribute
    const unique = line.includes('@unique');
    
    // Extract default value if available
    const defaultMatch = line.match(/@default\(([^)]+)\)/);
    const defaultValue = defaultMatch ? defaultMatch[1] : '';
    
    // Extract description from inline comment if available
    const commentMatch = line.match(/\/\/\s*(.*)/);
    const fieldDescription = commentMatch ? commentMatch[1] : '';
    
    fields.push({
      id: (index + 1).toString(),
      name,
      type,
      required,
      unique,
      default: defaultValue,
      description: fieldDescription
    });
  });
  
  return {
    name: modelName,
    description,
    fields
  };
}

/**
 * Helper function to generate model definition
 */
function generateModelDefinition(name: string, description: string, fields: any[]) {
  let modelDef = `model ${name} {`;
  
  // Add description as comment if available
  if (description) {
    modelDef = `// Description: ${description}\n${modelDef}`;
  }
  
  // Add each field
  fields.forEach(field => {
    let fieldLine = `\n  ${field.name} ${field.type}`;
    
    // Add ? for optional fields
    if (!field.required) {
      fieldLine += '?';
    }
    
    // Add attributes
    const attributes = [];
    
    if (field.unique) {
      attributes.push('@unique');
    }
    
    if (field.default) {
      attributes.push(`@default(${field.default})`);
    }
    
    if (attributes.length > 0) {
      fieldLine += ` ${attributes.join(' ')}`;
    }
    
    // Add description as comment if available
    if (field.description) {
      fieldLine += ` // ${field.description}`;
    }
    
    modelDef += fieldLine;
  });
  
  // Close model definition
  modelDef += '\n}\n';
  
  return modelDef;
}

/**
 * Apply schema changes using Prisma migrate
 */
async function applySchemaChanges() {
  try {
    console.log("Starting schema migration process...");
    
    // First generate the Prisma client to validate the schema
    console.log("Generating Prisma client to validate schema...");
    const generateCommand = 'npx prisma generate';
    const { stdout: genStdout, stderr: genStderr } = await execPromise(generateCommand);
    
    console.log('Generation stdout:', genStdout);
    if (genStderr) console.error('Generation stderr:', genStderr);
    
    // Then run the migration
    console.log("Running Prisma migration...");
    const migrateCommand = 'npx prisma migrate dev --name schema-update --create-only';
    const { stdout, stderr } = await execPromise(migrateCommand);
    
    console.log('Migration stdout:', stdout);
    if (stderr) console.error('Migration stderr:', stderr);
    
    // Apply the migration
    console.log("Applying migration...");
    const applyCommand = 'npx prisma migrate dev';
    await execPromise(applyCommand);
    
    // Disconnect and reconnect Prisma client to reload the schema
    await prisma.$disconnect();
    
    // Generate Prisma client again with updated schema
    console.log("Regenerating Prisma client with updated schema...");
    await execPromise(generateCommand);
    
    console.log("Schema changes applied successfully");
    return true;
  } catch (error) {
    console.error('Error applying schema changes:', error);
    throw error;
  }
}

export const getDataTypes = async (req: Request, res: Response): Promise<void> => {
  const dataTypes = [
    'String', 'Int', 'Float', 'Boolean', 'DateTime', 
    'Json', 'BigInt', 'Decimal', 'Bytes'
  ];
  
  res.status(200).json(dataTypes);
}; 