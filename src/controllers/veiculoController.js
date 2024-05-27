// veiculoController.js
import Veiculo from '../models/Veiculo.js';

class VeiculoController {
    static async listarVeiculos(req, res) {
        try {
            const veiculos = await Veiculo.pegarVeiculos();
            res.status(200).json(veiculos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async buscarVeiculoPorPlaca(req, res) {
        const { placa } = req.params;
        try {
            const veiculo = await Veiculo.buscaCarroPorPlaca(placa);
            if (veiculo) {
                res.status(200).json(veiculo);
            } else {
                res.status(404).json({ message: 'Veículo não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async criarVeiculo(req, res) {
        const veiculoData = req.body;
        const veiculo = new Veiculo(veiculoData);
        try {
            const novoVeiculo = await veiculo.criarCarro();
            res.status(201).json(novoVeiculo);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async atualizarVeiculo(req, res) {
        const { placa } = req.params;
        const veiculoData = req.body;
        const veiculo = new Veiculo(veiculoData);
        try {
            const veiculoAtualizado = await veiculo.atualizarCarroPorPlaca(placa);
            res.status(200).json(veiculoAtualizado);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async excluirVeiculo(req, res) {
        const { placa } = req.params;
        try {
            await Veiculo.excluirCarro(placa);
            res.status(204).json({ message: 'Veículo excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default VeiculoController;