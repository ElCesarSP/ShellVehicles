import { Router } from "express";
import { createTableCliente, insertCliente, updateCliente, buscarClientes, buscarClienteCPF, deleteCliente } from '../controllers/clienteController.js';

const routercliente = Router();

// Rota principal para verificar se a API está funcionando

routercliente.get('/client', (req, res) => {
    res.json({
        statusCode: 200,
        message: "API Cliente funcionando!"
    });
});


// Rota para buscar todos os clientes
routercliente.get('/BuscarClientes', buscarClientes);
// Rota para buscar um cliente por ID
routercliente.get('/BuscarCliente', buscarClienteCPF);
// Rota para inserir um novo cliente
routercliente.post('/CriarCliente', insertCliente)
// Rota para atualizar um cliente existente
routercliente.put('/AtualizarCliente', updateCliente);
// Rota para deletar um cliente
routercliente.delete('/DeletarCliente', deleteCliente);

export default routercliente;
