const express = require('express');
const clienteController = require('../../controllers/cliente/clienteController');

const router = express.Router();

router.post('/cliente', clienteController.adicionarCliente);
router.get('/cliente',clienteController.listarCliente);
router.get('/cliente/cpf/:cpf', clienteController.pesquisarCliente);

module.exports = router;