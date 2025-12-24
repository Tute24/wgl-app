import { Request, Response } from 'express';
import { createUserService } from './users.service';
import { controllerErrorHandler } from '../../utils/controller-error-handler';

export async function userCreateController(req: Request, res: Response) {
  const { firstName, lastName, email, password } = req.body;

  try {
    const response = await createUserService(firstName, lastName, email, password);

    res.status(200).json({
      message: response.message,
      user: response.newUser,
      token: response.token,
    });
  } catch (error) {
    console.log(error);
    controllerErrorHandler(error, res);
  }
}
