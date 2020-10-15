import express from 'express'
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getUserOrders,
} from '../controllers/orderController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.route('/').post(authMiddleware, addOrderItems)
router.route('/userorders').get(authMiddleware, getUserOrders)
router.route('/:id').get(authMiddleware, getOrderById)
router.route('/:id/pay').put(authMiddleware, updateOrderToPaid)

export default router
