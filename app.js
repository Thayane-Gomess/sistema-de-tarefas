// Importa o Express e as rotas
import express from 'express';
import tarefaRoutes from './routes/tarefaRoutes.js';

// Cria a aplicação
const app = express();

// Permite que o servidor entenda o JSON
app.use(express.json());

// Usa as rotas definidas em tarefaRoutes
app.use(tarefaRoutes);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});