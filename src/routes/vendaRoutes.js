// vendaRoutes.js
import express from 'express';
import VendaController from '../controllers/vendaController.js';

const router = express.Router();

router.get('/vendas', VendaController.listarVendas);
router.get('/vendas/:id', VendaController.buscarVendaPorId);
router.post('/vendas', VendaController.criarVenda);
router.put('/vendas/:id', VendaController.atualizarVenda);
router.delete('/vendas/:id', VendaController.excluirVenda);

export default router;
