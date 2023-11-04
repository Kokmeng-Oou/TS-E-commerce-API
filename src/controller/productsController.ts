import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import asyncWrapper from '../middleware/async'
import Product from '../models/Product'
import { CustomAPIError, NotFoundError } from '../errors'

export const createProduct = asyncWrapper(
  async (req: Request, res: Response) => {
    req.body.user = (req as any).user.userId
    const newProduct = await Product.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ newProduct })
  }
)

export const getAllProducts = asyncWrapper(
  async (req: Request, res: Response) => {
    const products = await Product.find({})
    res.status(StatusCodes.OK).json({ products, count: products.length })
  }
)

export const getSingleProduct = asyncWrapper(
  async (req: Request, res: Response) => {
    const { id: productId } = req.params
    const product = await Product.findById({ _id: productId })
    if (!product) throw new NotFoundError('No such product exists')
    res.status(StatusCodes.OK).json({ product })
  }
)

export const updateProduct = asyncWrapper(
  async (req: Request, res: Response) => {
    const { id: productId } = req.params
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!product) throw new NotFoundError('No such product exists')
    res.status(StatusCodes.OK).json({ product })
  }
)

export const deleteProduct = asyncWrapper(
  async (req: Request, res: Response) => {
    const { id: productId } = req.params
    const product = await Product.findOne({ _id: productId })
    if (!product) throw new NotFoundError('No such product exists')
    await product?.deleteOne()
    res.status(StatusCodes.OK).json({ msg: 'products successfully removed' })
  }
)

export const uploadImage = asyncWrapper(async (req: Request, res: Response) => {
  res.send('function name')
})
