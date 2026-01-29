// controllers/TarefaController.js
import Tarefa from '../models/Tarefa.js';

class TarefaController {
  async listarTodos(req, res) {
    try {
      const tarefas = await Tarefa.findAll();
      res.json(tarefas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar tarefas' });
    }
  }

  async buscarPorId(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

      const tarefa = await Tarefa.findByPk(id);
      if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

      res.json(tarefa);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar tarefa' });
    }
  }

  async criar(req, res) {
    try {
      const { titulo, descricao, status } = req.body;
      if (!titulo) return res.status(400).json({ error: 'Título obrigatório' });

      const novaTarefa = await Tarefa.create({
        titulo,
        descricao,
        status: status || 'pendente'
      });

      res.status(201).json(novaTarefa);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
  }

  async atualizar(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

      const tarefa = await Tarefa.findByPk(id);
      if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

      await tarefa.update(req.body);
      res.json(tarefa);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  }

  async deletar(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

      const tarefa = await Tarefa.findByPk(id);
      if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

      await tarefa.destroy();
      res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir tarefa' });
    }
  }
}

export default TarefaController;