const express = require('express');
const clienteController = require('../../controllers/cliente/clienteController');

const router = express.Router();

router.post('/cliente', clienteController.adicionarCliente);
router.get('/cliente',clienteController.listarCliente);
router.get('/cliente/cpf/:cpf', clienteController.pesquisarCliente);
//router.put('/cliente/:id', clienteController.atualizarInformacoesCliente);
//router.delete('/cliente/:id', clienteController.removerCliente);

module.exports = router;