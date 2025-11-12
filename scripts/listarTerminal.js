import TarefaController from '../controllers/TarefaController.js';

// Instância do controlador
const controller = new TarefaController();

// Pega as tarefas usando 
const tarefas = controller.listarNoTerminal();

// Mostra as tarefas no terminal
tarefas.forEach(tarefa => {
  console.log('ID:', tarefa.id);
  console.log('Título:', tarefa.titulo);
  console.log('Descrição:', tarefa.descricao);
  console.log('Status:', tarefa.status);
  console.log('------------------');
});