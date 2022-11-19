import authService from './services/auth.service';
import { NextFunction, Request, Response } from 'express';

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await authService.registration(req.body);
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
      const response = await authService.login(req.body);
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
