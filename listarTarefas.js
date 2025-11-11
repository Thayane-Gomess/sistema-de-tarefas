import Tarefa from './estrutura/modeloTarefa.js';
import sequelize from './conexao/conexaoBanco.js';

(async () => {
  await sequelize.sync();

  const tarefas = await Tarefa.findAll({
    order: [['id', 'ASC']]
  });

  console.log('Lista de tarefas:\n');

  tarefas.forEach(t => {
    console.log('ID:', t.id);
    console.log('Título:', t.titulo);
    console.log('Descrição:', t.descricao);
    console.log('Status:', t.status);
    console.log('Criada em:', t.createdAt);
    console.log('----------------------');
  });
})();