//using router.js which provides an API for handling routes

import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} from '../controllers/orderControllers.js';
import { admin, authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router
  .route('/')
  .post(authMiddleware, addOrderItems)
  .get(authMiddleware, admin, getOrders);
router.route('/myorders').get(authMiddleware, getMyOrders);
router.route('/:id').get(authMiddleware, getOrderById);
router.route('/:id/pay').put(authMiddleware, updateOrderToPaid);
router.route('/:id/deliver').put(authMiddleware, admin, updateOrderToDelivered);

export default router;
