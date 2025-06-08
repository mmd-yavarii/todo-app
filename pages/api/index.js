import todos from '@/data/data';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(todos);
      break;

    case 'POST': {
      const data = req.body;
      if ('title' in data && 'description' in data && 'priority' in data) {
        const newTodo = { ...data, id: uuidv4(), isCompleted: false, createdAt: new Date().toISOString() };
        todos.push(newTodo);
      }
      res.status(201).json(newTodo);
      break;
    }
  }
}
