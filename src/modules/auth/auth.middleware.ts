import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../exceptions/api.error';
import jwtService from './services/jwt.service';
import { EnvConfig } from '../../envConfig';

/**
 * Checks if there is the accessToken and sets its payload in req.user
 * or throws if it is not.
 * @module authMiddleware
 * @category Auth
 * @subcategory Middlewares
 */
/**
 * @function
 * @memberOf module:authMiddleware
 * @param {Request} req Express Request
 * @param {Response} res Express Response
 * @param {NextFunction} next Express NextFunction
 */
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

    req.user = jwtService.verifyToken(accessToken, EnvConfig.SECRET_KEY);

    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError('Unauthorized error'));
  }
};
