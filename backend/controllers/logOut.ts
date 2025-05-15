import express, { Router, Response } from 'express'
import isAuthenticated, {
  CustomRequest
} from '../middleware/authMiddleware'

const logOutRoute: Router = express.Router()

logOutRoute.get(
  '/logOut',
  isAuthenticated,
  async (
    req: CustomRequest,
    res: Response
  ): Promise<void> => {
    try {
      res
        .status(200)
        .json({ message: 'The user will be signed out.' })
    } catch (error) {
      res.status(500).json({ message: 'Server error.' })
    }
  }
)

export default logOutRoute
