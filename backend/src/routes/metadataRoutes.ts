import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { pool, DatabaseTable, DatabaseField } from '../services/postgresService';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Get all tables
router.get('/tables', async (req, res) => {
  try {
    const query = `
      SELECT 
        table_name as name,
        table_name as id,
        table_name as displayName,
        obj_description((quote_ident(table_name))::regclass) as description,
        false as isSystem
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;
    
    const { rows: tables } = await pool.query(query);
    
    // For each table, get its fields
    const tablesWithFields = await Promise.all(tables.map(async (table: Partial<DatabaseTable>) => {
      const fieldsQuery = `
        SELECT 
          column_name as name,
          column_name as id,
          column_name as displayName,
          data_type as type,
          col_description((table_schema || '.' || table_name)::regclass, ordinal_position) as description,
          is_nullable = 'YES' as isRequired,
          column_default as defaultValue,
          false as isSystem
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = $1
        ORDER BY ordinal_position;
      `;
      
      const { rows: fields } = await pool.query(fieldsQuery, [table.name]);
      return { ...table, fields } as DatabaseTable;
    }));
    
    res.json(tablesWithFields);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error getting tables:', error);
    res.status(500).json({ message: `Failed to get tables: ${errorMessage}` });
  }
});

// Get table by name
router.get('/tables/:tableName', async (req, res) => {
  try {
    const { tableName } = req.params;
    
    // Get table info
    const tableQuery = `
      SELECT 
        table_name as name,
        table_name as id,
        table_name as displayName,
        obj_description((quote_ident(table_name))::regclass) as description,
        false as isSystem
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      AND table_name = $1;
    `;
    
    const { rows: tables } = await pool.query(tableQuery, [tableName]);
    if (tables.length === 0) {
      return res.status(404).json({ message: 'Table not found' });
    }
    
    // Get fields for the table
    const fieldsQuery = `
      SELECT 
        column_name as name,
        column_name as id,
        column_name as displayName,
        data_type as type,
        col_description((table_schema || '.' || table_name)::regclass, ordinal_position) as description,
        is_nullable = 'YES' as isRequired,
        column_default as defaultValue,
        false as isSystem
      FROM information_schema.columns
      WHERE table_schema = 'public'
      AND table_name = $1
      ORDER BY ordinal_position;
    `;
    
    const { rows: fields } = await pool.query(fieldsQuery, [tableName]);
    const table = { ...tables[0], fields } as DatabaseTable;
    
    res.json(table);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error getting table:', error);
    res.status(500).json({ message: `Failed to get table: ${errorMessage}` });
  }
});

// Get fields for a table
router.get('/tables/:tableName/fields', async (req, res) => {
  try {
    const { tableName } = req.params;
    
    const query = `
      SELECT 
        column_name as name,
        column_name as id,
        column_name as displayName,
        data_type as type,
        col_description((table_schema || '.' || table_name)::regclass, ordinal_position) as description,
        is_nullable = 'YES' as isRequired,
        column_default as defaultValue,
        false as isSystem
      FROM information_schema.columns
      WHERE table_schema = 'public'
      AND table_name = $1
      ORDER BY ordinal_position;
    `;
    
    const { rows: fields } = await pool.query(query, [tableName]);
    res.json(fields as DatabaseField[]);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error getting fields:', error);
    res.status(500).json({ message: `Failed to get fields: ${errorMessage}` });
  }
});

// Get field types
router.get('/field-types', async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT data_type as type
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY data_type;
    `;
    
    const { rows } = await pool.query(query);
    const types = rows.map((row: { type: string }) => row.type);
    res.json(types);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error getting field types:', error);
    res.status(500).json({ message: `Failed to get field types: ${errorMessage}` });
  }
});

export default router; 