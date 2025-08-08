import express from 'express';
import { google, signin, signup } from '../controllers/auth.controller.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/signup', upload.single('profilePicture'), signup);
router.post('/signin', signin);
router.post('/google', google);

export default router;
