import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import errorHandler from './middlewares/errorHandler';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRotues';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);

/* ---Auth--- */

app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});