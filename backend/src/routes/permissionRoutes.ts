import express from 'express';
import { protect, admin } from '../middleware/authMiddleware';
import {
  getRoleTablePermissions,
  getRoleFieldPermissions,
  setTablePermission,
  setFieldPermission,
  deleteTablePermission,
  deleteFieldPermission,
  getTablesWithPermissions,
  getFieldsWithPermissions
} from '../controllers/permissionController';

const router = express.Router();

// All permission routes require authentication and admin role
router.use(protect);
router.use(admin);

// Table permissions routes
router.get('/tables/:roleId', getTablesWithPermissions);
router.get('/tables/permissions/:roleId', getRoleTablePermissions);
router.post('/tables/:roleId', setTablePermission);
router.delete('/tables/:permissionId', deleteTablePermission);

// Field permissions routes
router.get('/fields/:roleId/:tableName', getFieldsWithPermissions);
router.get('/fields/permissions/:roleId/:tableName', getRoleFieldPermissions);
router.post('/fields/:roleId', setFieldPermission);
router.delete('/fields/:permissionId', deleteFieldPermission);

export default router; 