const users = require('./users')
class Venda {
  static lastId = 0;

  constructor(user, veiculoInstance) {
    this.id = ++Venda.lastId;
    this.user = user || null;
    this.veiculos = [];
    this.valorTotal = 0;
    this.data = new Date();
    this.formaPagamento = null;
    this.parcelas = 1;
    this.veiculoInstance = veiculoInstance;
  }

  calcularValorTotal() {
    this.valorTotal = this.veiculos.reduce((total, veiculo) => total + veiculo.valor, 0);
  }

  definirFormaPagamento(forma, parcelas = 1) {
    switch (forma.toLowerCase()) {
      case 'dinheiro':
        if (parcelas !== 1 ) {
          throw new Error("Pagamento em Dinheiro deve ser à vista, com 1 parcela.");
        }
        this.formaPagamento = 'DINHEIRO';
        break;
      case 'credito':
        if (parcelas >48 ) {
          throw new Error("Não é permitido dividir em mais de 48 vezes, no Crédito.");
        }
        this.formaPagamento = 'CREDITO';
        break;
      case 'debito':
        if (parcelas !== 1) {
          throw new Error("Pagamento em Débito deve ser à vista, com 1 parcela.");
        }
        this.formaPagamento = 'DEBITO';
        break;
      case 'pix':
        if (parcelas !== 1) {
          throw new Error("Pagamento com PIX deve ser à vista, com 1 parcela.");
        }
        this.formaPagamento = 'PIX';
        break;
      default:
        throw new Error("Forma de pagamento inválida.");
    }
    this.parcelas = parcelas;
  }

  static adicionarVenda(vendas, user, veiculos, formaPagamento, parcelas, veiculoInstance) {
    const veiculosDisponiveis = [];
    const veiculosIndisponiveis = [];

    // Verifica a disponibilidade de cada veículo
    veiculos.forEach(veiculo => {
      const veiculoEncontrado = veiculoInstance.getVeiculoByPlaca(veiculo.placa.toUpperCase());
      if (veiculoEncontrado && veiculoEncontrado.status === 'Disponível') {
        veiculosDisponiveis.push(veiculoEncontrado);
      } else {
        veiculosIndisponiveis.push(veiculo.placa);
      }
    });

    // Se houver veículos indisponíveis, lança um erro
    if (veiculosIndisponiveis.length > 0) {
      const placaVeiculosIndisponiveis = veiculosIndisponiveis.join(', ');
      throw new Error(`Alguns veículos selecionados não estão disponíveis para venda: ${placaVeiculosIndisponiveis}`);
    }

    // Se todos os veículos estiverem disponíveis, adiciona a venda normalmente
    const novaVenda = new Venda(user, veiculoInstance);
    novaVenda.veiculos = veiculosDisponiveis;
    novaVenda.calcularValorTotal();
    novaVenda.definirFormaPagamento(formaPagamento, parcelas);

    novaVenda.veiculos.forEach(veiculo => {
      veiculoInstance.concluirVenda(veiculo.placa);
    });

    vendas.push(novaVenda);
    return this.retornaVenda(novaVenda);
  }

  static criarVenda(user, veiculoInstance) {
    const novaVenda = new Venda(user, veiculoInstance);
    return novaVenda;
  }

  static retornaVenda(venda) {
    return {
      id: venda.id,
      user: venda.user,
      veiculos: venda.veiculos,
      valorTotal: venda.valorTotal,
      data: venda.data,
      formaPagamento: venda.formaPagamento,
      parcelas: venda.parcelas
    };
  }

  adicionarVeiculoPorId(veiculoId, veiculoList) {
    const veiculo = veiculoList.find(carro => carro.id === veiculoId);
    if (veiculo && veiculo.status === 'Disponível') {
      this.veiculos.push(veiculo);
      this.calcularValorTotal();
      this.veiculoInstance.concluirVenda(veiculo.placa.toUpperCase());
      return true;
    } else {
      return false;
    }
  }

  static listarTodasVendas(vendas) {
    return vendas.map(venda => this.retornaVenda(venda));
  }

  static encontrarVendaPorId(vendas, id) {
    return vendas.find(venda => venda.id === id);
  }

  static deletarVendaPorId(vendas, id, veiculoInstance) {
    const venda = vendas.find(venda => venda.id === id);
    if (venda) {
      // Restaurar o status dos veículos associados à venda excluída
      venda.veiculos.forEach(veiculo => {
        const veiculoEncontrado = veiculoInstance.getVeiculoByPlaca(veiculo.placa.toUpperCase());
        if (veiculoEncontrado) {
          veiculoEncontrado.status = 'Disponível';
        }
      });

      // Deletar a venda
      const vendaIndex = vendas.findIndex(venda => venda.id === id);
      if (vendaIndex !== -1) {
        vendas.splice(vendaIndex, 1);
        return true;
      }
    }
    return false;
  }
}

module.exports = Venda;