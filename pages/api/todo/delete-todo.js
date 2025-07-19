import Todo from '@/models/Todo';
import User from '@/models/User';
import { verifyToken } from '@/utils/auth';
import { connectDbInApi } from '@/utils/connectDb';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;
    await connectDbInApi(req);

    const { _id } = req.body;
    const { token } = req.cookies;
    const tokenVerification = verifyToken(token);
    if (!tokenVerification) return res.status(405).json({ status: 'failed', message: 'unauthorize' });

    const todoInfo = await Todo.findOne({ _id });
    const userInfo = await User.findOne({ email: tokenVerification.email });
    if (userInfo._id.toString() !== todoInfo.userId.toString()) {
        return res.status(405).json({ status: 'failed', message: 'unauthorize' });
    }

    await Todo.deleteOne({ _id });
    res.status(200).json({ status: 'success', message: 'todo deleted successfully' });
}
