//using router.js which provides an API for handling routes

import express from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProducts,
  getProductsById,
  updateProduct,
} from '../controllers/productControllers.js';
import { authMiddleware, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(authMiddleware, admin, createProduct);
router.route('/:id/reviews').post(authMiddleware, createProductReview);
router
  .route('/:id')
  .get(getProductsById)
  .delete(authMiddleware, admin, deleteProduct)
  .put(authMiddleware, admin, updateProduct);

export default router;
