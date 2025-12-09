import { errorResponseDataType } from '../utils/controller-error-handler';

export class AppError extends Error {
  public readonly status: number;
  public readonly data: errorResponseDataType | undefined;

  constructor(message: string, status: number, data?: errorResponseDataType) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.data = data;
  }
}
