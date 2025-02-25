import express, { Router, Response } from 'express'
import isAuthenticated, { CustomRequest } from '../middleware/authMiddleware'
import { prisma } from '../app'
const getReqRoute: Router = express.Router()

getReqRoute.get(
  '/getRequests',
  isAuthenticated,
  async (req: CustomRequest, res: Response) => {
    const userID = req.authUser?.id

    const user = await prisma.users.findUnique({
      where: {
        id: userID,
      },
      include: {
        weddingsOwn: true,
      },
    })

    if (!user) {
      res.status(404).json({ message: 'User not found.' })
      return
    }

    if (user.weddingsOwn.length === 0) {
      res
        .status(404)
        .json({
          message:
            'No weddings created by this user were found on the database.',
        })
      return
    }

    if (userID) {
      try {
        const ownWeddingsIDArray = user.weddingsOwn.map(
          (weddings) => weddings.id
        )

        const availableRequests = await Promise.all(
          ownWeddingsIDArray.map(async (ids) => {
            return await prisma.requests.findMany({
              where: {
                relatedWedding: ids,
              }
            })
          })
        )

        const existentRequests = availableRequests.every((reqs) => reqs.length === 0 || reqs[0].pending === false)

        if(existentRequests){
            res.status(404).json({message:"There are no pending requests from guests at the time."})
            return
        }

        const effectiveAvailableRequests = availableRequests.filter((reqs)=> reqs.length != 0 && reqs[0].pending === true )

        res
          .status(200)
          .json({ message: 'Fetch successfull.', requests: effectiveAvailableRequests })
        return
      } catch (error) {
        res.status(500).json({ message: 'Server error.' })
        return
      }
    }
  }
)

export default getReqRoute
