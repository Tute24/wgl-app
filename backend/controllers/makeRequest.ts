import express, { Router, Response } from 'express'
import isAuthenticated, { CustomRequest } from '../middleware/authMiddleware'
import { prisma } from '../app'
const makeRequestRoute: Router = express.Router()

makeRequestRoute.post(
  '/makeRequest',
  isAuthenticated,
  async (req: CustomRequest, res: Response) => {
    const userID = req.authUser?.id
    const { weddingID } = req.body

    const user = await prisma.users.findUnique({
      where: {
        id: userID,
      },
    })

    const checkWedding = await prisma.weddings.findUnique({
      where: {
        id: weddingID,
      },
    })

    if (!user) {
      res.status(404).json({ message: 'User not found.' })
      return
    }

    if (!checkWedding) {
      res.status(404).json({ message: `Couldn't find this wedding's list.` })
      return
    }

    if (userID) {
      try {
        const newRequest = await prisma.requests.create({
          data: {
            requestBy: userID,
            relatedWedding: weddingID,
            weddingTitle: checkWedding.weddingTitle,
            requestByName: `${user.firstName} ${user.lastName}`
          },
        })

        res.status(200).json({ message: 'Request successfull.' })
        return
      } catch (error) {
        res.status(500).json({ message: 'Server Error.' })
        return
      }
    }
  }
)

export default makeRequestRoute
