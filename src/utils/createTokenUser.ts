import { TokenUserType } from '../types/user-type'

const createTokenUser = (user: any): TokenUserType => {
  return {
    username: user.username,
    userId: user._id,
    role: user.role,
  }
}

export default createTokenUser
