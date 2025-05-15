import express, { Router, Response } from 'express'
import isAuthenticated, { CustomRequest } from '../middleware/authMiddleware'
import { prisma } from '../app'
const acceptRequestRoute: Router = express.Router()

acceptRequestRoute.post(
  '/acceptRequest',
  isAuthenticated,
  async (req: CustomRequest, res: Response) => {
    const userID = req.authUser?.id
    const { reqID } = req.body

    const user = await prisma.users.findUnique({
      where: {
        id: userID
      },
      include: {
        weddingsOwn: true
      }
    })

    if (!user) {
      res.status(404).json({ message: 'User not found.' })
      return
    }

    if (userID) {
      try {
        const requestData = await prisma.requests.findUnique({
          where: {
            id: reqID
          }
        })

        if (!requestData) {
          res
            .status(404)
            .json({ message: "Couldn't find this request on the database." })
          return
        }

        const filterWedding = user.weddingsOwn.filter(
          (wedding) => wedding.id === requestData.relatedWedding
        )

        if (filterWedding.length === 0) {
          res
            .status(403)
            .json({ message: 'This user is not the wedding creator.' })
          return
        }

        if (requestData.pending === false) {
          res
            .status(409)
            .json({ message: 'This request has already been reviewed.' })
          return
        }

        const updatedRequest = await prisma.requests.update({
          where: {
            id: reqID
          },
          data: {
            accepted: true,
            pending: false
          }
        })
        if (updatedRequest) {
          res.status(200).json({ message: 'Request accepted successfully' })
        }
      } catch (error) {
        res.status(500).json({ message: 'Server error.' })
      }
    }
  }
)

export default acceptRequestRoute
