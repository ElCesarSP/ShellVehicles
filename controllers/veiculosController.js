const Veiculo = require('../models/veiculos');
const veiculosInstance = new Veiculo();

const createVeiculo = (req, res) => {
    const { marca, modelo, ano, placa, valor } = req.body;
    if (veiculosInstance.getVeiculoByPlaca(placa)) {
        return res.status(400).json({ error: 'Placa já existe no cadastro' });
    }
    try {
        const novoVeiculo = veiculosInstance.addVeiculoData(marca, modelo, ano, placa, valor);
        res.status(201).json(novoVeiculo);
        console.log('Veículo criado com sucesso:', novoVeiculo);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.error('Erro ao criar veículo:', error.message);
    }
};

const getAllVeiculos = (req, res) => {
    try {
        const allVeiculos = veiculosInstance.getAllVeiculos();
        res.status(200).json(allVeiculos);
        console.log('Lista de todos os veículos:', allVeiculos);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error('Erro ao recuperar lista de veículos:', error.message);
        throw new Error("Veículo não encontrado");
    }
};

const getVeiculoByPlaca = (req, res) => {
    const veiculo = veiculosInstance.getVeiculoByPlaca(req.params.placa);
    if (veiculo) {
        res.status(200).json(veiculo);
        console.log(`Veiculo encontrado por Placa:${veiculosInstance}`)
    } else {
        res.status(404).json({ error: 'Veículo não encontrado' });
    }
};

const updateVeiculo = (req, res) => {
    const placa = req.params.placa;
    const { marca, modelo, ano, valor, status } = req.body;
    try {
        const veiculoAtualizado = veiculosInstance.updateVeiculoData(placa, marca, modelo, ano, valor, status);
        res.status(200).json(veiculoAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteVeiculo = (req, res) => {
    console.log(`Recebida solicitação para deletar veículo com placa: ${req.params.placa}`);
    try {
        const isDeleted = veiculosInstance.deletarVeiculoPorPlaca(req.params.placa);
        if (isDeleted) {
            res.status(200).json({ message: 'Veículo deletado com sucesso' });
        } else {
            res.status(404).json({ error: 'Veículo não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createVeiculo,
    getAllVeiculos,
    getVeiculoByPlaca,
    updateVeiculo,
    deleteVeiculo,
    veiculosInstance
    
};