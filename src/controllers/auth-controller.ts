import { Request, Response } from 'express';
import authRepo from '../repositories/auth-repository';

class AuthController {
    async registration(req: Request, res: Response<{ message: string }>) {
        try {
            const { username, password } = req.body;

            const isCreated = await authRepo.registration(username, password);

            if (isCreated)
                res.json({ message: 'Пользователь успешно зарегистрирован' });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async login(
        req: Request,
        res: Response<{ token: string } | { message: string }>
    ) {
        try {
            const { username, password } = req.body;

            const token = await authRepo.login(username, password);

            res.json({ token });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}

export default new AuthController();
