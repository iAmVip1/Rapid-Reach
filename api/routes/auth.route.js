import express from 'express';
import { signin, signup } from '../controllers/auth.controller.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/signup', upload.single('profilePicture'), signup);
router.post('/signin', signin);

export default router;
