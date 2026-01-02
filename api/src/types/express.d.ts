import { TokenPayload } from './auth/token-payload.ts';

declare global {
  namespace Express {
    interface Request {
      authUser?: TokenPayload;
    }
  }
}

export {};
