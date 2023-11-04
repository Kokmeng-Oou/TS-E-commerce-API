import asyncWrapper from '../middleware/async'
import { Request, Response } from 'express'
import Review from '../models/Review'
import Product from '../models/Product'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors'
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
      .populate({
        path: 'product',
        select: 'name company price',
      })
      .populate({
        path: 'user',
        select: 'name email',
      })
      .exec()
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
    const { id: reviewId } = req.params
    const { rating, title, comment } = req.body
    const review = await Review.findOne({
      _id: reviewId,
    })
    if (!review) throw new NotFoundError('Review not found')
    // Check permissions
    checkPermissions((req as any).user, review.user)
    let updatedRating = rating ?? review.rating
    let updatedTitle = title ?? review.title
    let updatedComment = comment ?? review.comment
    await Review.updateOne(
      { _id: reviewId },
      {
        $set: {
          rating: updatedRating,
          title: updatedTitle,
          comment: updatedComment,
        },
      },
      {
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        returnOriginal: false,
      }
    )
    res.status(StatusCodes.ACCEPTED).json({
      msg: 'Review successfully updated',
    })
  }
)

const deleteReview = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { id: reviewId } = req.params
    const review = await Review.findOne({ _id: reviewId })
    if (!review) throw new NotFoundError('Review not found')
    checkPermissions((req as any).user, review.user)
    await review.deleteOne()
    res.status(StatusCodes.OK).json({ msg: 'Successfully delete the review' })
  }
)

const getSingleProductReviews = asyncWrapper(
  async (req: Request, res: Response) => {
    const productId = req.params.id?.toString() || ''
    const reviews = await Review.find({ product: productId })
    res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
  }
)

export {
  deleteReview,
  updateReview,
  getSingleReview,
  getAllReview,
  createReview,
  getSingleProductReviews,
}
