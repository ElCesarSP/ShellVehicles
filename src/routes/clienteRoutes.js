// clienteRoutes.js
import express from 'express';
import ClienteController from '../controllers/clienteController.js';

const router = express.Router();

router.get('/clientes', ClienteController.listarClientes);
router.get('/clientes/:cpf', ClienteController.buscarClientePorCpf);
router.post('/clientes', ClienteController.criarCliente);
router.put('/clientes/:cpf', ClienteController.atualizarCliente);
router.delete('/clientes/:cpf', ClienteController.excluirCliente);

export default router;
