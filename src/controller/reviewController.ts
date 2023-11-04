import asyncWrapper from '../middleware/async'
import { Request, Response } from 'express'
import Review from '../models/Review'
import Product from '../models/Product'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors'
import { checkPermissions } from '../utils'

const createReview = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { product: productId } = req.body
    const isValidProduct = await Product.findOne({ _id: productId })
    if (!isValidProduct)
      throw new NotFoundError(`No products with id : ${productId}`)

    const alreadySubmitted = await Review.findOne({
      product: productId,
      user: (req as any).user._id,
    })
    if (alreadySubmitted)
      throw new NotFoundError(`Already Submitted review for this product`)

    req.body.user = (req as any).user.userId
    const review = await Review.create(req.body)
    res.status(StatusCodes.CREATED).json({ review })
  }
)

const getAllReview = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const reviews = await Review.find({})
    res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
  }
)

const getSingleReview = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { id: reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review) throw new NotFoundError('Review not found')
    res.status(StatusCodes.OK).json({ review })
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
