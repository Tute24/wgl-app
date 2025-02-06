import express, { Router, Response } from 'express'
import isAuthenticated from '../middleware/authMiddleware'
import { CustomRequest } from '../middleware/authMiddleware'
import { prisma } from '../app'
const logOutRoute: Router = express.Router()

logOutRoute.get(
  '/logOut',
  isAuthenticated,
  async (req: CustomRequest, res: Response): Promise<any> => {

    const user = await prisma.users.findUnique({
      where: {
        id: req.authUser?.id,
      },
    })

    if (!user) {
      res
        .status(404)
        .json({ message: 'Unauthorized/User Not found or logged in.' })
      return
    }

    try {
      res.status(200).json({ message: 'The user will be signed out.' })
      return
    } catch (error) {
      res.status(500).json({ message: 'Server error.' })
      return
    }
  }
)

export default logOutRoute
