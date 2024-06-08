
const Users = require('../models/users');
const Veiculo = require('../models/veiculos');
const Venda = require('../models/vendas');
const { usersInstance } = require('./usersController');
const { veiculosInstance } = require('./veiculosController');

const vendasInstance = []; // Definindo a variável vendas no escopo global

const realizarVenda = (req, res) => {
    try {
        const { comprador, veiculos, formaPagamento, parcelas } = req.body;
        const userCpf = comprador.cpf; // Acessa o CPF corretamente
        
        const user = usersInstance.getUserByCpf(userCpf);

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        console.log('Usuário encontrado:', user);

        // Verificar se todos os veículos existem e estão disponíveis
        const veiculosDisponiveis = [];
        const veiculosIndisponiveis = [];

        veiculos.forEach(veiculo => {
            const veiculoEncontrado = veiculosInstance.getVeiculoByPlaca(veiculo.placa.toUpperCase());
            if (veiculoEncontrado && veiculoEncontrado.status === 'Disponível') {
                veiculosDisponiveis.push(veiculoEncontrado);
            } else {
                veiculosIndisponiveis.push(veiculo.placa);
            }
        });

        if (veiculosIndisponiveis.length > 0) {
            return res.status(400).json({ error: `Veículo(s) não disponível(eis) ou não encontrado(s): ${veiculosIndisponiveis.join(', ')}` });
        }

        // Criar nova venda
        const novaVenda = Venda.adicionarVenda(vendasInstance, user, veiculosDisponiveis, formaPagamento, parcelas, veiculosInstance);

        res.status(201).json({
            message: `Venda criada com sucesso: ID da venda ${novaVenda.id}`,
            venda: novaVenda
        });

        console.log(`Venda criada com sucesso: ID da venda ${novaVenda.id}`, novaVenda);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getVendas = (req, res) => {
    try {
        // Formata a lista de vendas corretamente
        const vendasList = Venda.listarTodasVendas(vendasInstance);
        res.status(200).json(vendasList);
        console.log('Lista de todas as vendas:', vendasList);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter a lista de vendas' });
        console.error('Erro ao obter a lista de vendas:', error);
    }
};

const getVendaById = (req, res) => {
    const vendaId = parseInt(req.params.id);
    const venda = vendasInstance.find(v => v.id === vendaId);

    if (venda) {
        // Formatar a venda corretamente, incluindo os veículos
        const vendaFormatada = Venda.retornaVenda(venda);
        res.status(200).json(vendaFormatada);
        console.log('Venda encontrada:', vendaFormatada);
    } else {
        res.status(404).send('Venda not found');
        console.log('Venda não encontrada');
    }
};

const updateVenda = (req, res) => {
    const vendaId = parseInt(req.params.id);
    const { novoComprador, novoVeiculo, novaFormaPagamento } = req.body;
    const vendaIndex = vendasInstance.findIndex(v => v.id === vendaId);

    if (vendaIndex === -1) {
        return res.status(404).json({ error: 'Venda not found' });
    }

    const venda = vendasInstance[vendaIndex];

    if (novoComprador) {
        // Atualiza o comprador apenas se o novo comprador for fornecido
        venda.user = usersInstance.getUserByCpf(novoComprador.cpf); // Obtém o usuário pelo CPF
    }

    if (novoVeiculo) {
        // Verifica se o novo veículo existe antes de atualizar
        const veiculoNovo = veiculosInstance.getVeiculoByPlaca(novoVeiculo.placa);
        if (!veiculoNovo) {
            return res.status(404).json({ error: 'Veículo não encontrado' });
        }

        // Atualiza o status do veículo antigo para "Disponível"
        venda.veiculos.forEach(veiculo => {
            if (veiculo.status === 'Indisponível') {
                veiculo.status = 'Disponível';
            }
        });

        // Define o novo veículo como "Indisponível"
        veiculoNovo.status = 'Indisponível';

        // Atualiza a lista de veículos para conter apenas o novo veículo
        venda.veiculos = [veiculoNovo];
    }

    if (novaFormaPagamento) {
        // Atualiza a forma de pagamento apenas se uma nova forma de pagamento for fornecida
        venda.definirFormaPagamento(novaFormaPagamento);
    }

    // Retorna todos os dados da venda alterada juntamente com a mensagem de sucesso
    res.status(200).json({ message: 'Venda alterada com sucesso!', venda: venda });
    console.log('Venda alterada com sucesso!', venda);
};

const deleteVenda = (req, res) => {
    const { id } = req.params;
    const vendaId = parseInt(id, 10);

    const wasDeleted = Venda.deletarVendaPorId(vendasInstance, vendaId, veiculosInstance);
    if (wasDeleted) {
        res.status(200).json({ message: `Venda com ID ${vendaId} deletada com sucesso` });
    } else {
        res.status(404).json({ error: `Venda com ID ${vendaId} não encontrada` });
    }
};

module.exports = {
    realizarVenda,
    getVendas,
    getVendaById,
    updateVenda,
    deleteVenda,
};
