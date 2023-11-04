import { Request, Response } from 'express'
import asyncWrapper from '../middleware/async'

export const createProduct = asyncWrapper(
  async (req: Request, res: Response) => {
    res.send('function name')
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
