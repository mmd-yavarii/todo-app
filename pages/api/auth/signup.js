import User from '@/models/User';
import { hashPassword } from '@/utils/auth';
import { connectDbInApi } from '@/utils/connectDb';
import { emailRegex, passwordRegex } from '@/utils/regexes';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;

    await connectDbInApi(res);

    const { email, password } = req.body;

    // email and password validation
    if (!email || !password || !emailRegex.test(email) || !passwordRegex.test(password)) {
        return res.status(422).json({ status: 'email or password is not valid' });
    }

    const userExistance = await User.findOne({ email: email });

    // check users existance
    if (userExistance) return res.status(422).json({ status: 'user exists already' });

    // sign in
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ email, password: hashedPassword });

    // login automaticly after sign in
    const token = sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const cookie = serialize('token', token, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24,
    });

    res.status(201).setHeader('Set-Cookie', cookie).json({ status: 'success', message: 'user created succesfully' });
}
