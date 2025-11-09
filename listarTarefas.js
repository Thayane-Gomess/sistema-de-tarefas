import Tarefa from './estrutura/modeloTarefa.js';
import sequelize from './estrutura/conexao.js';

(async () => {
  await sequelize.sync(); // garante que o banco está conectado
  const tarefas = await Tarefa.findAll();
  console.log(tarefas.map(t => t.toJSON()));
})();

