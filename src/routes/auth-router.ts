import { Router } from 'express';
import authController from '../controllers/auth-controller';
import { validation } from '../middlewares/validation-middleware';
import { validationHandler } from '../middlewares/validation-handler';

export const authRouter = Router();

authRouter.post(
    '/registration',
    validation,
    validationHandler,
    authController.registration
);
authRouter.post('/login', authController.login);
