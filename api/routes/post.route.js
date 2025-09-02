import express from 'express';
import { createPost, deletePost, getAllPosts, getPost, updatePost, approvePost } from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createPost);
router.delete('/delete/:id', verifyToken, deletePost);
router.post('/update/:id', verifyToken, updatePost);
router.get('/get/:id', getPost);
// Public list: approved only
router.get('/get', getAllPosts);
// Admin list with includeUnapproved=true support (auth required)
router.get('/admin/get', verifyToken, getAllPosts);
router.post('/approve/:id', verifyToken, approvePost);

export default router;