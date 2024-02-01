import express from 'express';
import dotenv from 'dotenv';
import { postRouter } from './routes/post-router';
import { authRouter } from './routes/auth-router';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { authMiddleware } from './middlewares/auth-middleware';

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static('src/static'));

app.use('/api', authRouter);
app.use('/api', authMiddleware, postRouter);
