import express, { Response, Router } from 'express'
import resetPasswordAuth, {
  ResetPasswordRequest,
} from '../middleware/resetPasswordMiddleware'
import { prisma } from '../app'
const bcrypt = require('bcrypt')
import crypto from 'crypto'
const resetPassword: Router = express.Router()

resetPassword.post(
  '/resetPassword',
  resetPasswordAuth,
  async (req: ResetPasswordRequest, res: Response) => {
    const userID = req.authData?.id
    const resetToken = req.authData?.resetToken
    const { password } = req.body
    const newHashedPassword = await bcrypt.hash(password, 10)
    if (resetToken) {
      const encryptedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

      try {
        await prisma.users.update({
          where: {
            id: userID,
          },
          data: {
            password: newHashedPassword,
          },
        })

        await prisma.passwordResetTokenStorage.update({
          where: {
            token: encryptedToken,
          },
          data: {
            used: true,
          },
        })

        res.status(200).json({ message: 'Password resetted successfully.' })
        return
      } catch (error) {
        res.status(500).json({ message: 'Server Error.' })
        return
      }
    } else {
      res.status(403).json({ message: 'Forbidden. Auth token not present.' })
      return
    }
  }
)

export default resetPassword
