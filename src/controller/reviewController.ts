import asyncWrapper from '../middleware/async'
import { Request, Response } from 'express'

const createReview = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    res.send('createReview')
  }
)

const getAllReview = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    res.send('getAllReview')
  }
)

const getSingleReview = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    res.send('getSingleReview')
  }
)

const updateReview = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    res.send('updateReview')
  }
)

const deleteReview = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    res.send('deleteReview')
  }
)

export {
  deleteReview,
  updateReview,
  getSingleReview,
  getAllReview,
  createReview,
}
