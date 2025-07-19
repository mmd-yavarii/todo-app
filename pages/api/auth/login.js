import User from '@/models/User';
import { verifyPassword } from '@/utils/auth';
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
        return res.status(422).json({ status: 'failed', message: 'email or password is not valid' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ status: 'failed', message: 'user not found' });

    const passwordValidation = await verifyPassword(password, user.password);
    if (!passwordValidation) return res.status(422).json({ status: 'failed', message: 'email or password is wrong' });

    const token = sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const cookie = serialize('token', token, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24,
    });
    res.status(200).setHeader('Set-Cookie', cookie).json({ status: 'success', message: 'you logged in successfuly' });
}
