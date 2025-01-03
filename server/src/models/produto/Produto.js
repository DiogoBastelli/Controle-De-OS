
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Produto = sequelize.define('Produto', {
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  NumSerie: {
    type: DataTypes.STRING(15), 
  },    
}, {
  tableName: 'produto', // Nome da tabela no banco
});

module.exports = Produto;