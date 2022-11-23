import { ApiError } from '../exceptions/api.error';
import { NextFunction, Request, Response } from 'express';
/**
 * @module globalExceptionMiddleware
 * @category Global
 * @subcategory Middlewares
 */
// noinspection JSUnusedLocalSymbols
/**
 * @function
 * @memberOf module:globalExceptionMiddleware
 * @param {TypeError | ApiError} err
 * @param {Request} req Express Request
 * @param {Response} res Express Response
 * @param {NextFunction} next Express NextFunction
 */
export const globalExceptionMiddleware = (
  err: TypeError | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, status: err.status, errors: err.errors });
  }
  return res.status(500).json({ message: 'Internal server error' });
};
