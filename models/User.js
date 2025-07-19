import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
});

const User = models.User || model('User', UserSchema);
export default User;
