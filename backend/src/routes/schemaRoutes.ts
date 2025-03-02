import express from 'express';
import { protect, admin } from '../middleware/authMiddleware';
import {
  getTables,
  getTableFields,
  createTable,
  updateTable,
  deleteTable,
  getDataTypes
} from '../controllers/schemaController';

const router = express.Router();

// All schema management routes require authentication and admin role
router.use(protect);
router.use(admin);

// Route definitions
router.get('/tables', getTables);
router.get('/data-types', getDataTypes);
router.get('/tables/:tableName', getTableFields);
router.post('/tables', createTable);
router.put('/tables/:tableName', updateTable);
router.delete('/tables/:tableName', deleteTable);

export default router; 