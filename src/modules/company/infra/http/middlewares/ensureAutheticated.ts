import { Response, Request, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import jwt from 'jsonwebtoken';

interface IDecodedProps {
  exp: number;
  iat: number;
  sub: string;
}
async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('An authentication token is required', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = jwt.decode(token) as IDecodedProps;
    request.company = {
      id: decoded.sub,
    };
  } catch (error) {
    throw new AppError('authentication token invalid or expirad', 401);
  }

  return next();
}

export default ensureAuthenticated;
