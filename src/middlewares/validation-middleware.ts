import { check } from 'express-validator';

export const validation = [
    check('username')
        .trim()
        .notEmpty()
        .withMessage('Имя пользователя не может быть пустым'),
    check('password')
        .trim()
        .notEmpty()
        .withMessage('Пароль не может быть пустым')
        .isLength({ min: 4, max: 12 })
        .withMessage('Пароль должен быть не меньше 4 и не больше 12 символов'),
];
