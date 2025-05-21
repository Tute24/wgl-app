import { Request, Response } from 'express'
import { createUserService } from './users.service'
import { AppError } from '../../classes/app-error'

export async function userCreateController (
  req: Request,
  res: Response
) {
  const { firstName, lastName, email, password } = req.body

  try {
    const response = await createUserService(
      firstName,
      lastName,
      email,
      password
    )

    res.status(200).json({
      message: response.message,
      user: response.newUser,
      token: response.token
    })
  } catch (error) {
    if (error instanceof AppError) {
      res
        .status(error.status)
        .json({ message: error.message })
    } else {
      res.status(500).json({ message: 'Server Error.' })
    }
  }
}
