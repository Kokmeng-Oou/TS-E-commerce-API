import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import asyncWrapper from '../middleware/async'
import Product from '../models/Product'
import { CustomAPIError } from '../errors'

export const createProduct = asyncWrapper(
  async (req: Request, res: Response) => {
    req.body.user = (req as any).user.userId
    const newProduct = await Product.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ newProduct })
  }
)

export const getAllProducts = asyncWrapper(
  async (req: Request, res: Response) => {
    res.send('function name')
  }
)

export const getSingleProduct = asyncWrapper(
  async (req: Request, res: Response) => {
    res.send('function name')
  }
)

export const updateProduct = asyncWrapper(
  async (req: Request, res: Response) => {
    res.send('function name')
  }
)

export const deleteProduct = asyncWrapper(
  async (req: Request, res: Response) => {
    res.send('function name')
  }
)

export const uploadImage = asyncWrapper(async (req: Request, res: Response) => {
  res.send('function name')
})
