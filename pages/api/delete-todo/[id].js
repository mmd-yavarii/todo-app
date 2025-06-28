import Todo from '@/models/Todos';
import connectDb from '@/utils/connectDb';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await connectDb();
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ status: 'fail', message: 'Error in database connection' });
  }

  if (req.method === 'DELETE') {
    try {
      const result = await Todo.deleteOne({ _id: id });

      if (result.deletedCount === 0) {
        return res.status(404).json({ status: 'fail', message: 'Todo not found' });
      }

      return res.status(200).json({ status: 'success', message: 'Todo deleted successfully' });
    } catch (error) {
      console.error('Delete error:', error);
      return res.status(500).json({ status: 'fail', message: 'An error occurred while trying to delete data. Please try again.' });
    }
  }
}
