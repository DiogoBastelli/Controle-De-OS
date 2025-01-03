const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Cliente = sequelize.define('Cliente', {
  nome: {
    type: DataTypes.STRING(100), 
    allowNull: false,
},
cpf: {
    type: DataTypes.STRING(100), 
    allowNull: false,
},
endereco: {
    type: DataTypes.STRING(255), 
},
telefone: {
    type: DataTypes.STRING(15), 
},   
}, {
  tableName: 'cliente', // Nome da tabela no banco
});

module.exports = Cliente;
