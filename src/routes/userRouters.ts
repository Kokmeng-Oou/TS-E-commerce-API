import { Router } from 'express'
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication'
import {
  getAllUser,
  getSingleUser,
  ShowCurrentUser,
  updateUser,
  updateUserPassword,
} from '../controller/userController'

const router: Router = Router()

router.route('/').get(authenticateUser, authorizePermissions, getAllUser)
router.route('/showMe').get(ShowCurrentUser)
router.route('/updateUser').get(updateUser)
router.route('/updateUserPassword').get(updateUserPassword)
router.route('/:id').get(authenticateUser, getSingleUser)

export default router
