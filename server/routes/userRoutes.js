import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/login', authUser)
router.route('/').post(registerUser)
router
  .route('/profile')
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUserProfile)

export default router
