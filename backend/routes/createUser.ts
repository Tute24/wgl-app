import express, { Request, Response, Router } from 'express'
const userCreate: Router = express.Router()
import { prisma } from '../app'
const bcrypt = require('bcrypt')

userCreate.post(
  '/createUser',
  async (req: Request, res: Response): Promise<any> => {
    const { firstName, lastName, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          lastName,
          firstName,
        },
      })
      res.status(200).json({ message: 'Success!', user: newUser })
      return
    } catch (error) {
      return res.status(500).json({ message: 'Server error' })
    }
  }
)

export default userCreate
