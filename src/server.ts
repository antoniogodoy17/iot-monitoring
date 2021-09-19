// Libraries
import dotenv from 'dotenv';
!process.env.NODE_ENV ? dotenv.config() : 'production';
import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';

import { dbConnect } from './config/mongo';

// Routes
import routes from './routes/index.routes';

const PORT = process.env.PORT || 3000;
const app = express();

// Config
app.use(cors());
app.use(json());

app.use('', routes);

dbConnect();
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});
