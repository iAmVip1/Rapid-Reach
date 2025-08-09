import express from 'express';
import { test, updateUser, deleteUser, signout, uploadProfileImage, getUserPosts,} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.get('/test', test );
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.post('/upload-image', verifyToken, upload.single('image'), uploadProfileImage);
router.get('/posts/:id', verifyToken, getUserPosts)


export default router;