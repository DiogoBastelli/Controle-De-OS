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
bairro: {
  type: DataTypes.STRING(15), 
}, 
cidade: {
  type: DataTypes.STRING(15), 
}, 
complemento: {
  type: DataTypes.STRING(15), 
}, 
cep: {
  type: DataTypes.STRING(15), 
}, 
telefone: {
    type: DataTypes.STRING(15), 
},   
}, {
  tableName: 'cliente', 
});

module.exports = Cliente;
