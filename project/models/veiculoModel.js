class Veiculo {
    constructor() {
        this.veiculos = [];
    }

    addVeiculoData(marca, modelo, ano, placa, valor) {
        const placaValidation = /^[A-Z]{3}\d{4}$/;
        if (!placaValidation.test(placa)) throw new Error("A placa deve possuir 3 letras seguidas de 4 números no formato: AAA1111.");
        if (this.verificarPlacaExistente(placa)) throw new Error("A placa já existe no cadastro.");
        if (typeof marca !== 'string' || typeof modelo !== 'string') throw new Error("A marca e o modelo devem ser strings.");
        if (typeof ano !== 'number' || typeof valor !== 'number') throw new Error("O ano e o valor devem ser números.");
        const veiculo = { id: this.veiculos.length + 1, marca, modelo, ano, placa: placa.toUpperCase(), valor, status: 'Disponível' };
        this.veiculos.push(veiculo);
        return veiculo;
    }

    verificarPlacaExistente(placa) {
        return this.veiculos.some(veiculo => veiculo.placa === placa.toUpperCase());
    }

    getAllVeiculos() {
        return this.veiculos;
    }

    getVeiculoByPlaca(placa) {
        return this.veiculos.find(veiculo => veiculo.placa === placa);
    }

    updateVeiculoData(placa, marca, modelo, ano, valor, status) {
        const veiculo = this.getVeiculoByPlaca(placa);
        if (veiculo) {
            if (marca) veiculo.marca = marca;
            if (modelo) veiculo.modelo = modelo;
            if (ano) veiculo.ano = ano;
            if (valor) veiculo.valor = valor;
            if (status) {
                if (status !== 'Disponível' && status !== 'Indisponível') throw new Error("O status do veículo deve ser 'Disponível' ou 'Indisponível'.");
                veiculo.status = status;
            }
        } else {
            throw new Error('Veículo não encontrado');
        }
    }

    deleteVeiculoData(placa) {
        const veiculoIndex = this.veiculos.findIndex(veiculo => veiculo.placa === placa.toUpperCase());
        if (veiculoIndex !== -1) {
            this.veiculos.splice(veiculoIndex, 1);
        } else {
            throw new Error('Veículo não encontrado');
        }
    }
}

module.exports = Veiculo;
