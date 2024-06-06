const Users = require('../models/userModel');
const Veiculo = require('../models/veiculoModel');
const Venda = require('../models/vendaModel');

const users = new Users();
const veiculos = new Veiculo();
const vendas = new Venda(users, veiculos);

const createVenda = (req, res) => {
    try {
        const { clienteCpf, veiculosPlacas, formaDePagamento } = req.body;
        const newVenda = vendas.addVendaData(clienteCpf, veiculosPlacas, formaDePagamento);
        res.status(201).json(newVenda);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllVendas = (req, res) => {
    res.json(vendas.getAllVendas());
};

const getVendaById = (req, res) => {
    const { id } = req.params;
    const venda = vendas.getVendaById(id);
    if (venda) {
        res.json(venda);
    } else {
        res.status(404).json({ error: 'Venda não encontrada' });
    }
};

const updateVenda = (req, res) => {
    try {
        const { id } = req.params;
        const { clienteCpf, veiculosPlacas, formaDePagamento } = req.body;
        vendas.updateVendaData(id, clienteCpf, veiculosPlacas, formaDePagamento);
        res.json({ message: 'Venda atualizada com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteVenda = (req, res) => {
    try {
        const { id } = req.params;
        vendas.deleteVendaData(id);
        res.json({ message: 'Venda deletada com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createVenda,
    getAllVendas,
    getVendaById,
    updateVenda,
    deleteVenda
};
