import { prisma } from '../../app'
import { AppError } from '../../classes/app-error'
import crypto from 'crypto'
import { transporter } from '../../transporter/nodemailer-transporter'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

export async function signInService(
  email: string,
  password: string
) {
  const logInUser = await prisma.users.findUnique({
    where: {
      email
    }
  })

  if (!logInUser) {
    throw new AppError(
      "This email doesn't belong to an existent user.",
      404
    )
  }

  if (
    !(await bcrypt.compare(password, logInUser.password))
  ) {
    throw new AppError('Incorrect password.', 401)
  }
  const token = jwt.sign(
    { id: logInUser.id },
    process.env.SECRET_KEY,
    {
      expiresIn: '3h'
    }
  )
  console.log(token)
  const message = 'User successfully signed in.'
  return {
    message,
    token
  }
}

export async function forgotPasswordService(email: string) {
  const user = await prisma.users.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    throw new AppError(
      "There's no active user with this e-mail address.",
      404
    )
  }

  const resetToken = crypto.randomBytes(32).toString('hex')
  const encryptedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  await prisma.passwordResetTokenStorage.create({
    data: {
      requestedBy: user.id,
      used: false,
      expirationDate: Date.now() + 10 * 60 * 1000,
      token: encryptedToken
    }
  })

  const tokenPayload = {
    id: user.id,
    resetToken
  }
  const jwtResetToken = jwt.sign(
    tokenPayload,
    process.env.SECRET_KEY,
    {
      expiresIn: '10m'
    }
  )
  const resetLink = `http://localhost:3001/reset-password/${jwtResetToken}`
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject:
      'Here is the next step to resetting your password:',
    html: `<h2>Click in the following link to retrieve your password:</h2>
                 <a href="${resetLink}">Reset Password</a>`
  }

  await transporter.sendMail(mailOptions)
  const message = 'Recovery e-mail successfully sent.'
  return { message }
}
