const express = require('express');
const produtoController = require('../../controllers/produto/produtoController');

const router = express.Router();

console.log("Rota antes controller")
router.post('/produto', produtoController.adicionarProduto);
router.get('/produto',produtoController.listarProduto);
router.get('/produto/:NumSerie?', produtoController.pesquisarProduto);
// router.put('/produto/:id', produtoController.atualizarInformacoesProduto);
router.delete('/produto/:id', produtoController.removerProduto);

module.exports = router;