const express = require('express');
const osController = require('../../controllers/os/osController');

const router = express.Router();

console.log("Rota antes controller")
router.post('/os', osController.adicionarOS);
router.get('/os', osController.listarOS )
router.get('/os/:id?', osController.listarOSPorId )
router.get('/os/status/:status', osController.pesquisarOsStatus);
router.patch('/os/:id' , osController.atualizarStatusOS)
router.patch('/os/orcamento/:id', osController.atualizarOrcamento);



module.exports = router;