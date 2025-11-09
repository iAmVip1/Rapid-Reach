import express from 'express';
import { createDrive, deleteDrive, getAllDrives, getDrive, updateDrive, approveDrive } from '../controllers/drive.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createDrive);
router.delete('/delete/:id', verifyToken, deleteDrive);
router.post('/update/:id', verifyToken, updateDrive);
router.get('/get/:id', getDrive);
// Public list: approved only
router.get('/get', getAllDrives);
// Admin list with includeUnapproved=true support (auth required)
router.get('/admin/get', verifyToken, getAllDrives);
router.post('/approve/:id', verifyToken, approveDrive);

export default router;

