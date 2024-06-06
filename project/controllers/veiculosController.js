const Veiculo = require('../models/veiculoModel');
const veiculos = new Veiculo();

const createVeiculo = (req, res) => {
    try {
        const { marca, modelo, ano, placa, valor } = req.body;
        const newVeiculo = veiculos.addVeiculoData(marca, modelo, ano, placa, valor);
        res.status(201).json(newVeiculo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllVeiculos = (req, res) => {
    res.json(veiculos.getAllVeiculos());
};

const getVeiculoByPlaca = (req, res) => {
    const { placa } = req.params;
    const veiculo = veiculos.getVeiculoByPlaca(placa);
    if (veiculo) {
        res.json(veiculo);
    } else {
        res.status(404).json({ error: 'Veículo não encontrado' });
    }
};

const updateVeiculo = (req, res) => {
    try {
        const { placa } = req.params;
        const { marca, modelo, ano, valor, status } = req.body;
        veiculos.updateVeiculoData(placa, marca, modelo, ano, valor, status);
        res.json({ message: 'Veículo atualizado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteVeiculo = (req, res) => {
    try {
        const { placa } = req.params;
        veiculos.deleteVeiculoData(placa);
        res.json({ message: 'Veículo deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createVeiculo,
    getAllVeiculos,
    getVeiculoByPlaca,
    updateVeiculo,
    deleteVeiculo
};
