import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js'

//routes worden hier gedefinieerd, opvraging gebeurt via de controllers

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router
