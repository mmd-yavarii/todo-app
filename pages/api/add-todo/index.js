import Todo from '@/models/Todos';
import connectDb from '@/utils/connectDb';

export default async function handler(req, res) {
  try {
    await connectDb();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'fail', message: 'Error in databse connection' });
  }

  if (req.method === 'POST') {
    try {
      const response = await Todo.create(req.body);
      res.status(201).json({ status: 'success', message: 'Todo added successfully', data: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 'fail', message: 'An error occurred while trying to save the connection. Please try again.' });
    }
  }
}
