import express from 'express'
import {
  getProductById,
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
} from '../controllers/productController.js'

import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(authMiddleware, isAdmin, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(authMiddleware, isAdmin, deleteProduct)
  .put(authMiddleware, isAdmin, updateProduct)

export default router
