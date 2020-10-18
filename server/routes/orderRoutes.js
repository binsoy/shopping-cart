import express from 'express'
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUserOrders,
  getAllOrders,
} from '../controllers/orderController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'
const router = express.Router()

router
  .route('/')
  .post(authMiddleware, addOrderItems)
  .get(authMiddleware, isAdmin, getAllOrders)
router.route('/userorders').get(authMiddleware, getUserOrders)
router.route('/:id').get(authMiddleware, getOrderById)
router.route('/:id/pay').put(authMiddleware, updateOrderToPaid)
router
  .route('/:id/deliver')
  .put(authMiddleware, isAdmin, updateOrderToDelivered)

export default router
