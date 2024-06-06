const express = require('express');
const vendasController = require('../controllers/vendasController');

const router = express.Router();

router.post('/addVendaData', vendasController.realizarVenda);
router.get('/vendas', vendasController.getVendas);
router.get('/vendas/:id', vendasController.getVendaById);
router.put('/upDataVendas/:id', vendasController.updateVenda);
router.delete('/deleteVenda/:id', vendasController.deleteVenda);

module.exports = router;
