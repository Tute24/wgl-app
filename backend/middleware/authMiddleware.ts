const jwt = require('jsonwebtoken')
import { Response, Request, NextFunction } from 'express'

interface tokenBody {
  id: string
}

export interface CustomRequest extends Request {
  authUser?: tokenBody
}

export default async function isAuthenticated(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY) as tokenBody

    if (!decodedToken.id) {
      res.status(401).json({ message: 'User not authenticated.' })
      return
    }

    req.authUser = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' })
  }
}
