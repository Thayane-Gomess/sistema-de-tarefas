import express from 'express';
import Tarefa from '../estrutura/modeloTarefa.js';

const router = express.Router();

// Criar nova tarefa
router.post('/tarefas', async (req, res) => {
  const { titulo, descricao, status } = req.body;
  if (!titulo) return res.status(400).send('Título é obrigatório');

  const nova = await Tarefa.create({ titulo, descricao, status });

  res.status(201).json({
    mensagem: 'A tarefa foi criada com sucesso',
    tarefa: nova
  });
});

// Listar todas as tarefas
router.get('/tarefas', async (req, res) => {
  const todas = await Tarefa.findAll();
  res.json(todas);
});

// Buscar tarefa por ID
router.get('/tarefas/:id', async (req, res) => {
  const tarefa = await Tarefa.findByPk(req.params.id);
  if (!tarefa) return res.status(404).send('Tarefa não encontrada');
  res.json(tarefa);
});

// Atualizar tarefa por ID
router.put('/tarefas/:id', async (req, res) => {
  const tarefa = await Tarefa.findByPk(req.params.id);
  if (!tarefa) return res.status(404).send('Tarefa não encontrada');
  await tarefa.update(req.body);
  res.json(tarefa);
});

// Atualizar apenas o status da tarefa
router.patch('/tarefas/:id/status', async (req, res) => {
  const tarefa = await Tarefa.findByPk(req.params.id);
  if (!tarefa) return res.status(404).send('Tarefa não encontrada');
  tarefa.status = req.body.status;
  await tarefa.save();
  res.json(tarefa);
});

// Deletar tarefa por ID
router.delete('/tarefas/:id', async (req, res) => {
  const tarefa = await Tarefa.findByPk(req.params.id);
  if (!tarefa) return res.status(404).send('Tarefa não encontrada');
  await tarefa.destroy();
  res.send('Tarefa deletada');
});

export default router;