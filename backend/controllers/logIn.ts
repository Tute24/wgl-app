import express, { Router, Request, Response } from 'express'
import { prisma } from '../app'
const logInRoute: Router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

logInRoute.post('/logIn', async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body

  const logInUser = await prisma.users.findUnique({
    where: {
      email: email,
    },
  })

  if (!logInUser) {
    res
      .status(401)
      .json({ message: "This email doesn't belong to an existent user." })
    return
  }

  try {
    if (!(await bcrypt.compare(password, logInUser.password))) {
      res.status(403).json({ message: 'Incorrect password.' })
      return
    }
    const token = jwt.sign({ id: logInUser.id }, process.env.SECRET_KEY, {
      expiresIn: '3h',
    })
    console.log(token)
    res.status(200).json({ message: 'Successfull login.', token: token })
    return
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error.' })
    return
  }
})

export default logInRoute
