import authService from './services/auth.service';
import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../user/user.dto';
import { validateOrThrow } from '../../lib/validateOrThrow';

/**
 * @class
 * @category Auth
 * @subcategory Controllers
 */
class AuthController {
  /**
   * Method: POST
   * <br/>
   * Route: /registration
   * <br/>
   * Function validates UserDto or throw,
   * registers a new user and
   * sets accessToken in httpOnly cookie
   * @async
   * @method
   * @param {UserDto} req.body
   * @returns {{ message: string }} Status code 200
   */
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const userDto = plainToInstance(UserDto, req.body as unknown);
      await validateOrThrow(userDto);

      const response = await authService.registration(userDto);
      res.cookie('accessToken', response.token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json({ message: 'Successful registration' });
    } catch (e) {
      console.log('registration', e);
      next(e);
    }
  }

  /**
   * Method: POST
   * <br/>
   * Route: /login
   * <br/>
   * Function validates UserDto or throw,
   * login a new user and
   * sets accessToken in httpOnly cookie
   * @async
   * @method
   * @param {UserDto} req.body
   * @return {{message: string}} Status code 200
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userDto = plainToInstance(UserDto, req.body as unknown);
      await validateOrThrow(userDto);

      const response = await authService.login(userDto);
      res.cookie('accessToken', response.token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json({ message: 'Logged-in successfully' });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Method: POST
   * <br/>
   * Route: /logout/:userId
   * <br/>
   * Remove accessToken cookie
   * @async
   * @method
   * @param {{userId: string}} req.params
   * @return {string} Status code 200
   */
  async logout(
    req: Request<{ userId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.clearCookie('accessToken');
      return res.status(200).json({ message: 'User has been logged-out' });
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
