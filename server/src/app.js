const express = require('express');
const clienteRoutes = require('./routes/cliente/clienteRoutes');
const produtoRoutes = require('./routes/produto/produtoRoutes')
const cors = require('cors');

const app = express();

// Habilitar CORS
app.use(cors());

app.use(express.json());
app.use('/api', produtoRoutes);
app.use('/api', clienteRoutes);

module.exports = app;