import { AppError } from '../../classes/app-error';
import { prisma } from '../../lib/prisma';
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { env } from '../../env';

export async function createUserService(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  const hashedPassword = await bcryptjs.hash(password, 10);

  const emailCheck = await prisma.users.findUnique({
    where: { email },
  });

  if (emailCheck) {
    throw new AppError('An user with the submitted email already exists!', 409);
  }

  const newUser = await prisma.users.create({
    data: {
      email,
      password: hashedPassword,
      lastName,
      firstName,
    },
  });

  const token = jwt.sign({ id: newUser.id }, env.SECRET_KEY, {
    expiresIn: '3h',
  });
  const message = 'Success!';
  return {
    message,
    newUser,
    token,
  };
}
