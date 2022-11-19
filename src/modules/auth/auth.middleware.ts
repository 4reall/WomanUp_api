import { NextFunction, Request, Response } from 'express';
import { JwtService } from './services/jwt.service';
import { ApiError } from '../../exceptions/api.error';

const jwtService = new JwtService();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(
        ApiError.UnauthorizedError('No authorization header provided')
      );
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
      return next(ApiError.UnauthorizedError('No token provided'));
    }

    req.user = jwtService.verifyToken(token);
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError('Unauthorized error'));
  }
};
