import express from 'express';
import TarefaController from '../controllers/TarefaController.js';

// Cria o roteador
const router = express.Router();

// Cria uma instância do controlador
const controller = new TarefaController();

// Rota inicial
router.get('/', (req, res) => {
  res.send('Bem-vindo às suas tarefas diárias.');
});

// Listar todas as tarefas
router.get('/tarefas', (req, res) => controller.listarTodos(req, res));

// Buscar uma tarefa por ID
router.get('/tarefas/:id', (req, res) => controller.buscarPorId(req, res));

// Criar uma nova tarefa
router.post('/tarefas', (req, res) => controller.criar(req, res));

// Atualizar uma tarefa
router.put('/tarefas/:id', (req, res) => controller.atualizar(req, res));

// Deletar uma tarefa
router.delete('/tarefas/:id', (req, res) => controller.deletar(req, res));

export default router;