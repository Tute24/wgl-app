import express, { Request, Response, Router } from 'express'
import { prisma } from '../app'
const userCreate: Router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userCreate.post(
  '/createUser',
  async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, password } =
      req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const emailCheck = await prisma.users.findUnique({
      where: {
        email
      }
    })

    if (emailCheck) {
      res
        .status(409)
        .json({
          message:
            'An user with the submitted email already exists!'
        })
      return
    }

    try {
      const newUser = await prisma.users.create({
        data: {
          email,
          password: hashedPassword,
          lastName,
          firstName
        }
      })

      const token = jwt.sign(
        { id: newUser.id },
        process.env.SECRET_KEY,
        {
          expiresIn: '3h'
        }
      )
      res
        .status(200)
        .json({ message: 'Success!', user: newUser, token })
    } catch (error) {
      res.status(500).json({ message: 'Server error' })
    }
  }
)

export default userCreate
