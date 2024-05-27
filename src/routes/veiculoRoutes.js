// veiculoRoutes.js
import express from 'express';
import VeiculoController from '../controllers/veiculoController.js';

const router = express.Router();

router.get('/veiculos', VeiculoController.listarVeiculos);
router.get('/veiculos/:placa', VeiculoController.buscarVeiculoPorPlaca);
router.post('/veiculos', VeiculoController.criarVeiculo);
router.put('/veiculos/:placa', VeiculoController.atualizarVeiculo);
router.delete('/veiculos/:placa', VeiculoController.excluirVeiculo);

export default router;