import { AppError } from './app-error';
import { type Response } from 'express';
import type { ErrorResponseDataType } from '@/types/error-response-data';

export function errorHandler(
  error: unknown,
  res: Response,
  errorResponseObject?: ErrorResponseDataType,
) {
  if (error instanceof AppError && errorResponseObject) {
    res.status(error.status).json({ message: error.message, errorResponseObject });
  } else if (error instanceof AppError) {
    res.status(error.status).json({ message: error.message });
  } else {
    res.status(500).json({ message: 'Server Error.' });
  }
}
