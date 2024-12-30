const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Carrinho = sequelize.define('Carrinho', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Total: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },    
}, {
  tableName: 'produto', // Nome da tabela no banco
});

module.exports = Produto;