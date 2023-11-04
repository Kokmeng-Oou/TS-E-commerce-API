import { Router } from 'express'
import { authenticateUser } from '../middleware/authentication'

import {
  deleteReview,
  updateReview,
  getSingleReview,
  getAllReview,
  createReview,
} from '../controller/reviewController'

const router = Router()

router.route('/').post(authenticateUser, createReview).get(getAllReview)
router
  .route('/:id')
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview)

export default router
