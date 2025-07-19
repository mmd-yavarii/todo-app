import Todo from '@/models/Todo';
import { connectDbInApi } from '@/utils/connectDb';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;
    await connectDbInApi(res);

    const { isCompleted, _id } = req.body;
    if (!_id) res.status(422).json({ status: 'failed', message: 'bad request' });

    try {
        await Todo.updateOne({ _id }, { $set: { completed: isCompleted } });
        res.status(200).json({ status: 'success', message: 'status updated successfuly' });
    } catch {
        return res.status(500).json({ status: 'failed', message: 'status update failed' });
    }
}
