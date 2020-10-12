import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/login', authUser)
router.route('/').post(registerUser)
router.route('/profile').get(authMiddleware, getUserProfile)

export default router
