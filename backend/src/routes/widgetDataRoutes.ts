import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  getTableData,
  getFieldData,
  getFlowData,
  getProgressData,
} from '../services/widgetDataService';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Get table data
router.get('/:tableId', async (req, res) => {
  try {
    const data = await getTableData(req.params.tableId);
    res.json(data);
  } catch (error) {
    console.error('Error getting table data:', error);
    res.status(500).json({ message: 'Failed to get table data' });
  }
});

// Get field data
router.get('/:tableId/field/:fieldId', async (req, res) => {
  try {
    const data = await getFieldData(req.params.tableId, req.params.fieldId);
    res.json(data);
  } catch (error) {
    console.error('Error getting field data:', error);
    res.status(500).json({ message: 'Failed to get field data' });
  }
});

// Get flow data
router.get('/:tableId/flow/:fieldId', async (req, res) => {
  try {
    const data = await getFlowData(req.params.tableId, req.params.fieldId);
    res.json(data);
  } catch (error) {
    console.error('Error getting flow data:', error);
    res.status(500).json({ message: 'Failed to get flow data' });
  }
});

// Get progress data
router.get('/:tableId/progress/:fieldId', async (req, res) => {
  try {
    const data = await getProgressData(req.params.tableId, req.params.fieldId);
    res.json({ value: data });
  } catch (error) {
    console.error('Error getting progress data:', error);
    res.status(500).json({ message: 'Failed to get progress data' });
  }
});

export default router; 