import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../exceptions/api.error';
import jwtService from './services/jwt.service';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return next(ApiError.UnauthorizedError('No token provided'));
    }

    req.user = jwtService.verifyToken(accessToken);
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError('Unauthorized error'));
  }
};
