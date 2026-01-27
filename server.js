import express from 'express';
import cors from 'cors';          // <-- importa o cors
import sequelize from './db.js';
import tarefaRoutes from './routes/tarefaRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());                  // <-- habilita CORS

// Usa as rotas
app.use('/', tarefaRoutes);

// Sincroniza o banco
sequelize.sync()
  .then(() => {
    console.log('Banco sincronizado com sucesso!');
  })
  .catch(err => {
    console.error('Erro ao sincronizar banco:', err);
  });

// Inicia servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});