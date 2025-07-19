import Todo from '@/models/Todo';
import User from '@/models/User';
import { verifyToken } from '@/utils/auth';
import { connectDbInApi } from '@/utils/connectDb';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;
    await connectDbInApi(req);

    const { token } = req.cookies;
    const tokenVerification = verifyToken(token);
    if (!tokenVerification) return res.status(401).json({ status: 'failed', message: 'unauthorized' });

    const { title, description } = req.body;
    if (!title) return res.status(422).json({ status: 'failed', message: 'data is not valid' });

    const user = await User.findOne({ email: tokenVerification.email });

    const newTodo = await Todo.create({ title, description, userId: user._id });
    res.status(200).json({ status: 'success', message: 'todo added successfully', data: newTodo });
}
