import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  getAllWidgets,
  getWidgetById,
  createWidget,
  updateWidget,
  deleteWidget,
  getWidgetsByCollection,
} from '../controllers/widgetController';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Widget routes
router.route('/')
  .get(getAllWidgets)
  .post(createWidget);

router.route('/:id')
  .get(getWidgetById)
  .put(updateWidget)
  .delete(deleteWidget);

router.get('/collection/:collection', getWidgetsByCollection);

export default router; 