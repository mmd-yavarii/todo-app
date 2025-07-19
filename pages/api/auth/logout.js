import { connectDbInApi } from '@/utils/connectDb';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method !== 'GET') return;
    await connectDbInApi(res);

    const cookie = serialize('token', '', {
        path: '/',
        maxAge: 0,
        httpOnly: true,
    });
    res.status(200).setHeader('Set-Cookie', cookie).json({ status: 'success', message: 'logged out successfully' });
}
