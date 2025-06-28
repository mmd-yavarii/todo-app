import { model, models, Schema } from 'mongoose';

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  status: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: () => Date.now(),
    Immutable: true,
  },

  category: String,
});

const Todo = models.Todo || model('Todo', TodoSchema);
export default Todo;
