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
    
    // Validate model name - must start with uppercase letter and be alphanumeric
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
      res.status(400).json({ 
        error: 'Invalid table name', 
        message: 'Table name must start with an uppercase letter and contain only alphanumeric characters.'
      });
      return;
    }
    
    // Validate fields - each field must have a name and type
    for (const field of fields) {
      if (!field.name || !field.type) {
        res.status(400).json({ 
          error: 'Invalid field definition', 
          message: 'Each field must have a name and type.'
        });
        return;
      }
      
      // Field names should be alphanumeric and start with lowercase
      if (!/^[a-z][a-zA-Z0-9]*$/.test(field.name)) {
        res.status(400).json({ 
          error: 'Invalid field name', 
          field: field.name,
          message: 'Field names must start with a lowercase letter and contain only alphanumeric characters.'
        });
        return;
      }
    }
    
    console.log(`Creating new table '${name}' with ${fields.length} fields`);
    const schemaContent = fs.readFileSync(SCHEMA_PATH, 'utf8');
    const existingTables = parseModels(schemaContent);
    
    if (existingTables.some((table) => table.name.toLowerCase() === name.toLowerCase())) {
      res.status(400).json({ error: 'Table already exists' });
      return;
    }
    
    // Generate the model definition
    const modelDefinition = generateModelDefinition(name, description, fields);
    console.log('Generated model definition:', modelDefinition);
    
    // Add the new model to the schema
    const updatedSchema = `${schemaContent}\n${modelDefinition}`;
    
    // Write the updated schema back to the file
    fs.writeFileSync(SCHEMA_PATH, updatedSchema);
    
    try {
      // Apply the schema changes
      await applySchemaChanges();
      
      // Return successful response with table details
      res.status(201).json({ 
        message: 'Table created successfully',
        table: {
          name,
          description,
          fieldCount: fields.length
        }
      });
    } catch (schemaError) {
      console.error('Schema change error:', schemaError);
      
      // Attempt to restore the original schema if the change failed
      try {
        fs.writeFileSync(SCHEMA_PATH, schemaContent);
        console.log('Restored original schema after failed schema change');
      } catch (restoreError) {
        console.error('Failed to restore original schema:', restoreError);
      }
      
      res.status(500).json({ 
        error: 'Failed to apply schema changes',
        message: schemaError instanceof Error ? schemaError.message : 'Unknown error during schema update'
      });
    }
  } catch (error) {
    console.error('Error creating table:', error);
    res.status(500).json({ 
      error: 'Failed to create table',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Update an existing table (add/modify/remove fields)
 */
export const updateTable = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tableName } = req.params;
    const { fields, newName, description, addField, updateField, deleteField } = req.body;
    
    // Read the current schema
    const schemaContent = fs.readFileSync(SCHEMA_PATH, 'utf8');
    
    // Find the model and its current fields
    const modelInfo = parseModelFields(schemaContent, tableName);
    
    if (!modelInfo) {
      res.status(404).json({ error: 'Table not found' });
      return;
    }

    let updatedFields = [...modelInfo.fields];
    
    // Handle add field operation
    if (addField) {
      // Validate field
      if (!addField.name || !addField.type) {
        res.status(400).json({ error: 'Invalid field data' });
        return;
      }
      
      // Check if field already exists
      if (updatedFields.some(f => f.name === addField.name)) {
        res.status(400).json({ error: 'Field already exists' });
        return;
      }
      
      // Add the new field
      updatedFields.push({
        id: (updatedFields.length + 1).toString(),
        ...addField
      });
    }
    // Handle update field operation
    else if (updateField && updateField.oldName) {
      const index = updatedFields.findIndex(f => f.name === updateField.oldName);
      if (index === -1) {
        res.status(404).json({ error: 'Field not found' });
        return;
      }
      
      // Update the field, preserving the id
      updatedFields[index] = {
        ...updatedFields[index],
        name: updateField.name || updatedFields[index].name,
        type: updateField.type || updatedFields[index].type,
        required: updateField.required !== undefined ? updateField.required : updatedFields[index].required,
        unique: updateField.unique !== undefined ? updateField.unique : updatedFields[index].unique,
        default: updateField.default !== undefined ? updateField.default : updatedFields[index].default,
        description: updateField.description || updatedFields[index].description
      };
    }
    // Handle delete field operation
    else if (deleteField) {
      updatedFields = updatedFields.filter(f => f.name !== deleteField);
    }
    
    // Generate updated model definition
    const updatedDefinition = generateModelDefinition(
      newName || tableName,
      description || modelInfo.description,
      fields || updatedFields
    );
    
    // Replace the old model definition with the new one
    const modelRegex = new RegExp(`model ${tableName} {[\\s\\S]*?}\\s*`, 'g');
    const updatedSchema = schemaContent.replace(modelRegex, updatedDefinition);
    
    // Write the updated schema back to the file
    fs.writeFileSync(SCHEMA_PATH, updatedSchema);
    
    // Apply the schema changes
    await applySchemaChanges();
    
    // Get updated fields for the response
    const updatedModelInfo = parseModelFields(fs.readFileSync(SCHEMA_PATH, 'utf8'), newName || tableName);
    
    res.status(200).json({ 
      message: 'Table updated successfully',
      fields: updatedModelInfo ? updatedModelInfo.fields : []
    });
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
export function parseModels(schemaContent: string) {
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
export function parseModelFields(schemaContent: string, modelName: string) {
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
  
  // Check if an id field exists
  const hasIdField = fields.some(field => field.name === 'id' && field.isPrimary);
  
  // Add id field as first field if it doesn't exist
  if (!hasIdField) {
    modelDef += `\n  id String @id @default(uuid()) // Primary key`;
  }
  
  // Add each field
  fields.forEach(field => {
    // Skip if this is an automatically added id field
    if (field.name === 'id' && field.isPrimary && hasIdField) {
      // Convert user-defined id field to ensure it has @id attribute
      let fieldLine = `\n  ${field.name} ${field.type}`;
      
      // For id fields, always make them required
      const attributes = ['@id'];
      
      if (field.default || field.defaultValue) {
        // Ensure default function calls are properly parenthesized
        let defaultValue = field.default || field.defaultValue;
        if (defaultValue.includes('(') && !defaultValue.includes(')')) {
          defaultValue += ')';
        }
        attributes.push(`@default(${defaultValue})`);
      } else {
        // Add default uuid generator if it's a string id
        if (field.type === 'String') {
          attributes.push('@default(uuid())');
        } else if (field.type === 'Int') {
          attributes.push('@default(autoincrement())');
        }
      }
      
      if (attributes.length > 0) {
        fieldLine += ` ${attributes.join(' ')}`;
      }
      
      // Add description as comment if available
      if (field.description) {
        fieldLine += ` // ${field.description}`;
      } else {
        fieldLine += ` // Primary key`;
      }
      
      modelDef += fieldLine;
    }
    // Process regular fields (non-id or when id already exists)
    else if (!hasIdField && field.name === 'id') {
      // Skip the id field since we already added it
      return;
    } 
    else {
      let fieldLine = `\n  ${field.name} ${field.type}`;
      
      // Add ? for optional fields
      if (!field.required && !field.isRequired) {
        fieldLine += '?';
      }
      
      // Add attributes
      const attributes = [];
      
      if (field.unique || field.isUnique) {
        attributes.push('@unique');
      }
      
      if (field.default || field.defaultValue) {
        // Ensure default function calls are properly parenthesized
        let defaultValue = field.default || field.defaultValue;
        if (defaultValue.includes('(') && !defaultValue.includes(')')) {
          defaultValue += ')';
        }
        attributes.push(`@default(${defaultValue})`);
      }
      
      if (attributes.length > 0) {
        fieldLine += ` ${attributes.join(' ')}`;
      }
      
      // Add description as comment if available
      if (field.description) {
        fieldLine += ` // ${field.description}`;
      }
      
      modelDef += fieldLine;
    }
  });
  
  // Close model definition
  modelDef += '\n}\n';
  
  return modelDef;
}

/**
 * Apply schema changes using Prisma
 */
async function applySchemaChanges() {
  try {
    console.log("Starting schema update process...");
    
    // First generate the Prisma client to validate the schema
    console.log("Generating Prisma client to validate schema...");
    try {
      const generateCommand = 'npx prisma generate';
      const { stdout: genStdout, stderr: genStderr } = await execPromise(generateCommand);
      
      console.log('Generation stdout:', genStdout);
      if (genStderr) {
        console.error('Generation stderr:', genStderr);
        
        // Check for specific error messages related to model validation
        if (genStderr.includes('Error validating model') && genStderr.includes('unique criteria')) {
          throw new Error('Schema validation failed: Each model must have an ID field with @id attribute that is required.');
        }
      }
    } catch (genError) {
      console.error('Error generating Prisma client:', genError);
      throw genError;
    }
    
    // Use prisma db push which is more reliable for dynamic schema changes
    // It doesn't require interactive prompts and can automatically apply changes
    console.log("Pushing schema changes to database...");
    try {
      const pushCommand = 'npx prisma db push --accept-data-loss';
      const { stdout, stderr } = await execPromise(pushCommand);
      
      console.log('DB Push stdout:', stdout);
      if (stderr) console.error('DB Push stderr:', stderr);
    } catch (pushError) {
      console.error('Error pushing schema to database:', pushError);
      throw pushError;
    }
    
    // Disconnect and reconnect Prisma client to reload the schema
    await prisma.$disconnect();
    
    // Generate Prisma client again with updated schema
    console.log("Regenerating Prisma client with updated schema...");
    await execPromise('npx prisma generate');
    
    // Create a new instance of PrismaClient to use the updated schema
    const newPrismaClient = new PrismaClient();
    Object.assign(prisma, newPrismaClient);
    
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