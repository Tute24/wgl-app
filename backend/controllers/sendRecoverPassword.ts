import express, { Router, Response } from 'express'
import { CustomRequest } from '../middleware/authMiddleware'
import { prisma } from '../app'
import dotenv from 'dotenv'
import { transporter } from '../transporter/nodemailer-transporter'
dotenv.config()

const sendRecorverEmail: Router = express.Router()

sendRecorverEmail.post(
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
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: 'Hello from Nodemailer',
        text: 'This is a test email sent using Nodemailer.',
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email: ', error)
          res.status(500).json({ message: 'Error sending email.' })
          return
        } else {
          console.log('Email sent: ', info.response)
          res.status(200).json({ message: 'Email sent.' })
          return
        }
      })
    } catch (error) {
        res.status(500).json({message: 'Server error.'})
        return
    }
  }
)

export default sendRecorverEmail
