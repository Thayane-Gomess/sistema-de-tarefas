
import express from 'express';
import tarefaRoutes from './routes/tarefaRoutes.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND || '*', 
  credentials: true
  
}));

app.use('/', tarefaRoutes);

export default app;