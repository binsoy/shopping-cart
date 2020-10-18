import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/login', authUser)
router.route('/').post(registerUser).get(authMiddleware, isAdmin, getAllUsers)
router
  .route('/profile')
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUserProfile)

router
  .route('/:id')
  .delete(authMiddleware, isAdmin, deleteUser)
  .get(authMiddleware, isAdmin, getUserById)
  .put(authMiddleware, isAdmin, updateUser)
export default router
