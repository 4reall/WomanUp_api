import authService from './services/auth.service';
import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../user/user.dto';
import { validateOrReject } from 'class-validator';

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const userDto = plainToInstance(UserDto, req.body as unknown);
      await validateOrReject(userDto);

      const response = await authService.registration(userDto);
      res.cookie('accessToken', response.token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(response);
    } catch (e) {
      console.log('registration', e);
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userDto = plainToInstance(UserDto, req.body as unknown);
      await validateOrReject(userDto);

      const response = await authService.login(userDto);
      res.cookie('accessToken', response.token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async logout(
    req: Request<{ userId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      await authService.logout(req.params.userId);
      return res.status(200).json({ message: 'User has been deleted' });
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
