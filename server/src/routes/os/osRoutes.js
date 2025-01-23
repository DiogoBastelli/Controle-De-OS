const express = require('express');
const osController = require('../../controllers/os/osController');

const router = express.Router();

console.log("Rota antes controller")
router.post('/os', osController.adicionarOS);


module.exports = router;