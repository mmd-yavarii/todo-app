import todos from '@/data/data';

export default function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'Missing id' });
    return;
  }

  switch (req.method) {
    case 'GET': {
      const todo = todos.find((i) => i.id === id);
      if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }
      res.status(200).json(todo);
      break;
    }

    case 'DELETE': {
      const index = todos.findIndex((i) => i.id === id);
      if (index === -1) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }
      todos.splice(index, 1);
      res.status(204).end();
      break;
    }

    case 'PATCH': {
      const index = todos.findIndex((i) => i.id === id);
      if (index === -1) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }
      todos[index] = { ...todos[index], ...req.body };
      res.status(200).json(todos[index]);
      break;
    }

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
