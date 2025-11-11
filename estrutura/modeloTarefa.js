import { DataTypes } from 'sequelize';
import sequelize from '../conexao/conexaoBanco.js'; // caminho corrigido

const Tarefa = sequelize.define('Tarefa', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'a fazer'
  }
});

export default Tarefa;