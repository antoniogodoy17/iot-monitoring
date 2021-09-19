import { Schema, model } from 'mongoose';

import User from '../definitions/user.definition';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

const user = model<User>('User', userSchema);

export default user;