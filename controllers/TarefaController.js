import Tarefa from '../models/Tarefa.js';

// Array que guarda as tarefas
let tarefas = [];

// Gera os IDs automáticos
let proximoId = 1;

// Classe com os métodos do CRUD
class TarefaController {

  // Lista todas as tarefas
  listarTodos(req, res) {
    res.json(tarefas);
  }

  // Busca uma tarefa pelo ID
  buscarPorId(req, res) {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
      res.json(tarefa);
    } else {
      res.status(404).send('Tarefa não encontrada');
    }
  }

  // Cria uma nova tarefa
  criar(req, res) {
    const { titulo, descricao, status } = req.body;
    const novaTarefa = new Tarefa(proximoId++, titulo, descricao, status);
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);

    // Mostra todas as tarefas no terminal
    console.log('\n📋 Lista de Tarefas Atualizada:');
    console.table(tarefas);
  }

  // Atualiza uma tarefa existente
  atualizar(req, res) {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
      tarefa.titulo = req.body.titulo;
      tarefa.descricao = req.body.descricao;
      tarefa.status = req.body.status;
      res.json(tarefa);
    } else {
      res.status(404).send('Tarefa não encontrada');
    }
  }

  // Deleta uma tarefa
  deletar(req, res) {
    const id = parseInt(req.params.id);
    const index = tarefas.findIndex(t => t.id === id);
    if (index !== -1) {
      tarefas.splice(index, 1);
      res.send('Tarefa deletada');
    } else {
      res.status(404).send('Tarefa não encontrada');
    }
  }

  // Para listar tarefas no terminal
  listarNoTerminal() {
    return tarefas;
  }
}

export default TarefaController;