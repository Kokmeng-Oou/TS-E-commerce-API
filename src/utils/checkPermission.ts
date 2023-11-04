import { UnauthorizedError } from '../errors'
import { TokenUserType } from '../types/user-type'

const checkPermissions = (
  requestUser: TokenUserType,
  resourceUserId: TokenUserType
) => {
  if (requestUser.role === 'admin') return
  if (requestUser.userId === resourceUserId.userId.toString()) return
  throw new UnauthorizedError("You don't have permission to do this action")
}

export default checkPermissions
