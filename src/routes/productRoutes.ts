import { Router } from 'express'
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from '../controller/productsController'

import { getSingleProductReviews } from '../controller/reviewController'

import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication'

const router = Router()

router
  .route('/')
  .get(getAllProducts)
  .post([authenticateUser, authorizePermissions('admin')], createProduct)

router
  .route('/uploadImage')
  .post([authenticateUser, authorizePermissions('admin')], uploadImage)
router
  .route('/:id')
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermissions('admin')], updateProduct)
  .delete([authenticateUser, authorizePermissions('admin')], deleteProduct)

router.route('/:id/reviews').get(getSingleProductReviews)

export default router
