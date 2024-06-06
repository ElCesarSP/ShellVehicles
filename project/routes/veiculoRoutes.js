const express = require('express');
const router = express.Router();
const veiculosController = require('../controllers/veiculoController');

router.post('/CreateVeiculoData', veiculosController.createVeiculo);
router.get('/PushVeiculosData', veiculosController.getAllVeiculos);
router.get('/PushVeiculosData/:placa', veiculosController.getVeiculoByPlaca);
router.put('/UpDataVeiculo/:placa', veiculosController.updateVeiculo);
router.delete('/DeleteVeiculoData/:placa', veiculosController.deleteVeiculo)

module.exports = router;
