import type { ErrorResponseDataType } from '@/types/error-response-data.js';

export class AppError extends Error {
  public readonly status: number;
  public readonly data: ErrorResponseDataType | undefined;

  constructor(message: string, status: number, data?: ErrorResponseDataType) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.data = data;
  }
}
