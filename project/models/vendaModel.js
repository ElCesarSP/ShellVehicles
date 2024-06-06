class Venda {
    constructor(users, veiculos) {
        this.vendas = [];
        this.users = users; // Instância da classe Users
        this.veiculos = veiculos; // Instância da classe Veiculo
    }

    calcularValorTotal(veiculos) {
        return veiculos.reduce((total, veiculo) => total + veiculo.valor, 0);
    }

    definirFormaDePagamento(forma) {
        const formasAceitas = ['à vista', 'parcelado'];
        if (!formasAceitas.includes(forma)) {
            throw new Error(`Forma de pagamento inválida. Formas aceitas: ${formasAceitas.join(', ')}`);
        }
        return forma;
    }

    addVendaData(clienteCpf, veiculosPlacas, formaDePagamento) {
        const cliente = this.users.getUserByCpf(clienteCpf);
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }

        const veiculos = veiculosPlacas.map(placa => {
            const veiculo = this.veiculos.getVeiculoByPlaca(placa);
            if (!veiculo) {
                throw new Error(`Veículo com placa ${placa} não encontrado`);
            }
            if (veiculo.status === 'Indisponível') {
                throw new Error(`Veículo com placa ${placa} já vendido`);
            }
            veiculo.status = 'Indisponível'; // Marca o veículo como vendido
            return veiculo;
        });

        const valorTotal = this.calcularValorTotal(veiculos);
        const formaPagamento = this.definirFormaDePagamento(formaDePagamento);

        const venda = { id: this.vendas.length + 1, cliente, veiculos, valorTotal, formaPagamento, data: new Date() };
        this.vendas.push(venda);
        return venda;
    }

    getAllVendas() {
        return this.vendas;
    }

    getVendaById(id) {
        return this.vendas.find(venda => venda.id === id);
    }

    updateVendaData(id, clienteCpf, veiculosPlacas, formaDePagamento) {
        const venda = this.getVendaById(id);
        if (!venda) {
            throw new Error('Venda não encontrada');
        }

        const cliente = this.users.getUserByCpf(clienteCpf);
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }

        const veiculos = veiculosPlacas.map(placa => {
            const veiculo = this.veiculos.getVeiculoByPlaca(placa);
            if (!veiculo) {
                throw new Error(`Veículo com placa ${placa} não encontrado`);
            }
            return veiculo;
        });

        venda.cliente = cliente;
        venda.veiculos = veiculos;
        venda.valorTotal = this.calcularValorTotal(veiculos);
        venda.formaPagamento = this.definirFormaDePagamento(formaDePagamento);
        venda.data = new Date();

        return venda;
    }

    deleteVendaData(id) {
        const vendaIndex = this.vendas.findIndex(venda => venda.id === id);
        if (vendaIndex !== -1) {
            this.vendas.splice(vendaIndex, 1);
        } else {
            throw new Error('Venda não encontrada');
        }
    }
}

module.exports = Venda;
