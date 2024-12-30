const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Cliente = sequelize.define('Cliente', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipo_cliente: {
    type: DataTypes.STRING,
    allowNull: true,
  },    
}, {
  tableName: 'cliente', // Nome da tabela no banco
});

module.exports = Cliente;
