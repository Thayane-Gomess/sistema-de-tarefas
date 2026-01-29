
import express from 'express';
import TarefaController from '../controllers/TarefaController.js';

const router = express.Router();
const controller = new TarefaController();

// Endpoints da API
router.get('/tarefas', (req, res) => controller.listarTodos(req, res));
router.get('/tarefas/:id', (req, res) => controller.buscarPorId(req, res));
router.post('/tarefas', (req, res) => controller.criar(req, res));
router.put('/tarefas/:id', (req, res) => controller.atualizar(req, res));
router.delete('/tarefas/:id', (req, res) => controller.deletar(req, res));

export default router;