const { Sequelize } = require('sequelize');
const dotenv = require('dotenv'); // Carrega as variáveis de ambiente

dotenv.config();

// Inicializa a conexão com o banco de dados PostgreSQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

module.exports = sequelize;
