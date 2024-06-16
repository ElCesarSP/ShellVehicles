import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';

import { createTableCliente } from "../src/controllers/clienteController.js";
import { createTabelaVeiculo } from "../src/controllers/veiculoController.js";
import { createTableVenda } from "../src/controllers/vendaController.js";

createTableCliente();
createTabelaVeiculo();
createTableVenda();


const app = express();
app.use(express.json());
app.use(cors());



// Importing routes
import routercliente from './routes/clienteRoutes.js';
import routerVeiculo from './routes/veiculosRoutes.js';
import routerVenda from './routes/vendaRouter.js';


// Using the routes
app.use(routercliente);
app.use(routerVeiculo);
app.use(routerVenda);


// HTTP Server
app.listen(3000, () => console.log("Server connected, running on port 3000."));

// HTTPS Server
const httpsOptions = {
    cert: fs.readFileSync('src/SSL/code.crt'),
    key: fs.readFileSync('src/SSL/code.key')
};

https.createServer(httpsOptions, app).listen(3001, () => {
    console.log("Secure API running on HTTPS port 3001.");
});