const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const OS = sequelize.define('OS', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
},
clienteCpf: {
    type: DataTypes.STRING(100),
    allowNull: false,
},
clienteEndereco: {
    type: DataTypes.STRING(100),
    allowNull: false,
},
clienteNome: {
    type: DataTypes.STRING(100),
    allowNull: false,
},
ProdutoNumSerie: {
    type: DataTypes.STRING(15),
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
status: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "aguardando-orcamento",
},
orcamento: {
    type: DataTypes.STRING(255),
    allowNull: true,  
},
dataFormatada: {
    type: DataTypes.STRING(255),
    allowNull: false,
},
horaFormatada: {
    type: DataTypes.STRING(255),
    allowNull: false,
},
}, {
tableName: 'os',
});

module.exports = OS;
