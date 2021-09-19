import { Document } from 'mongoose';

export default interface User extends Document {
    _id?: string;
    email: string;
    password: string;
}