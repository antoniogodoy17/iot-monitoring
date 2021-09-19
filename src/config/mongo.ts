import { connect } from 'mongoose';
import { resolve } from 'path';

const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_ENDPOINT}/${process.env.MONGO_DB}`;
export async function dbConnect() {
    try {
        await connect(MONGO_URI, mongoConfig);
        console.log('Database connection successful');
    } catch (error) {
        console.error(error);
    }
}