import express, { Router, Response } from 'express'
import { CustomRequest } from '../middleware/authMiddleware'
import { prisma } from '../app'
import dotenv from 'dotenv'
import { transporter } from '../transporter/nodemailer-transporter'
import crypto from 'crypto'
const jwt = require('jsonwebtoken')
dotenv.config()

const sendRecoverEmail: Router = express.Router()

sendRecoverEmail.post(
  '/sendRecoverEmail',
  async (req: CustomRequest, res: Response) => {
    const { email } = req.body

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      res
        .status(404)
        .json({ message: "There's no active user with this e-mail address." })
      return
    }

    try {
      const resetToken = crypto.randomBytes(32).toString('hex')
      const encryptedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
      const newRegister = await prisma.passwordResetTokenStorage.create({
        data: {
          requestedBy: user.id,
          used: false,
          expirationDate: Date.now() + 10 * 60 * 1000,
          token: encryptedToken,
        },
      })

      if (newRegister) {
        const tokenPayload = {
          id: user.id,
          resetToken: resetToken,
        }
        const jwtResetToken = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
          expiresIn: '10m',
        })
        const resetLink = `http://localhost:3001/reset-password/${jwtResetToken}`
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: user.email,
          subject: 'Here is the next step to resetting your password:',
          html: `<h2>Click in the following link to retrieve your password:</h2>
                 <a href="${resetLink}">Reset Password</a>`,
        }
        await transporter.sendMail(mailOptions)
        res.status(200).json({ message: 'Email sent.' })
        return
      }
    } catch (error: any) {
      console.error('There was an error:', error)
      res.status(500).json({ message: 'Server error.', error: error.message })
      return
    }
  }
)

export default sendRecoverEmail
