// vendaController.js
import Venda from '../models/venda.js';

class VendaController {
    static async listarVendas(req, res) {
        try {
            const vendas = await Venda.listaVenda();
            res.status(200).json(vendas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async buscarVendaPorId(req, res) {
        const { id } = req.params;
        try {
            const venda = await Venda.listaVendaPorId(id);
            if (venda) {
                res.status(200).json(venda);
            } else {
                res.status(404).json({ message: 'Venda não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async criarVenda(req, res) {
        const vendaData = req.body;
        const venda = new Venda(vendaData);
        try {
            const novaVenda = await venda.criarVenda();
            res.status(201).json(novaVenda);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async atualizarVenda(req, res) {
        const { id } = req.params;
        const vendaData = req.body;
        const venda = new Venda({ ...vendaData, id });
        try {
            const vendaAtualizada = await venda.atualizarVendaPorId(id);
            res.status(200).json(vendaAtualizada);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async excluirVenda(req, res) {
        const { id } = req.params;
        try {
            await Venda.excluirVenda(id);
            res.status(204).json({ message: 'Venda excluída com sucesso' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default VendaController;
