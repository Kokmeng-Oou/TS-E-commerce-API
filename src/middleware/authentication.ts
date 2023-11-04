import { NextFunction, Request, Response } from 'express'
import {
  CustomAPIError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors'
import { isTokenValid } from '../utils'
import { JwtPayload } from 'jsonwebtoken'

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.signedCookies.token
  if (!token) throw new UnauthenticatedError('Authentication Invalid')
  try {
    const decoded = isTokenValid(token)
    if (!decoded || typeof decoded === 'string')
      throw new Error('Invalid token')
    const { username, userId, role } = decoded
    /*This line of code is using a type assertion to cast the req object to any,
    which means that TypeScript will not check the type of the req object or its properties.
    This allows the code to assign a new property called user to the req object,
    with the value of an object that contains the username, userId, and role properties.
    This is a way to bypass the TypeScript type system and add custom properties to the req object,
    which may be useful for some middleware or authentication purposes.
    However, this is not a recommended practice, as it may cause runtime errors or unexpected behavior
    if the req object does not have the expected shape or the user property is not defined properly.*/
    ;(req as any).user = { username, userId, role }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid')
  }
}

export const authorizePermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Get permissions from request body
  try {
    if ((req as any).user?.role !== 'admin')
      throw new UnauthorizedError('Unauthorized to access this route')
    next()
  } catch (error) {
    throw new UnauthorizedError('Unauthorized to access this route')
  }
}
