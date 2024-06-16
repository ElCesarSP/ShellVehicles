export class Veiculo {
    constructor(marca, modelo, ano, cor, placa, status = 'disponível', valor) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
        this.placa = placa;
        this.status = status; // Adicionado o status com valor padrão 'disponível'
        this.valor = valor;
    }

    static insValida(veiculo) {
        // Validar se todos os campos obrigatórios estão preenchidos
        if (!veiculo.marca || !veiculo.modelo || !veiculo.ano || !veiculo.cor || !veiculo.placa || veiculo.valor == null) {
            return false;
        }

        // Validar se ano é um número
        if (isNaN(veiculo.ano)) {
            return false;
        }

        // Validar se valor é um número
        if (isNaN(veiculo.valor)) {
            return false;
        }

        // Validar o ano está dentro de um range razoável (por exemplo, 1886 - ano atual)
        const anoAtual = new Date().getFullYear();
        if (veiculo.ano < 1886 || veiculo.ano > anoAtual) {
            return false;
        }

        // Validar se valor é positivo
        if (veiculo.valor <= 0) {
            return false;
        }

        // Validar o formato da PLACA
        if (!Veiculo.validarPlaca(veiculo.placa)) {
            return false;
        }

        // Outras validações necessárias podem ser adicionadas aqui
        return true;
    }

    static validarPlaca(placa) {
        // Validar o formato da PLACA usando regex
        var regex = /^[A-Z]{3}[0-9]{4}$/;

        // Verifica se a PLACA tem 3 letras maiúsculas seguidas de 4 dígitos
        if (regex.test(placa)) {
            return true;
        }

        // Se não corresponder ao formato, retorna falso
        return false;
    }
}