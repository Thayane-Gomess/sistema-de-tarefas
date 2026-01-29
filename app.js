// app.js
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
  origin: [
    "https://sistema-de-tarefas-l5qu.vercel.app",
    "https://sistema-de-tarefas-lsqu-c7aipg917-thayanes-projects-54f5b37c.vercel.app",
    "http://localhost:5500"
  ]
}));

app.use('/', tarefaRoutes);

export default app;