import { Router } from 'express';
import authController from './auth.controller';

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/registration', authController.registration);
authRouter.post('/logout/:userId', authController.logout);

export default authRouter;
