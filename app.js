import express from 'express';
import tarefaRoutes from './routes/tarefaRoutes.js';
import sequelize from './db.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: "https://seu-projeto.vercel.app"
}));

app.use(tarefaRoutes);

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
  app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
  });
}).catch((error) => {
  console.error('Erro ao sincronizar o banco:', error);
});