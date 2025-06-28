import Todo from '@/models/Todos';
import connectDb from '@/utils/connectDb';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await connectDb();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'fail', message: 'Error in databse connection' });
  }

  if (req.method === 'PATCH') {
    try {
      const response = await Todo.updateOne({ _id: id }, { $set: { status: req.body } });
      res.status(201).json({ status: 'success', message: 'Todo updated successfully', data: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 'fail', message: 'An error occurred while trying to update data. Please try again.' });
    }
  }
}
