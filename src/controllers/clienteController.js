// clienteController.js
import Cliente from '../models/cliente.js';

class ClienteController {
    static async listarClientes(req, res) {
        try {
            const clientes = await Cliente.pegaClientes();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async buscarClientePorCpf(req, res) {
        const { cpf } = req.params;
        try {
            const cliente = await Cliente.pegarClientesPeloCpf(cpf);
            if (cliente) {
                res.status(200).json(cliente);
            } else {
                res.status(404).json({ message: 'Cliente não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async criarCliente(req, res) {
        const clienteData = req.body;
        const cliente = new Cliente(clienteData);
        try {
            const novoCliente = await cliente.criarCliente();
            res.status(201).json(novoCliente);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async atualizarCliente(req, res) {
        const { cpf } = req.params;
        const clienteData = req.body;
        const cliente = new Cliente(clienteData);
        try {
            const clienteAtualizado = await cliente.atualizarCliente(cpf);
            res.status(200).json(clienteAtualizado);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async excluirCliente(req, res) {
        const { cpf } = req.params;
        try {
            await Cliente.excluirCliente(cpf);
            res.status(204).json({ message: 'Cliente excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default ClienteController;
