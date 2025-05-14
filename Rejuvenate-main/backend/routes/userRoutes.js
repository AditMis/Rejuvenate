//using router.js which provides an API for handling routes

import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userControllers.js';
import { admin, authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(registerUser).get(authMiddleware, admin, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUserProfile);
router
  .route('/:id')
  .delete(authMiddleware, admin, deleteUser)
  .get(authMiddleware, admin, getUserById)
  .put(authMiddleware, admin, updateUser);

export default router;
