import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.method === 'OPTIONS') next();

    try {
        let token = req.headers.authorization;

        if (!token || token == '') {
            throw new Error('Пользователь не авторизован');
        } else {
            token = req.headers.authorization!.split(' ')[1];
        }

        const secret = process.env.JWT_SECRET!;

        const decodedData = jwt.verify(token, secret);

        //@ts-ignore
        req.user = decodedData;

        next();
    } catch (err: any) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
};
