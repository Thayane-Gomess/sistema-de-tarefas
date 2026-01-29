
import app from './app.js';
import sequelize from './db.js';

sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco:', error);
  });