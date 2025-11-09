import express from 'express';
import sequelize from './conexao/conexaoBanco.js';
import rotasTarefas from './rotas/rotasTarefas.js';

const app = express();

app.use(express.json());
app.use(rotasTarefas);

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});


