import { prisma } from '../../app'
import { AppError } from '../../classes/app-error'
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
