import express from 'express';
import productRouter from './routes/product';
import categoryRouter from './routes/category';
import authRouter from './routes/auth';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/user';
// config
dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(cors());

//router
app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', authRouter);
app.use('/api', userRouter);
// connect to db
mongoose.connect('mongodb://127.0.0.1:27017/demo1');

export const viteNodeApp = app;
