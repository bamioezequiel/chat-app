import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import messageRoutes from './routes/message.routes.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "https://chat-app-ezequiel-bamio.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/message', messageRoutes);

export default app;