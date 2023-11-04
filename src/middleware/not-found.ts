import { Request, Response } from 'express'

const notFound = (req: Request, res: Response): void => {
  res.status(404).json({ error: 'Not Found' })
}

export default notFound
