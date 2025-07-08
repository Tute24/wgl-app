import { prisma } from '../../app'
import { AppError } from '../../classes/app-error'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

export async function createUserService (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const emailCheck = await prisma.users.findUnique({
    where: { email }
  })

  if (emailCheck) {
    throw new AppError(
      'An user with the submitted email already exists!',
      409
    )
  }

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
  const message = 'Success!'
  return {
    message,
    newUser,
    token
  }
}
