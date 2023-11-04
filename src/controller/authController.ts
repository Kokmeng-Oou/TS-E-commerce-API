import { Request, Response } from 'express'
import User from '../models/User'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors'
import asyncWrapper from '../middleware/async'
import { UserType, TokenUserType } from '../types/user-type'
import { attachCookiesToResponse, createTokenUser } from '../utils'

export const register = asyncWrapper(async (req: Request, res: Response) => {
  const { username, email, password }: UserType = req.body

  if (!username || !email)
    throw new BadRequestError('Username and Email are required')
  if (await User.findOne({ email }))
    throw new BadRequestError('Email already Existed')
  if (await User.findOne({ username }))
    throw new BadRequestError('username already Existed')

  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  const user = await User.create({ username, email, password, role })
  const tokenUser: TokenUserType = createTokenUser(user)
  //cookie
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser })
})

export const login = asyncWrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!password || !email)
    throw new BadRequestError('Email and Password are required')
  const userEmail = await User.findOne({ email }).exec()
  if (!userEmail) throw new UnauthenticatedError('Invalid Credentials')
  const isPasswordMatch: boolean = await userEmail.comparePassword(
    req.body.password
  )
  if (!isPasswordMatch) throw new UnauthenticatedError('Invalid Credentials')
  const tokenUser: TokenUserType = createTokenUser(userEmail)
  //cookie
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.OK).json({ user: tokenUser })
})
export const logout = async (req: Request, res: Response) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 1000),
  })
  res.status(StatusCodes.OK).send({ msg: 'user logged out' })
}
