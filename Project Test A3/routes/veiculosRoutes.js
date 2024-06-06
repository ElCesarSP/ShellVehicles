const express = require('express');
const veiculosController = require('../controllers/veiculosController');

const router = express.Router();

router.post('/CreateVeiculoData', veiculosController.createVeiculo);
router.get('/PushVeiculosData', veiculosController.getAllVeiculos);
router.get('/PushVeiculosData/:placa', veiculosController.getVeiculoByPlaca);
router.put('/UpDataVeiculo/:placa', veiculosController.updateVeiculo);
router.delete('/DeleteVeiculoData/:placa', veiculosController.deleteVeiculo);

module.exports = router;