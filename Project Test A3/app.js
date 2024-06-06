const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/usersRoutes');
const veiculoRoutes = require('./routes/veiculosRoutes');
const vendaRoutes = require('./routes/vendasRoutes');

app.use(bodyParser.json());

app.use('/users', usersRoutes);
app.use('/veiculos', veiculoRoutes);
app.use('/vendas', vendaRoutes);

module.exports = app;