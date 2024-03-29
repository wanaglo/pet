import { UserModel } from '../models/User-model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthRepo {
    async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({ email: email });

        if (candidate)
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);

        const salt = await bcrypt.genSalt(8);

        const passHash = await bcrypt.hash(password, salt);

        const newUser = await UserModel.create({
            email,
            password: passHash,
        });

        if (newUser) return true;
    }

    async login(email: string, password: string): Promise<string> {
        const user = await UserModel.findOne({ email: email });

        if (!user)
            throw new Error(`Пользователь с почтовым адресом ${email} не найден`);

        const isValidPass = await bcrypt.compare(password, user.password);

        if (!isValidPass) throw new Error(`Введен не верный пароль`);

        const secret = process.env.JWT_SECRET!;

        return jwt.sign({ _id: user._id }, secret, {
            expiresIn: '1h',
        });
    }
}

export default new AuthRepo();
