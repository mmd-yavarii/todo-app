import mongoose, { Schema, models, model } from 'mongoose';

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    description: {
        type: String,
        default: '',
    },

    completed: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },

    maxAge: {
        type: Date,
    },
});

const Todo = models.Todo || model('Todo', TodoSchema);
export default Todo;
