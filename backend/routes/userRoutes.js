import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

//registreren
router.route('/').post(registerUser)

//login
router.post('/login', authUser)

//protectmiddleware wordt opgeroepen wanneer we deze onderstaande route opvragen
//indien er een put is wordt het andere deel van deze methode opgeroepen
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router
