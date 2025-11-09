import express from 'express';
import { test, updateUser, deleteUser, signout, getUserPosts, getAllUsers } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test );
router.get('/', getAllUsers);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/posts/:id', verifyToken, getUserPosts)


export default router;