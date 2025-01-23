const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const OS = sequelize.define('OS', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clienteNome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  produtoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  produtoModelo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  defeito: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'os', // Nome da tabela no banco
});

module.exports = OS;
