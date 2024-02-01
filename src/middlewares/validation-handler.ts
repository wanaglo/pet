import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validationHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            message: 'Ошибка валидации',
            errors: errors.array(),
        });
    } else {
        next();
    }
};
