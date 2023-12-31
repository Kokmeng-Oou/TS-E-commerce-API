import { Request, Response } from 'express'
import User from '../models/User'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors'
import asyncWrapper from '../middleware/async'
import {
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
} from '../utils'

export const getAllUser = asyncWrapper(async (req: Request, res: Response) => {
  const users = await User.find({ role: 'user' }).select('-password')
  res.status(StatusCodes.OK).json({ users })
})

export const getSingleUser = asyncWrapper(
  async (req: Request, res: Response) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password')
    if (!user) {
      throw new NotFoundError(`No user with id ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({ user })
  }
)

export const ShowCurrentUser = asyncWrapper(
  async (req: Request, res: Response) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password')
    if (!user) throw new NotFoundError(`No user with id: ${req.params.id}`)
    checkPermissions((req as any).user, user._id)
    res.status(StatusCodes.OK).json({ user: (req as any).user })
  }
)

export const updateUser = asyncWrapper(async (req: Request, res: Response) => {
  const { email, username } = req.body
  if (!email || !username)
    throw new BadRequestError('Please provide all values')
  const user = await User.findOneAndUpdate(
    { _id: (req as any).user.userId },
    { email, username },
    { new: true, runValidators: true, select: '-password' } // don't return password hash
  )
  const TokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: TokenUser })
  res.status(StatusCodes.OK).json({ user: TokenUser })
})

export const updateUserPassword = asyncWrapper(
  async (req: Request, res: Response) => {
    const { prevPassword, currentPassword } = req.body
    if (!prevPassword || !currentPassword)
      throw new BadRequestError('Please provide both.value')

    const user = await User.findOne({ _id: (req as any).user.userId })
    if (!user)
      throw new UnauthenticatedError(
        'You are not logged in or your session has expired!'
      )
    const isPrevPasswordMatch: boolean = await user.comparePassword(
      prevPassword
    )
    if (!isPrevPasswordMatch)
      throw new UnauthenticatedError('Invalid Credentials')

    user.password = currentPassword
    await user.save()
    res.status(StatusCodes.OK).json({ msg: 'Password successfully updated' })
  }
)
