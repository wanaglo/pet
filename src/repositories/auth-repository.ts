import { UserModel } from '../models/User-model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthRepo {
    async registration(username: string, password: string) {
        const candidate = await UserModel.findOne({ username: username });

        if (candidate)
            throw new Error(`Пользователь с именем ${username} уже существует`);

        const salt = await bcrypt.genSalt(8);

        const passHash = await bcrypt.hash(password, salt);

        const newUser = await UserModel.create({
            username,
            password: passHash,
        });

        if (newUser) return true;
    }

    async login(username: string, password: string): Promise<string> {
        const user = await UserModel.findOne({ username: username });

        if (!user)
            throw new Error(`Пользователь с именем ${username} не найден`);

        const isValidPass = await bcrypt.compare(password, user.password);

        if (!isValidPass) throw new Error(`Введен не верный пароль`);

        const secret = process.env.JWT_SECRET!;

        return jwt.sign({ _id: user._id }, secret, {
            expiresIn: '1h',
        });
    }
}

export default new AuthRepo();
