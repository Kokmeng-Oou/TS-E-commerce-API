import { Request, Response } from 'express'
import User from '../models/User'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError, UnauthenticatedError } from '../errors'
import asyncWrapper from '../middleware/async'

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
    res.status(StatusCodes.OK).json({ user: (req as any).user })
  }
)

export const updateUser = asyncWrapper(async (req: Request, res: Response) => {
  res.send('update all user')
})

export const updateUserPassword = asyncWrapper(
  async (req: Request, res: Response) => {
    res.send('update all user password')
  }
)
