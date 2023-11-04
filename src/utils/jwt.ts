import jwt from 'jsonwebtoken'
import env from '../types/env'

export const createJWT = ({ payload }: any) => {
  const token: string = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.EXPIRES_IN,
  })
  return token
}

export const isTokenValid = (token: string) => jwt.verify(token, env.JWT_SECRET)

export const attachCookiesToResponse = ({ res, user }: any) => {
  const token = createJWT({ payload: user })
  const oneDay = 1000 * 60 * 60 * 24
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  })
}
