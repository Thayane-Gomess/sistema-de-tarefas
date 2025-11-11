import express from 'express';
import Tarefa from '../estrutura/modeloTarefa.js'; // Corrigido: import do modelo, não da conexão

const router = express.Router();

//  Criar nova tarefa
router.post('/tarefas', async (req, res) => {
  const { titulo, descricao, status } = req.body;
  if (!titulo) return res.status(400).send('Título é obrigatório');

  try {
    const nova = await Tarefa.create({ titulo, descricao, status });
    res.status(201).json({
      mensagem: 'A tarefa foi criada com sucesso',
      tarefa: nova
    });
  } catch (error) {
    res.status(500).send('Erro ao criar tarefa');
  }
});

//  Listar todas as tarefas
router.get('/tarefas', async (req, res) => {
  try {
    const todas = await Tarefa.findAll();
    res.json(todas);
  } catch (error) {
    res.status(500).send('Erro ao buscar tarefas');
  }
});

//  Buscar tarefa por ID
router.get('/tarefas/:id', async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) return res.status(404).send('Tarefa não encontrada');
    res.json(tarefa);
  } catch (error) {
    res.status(500).send('Erro ao buscar tarefa');
  }
});

//  Atualizar tarefa por ID
router.put('/tarefas/:id', async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) return res.status(404).send('Tarefa não encontrada');
    await tarefa.update(req.body);
    res.json(tarefa);
  } catch (error) {
    res.status(500).send('Erro ao atualizar tarefa');
  }
});

// Atualizar apenas o status da tarefa
router.patch('/tarefas/:id/status', async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) return res.status(404).send('Tarefa não encontrada');
    tarefa.status = req.body.status;
    await tarefa.save();
    res.json(tarefa);
  } catch (error) {
    res.status(500).send('Erro ao atualizar status');
  }
});

// Deletar tarefa por ID
router.delete('/tarefas/:id', async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) return res.status(404).send('Tarefa não encontrada');
    await tarefa.destroy();
    res.send('Tarefa deletada');
  } catch (error) {
    res.status(500).send('Erro ao deletar tarefa');
  }
});

export default router;