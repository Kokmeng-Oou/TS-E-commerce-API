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

router
  .route('/')
  .get(authenticateUser, authorizePermissions('admin', 'owner'), getAllUser)
router.route('/showMe').get(authenticateUser, ShowCurrentUser)
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword)
router.route('/:id').get(authenticateUser, getSingleUser)

export default router
