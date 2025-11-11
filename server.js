import express from 'express';
import sequelize from './estrutura/modeloTarefa.js';
import rotasTarefas from './rotas/rotasTarefas.js';

const app = express();

app.use(express.json());
app.use(rotasTarefas);

sequelize.sync().then(() => {
  console.log('Tudo certo');
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});


