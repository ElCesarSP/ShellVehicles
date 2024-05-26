// Veiculo.js
import db from '../db/dbconfig.js';

class Veiculo {
    constructor({
        id,
        marca,
        modelo,
        ano,
        placa,
        cor,
        preco,
        created_at,
        updated_at,
    }) {
        this.id = id || null;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.placa = placa;
        this.cor = cor;
        this.preco = preco;
        this.created_at = created_at || new Date().toISOString();
        this.updated_at = updated_at || new Date().toISOString();
    }

    static async pegarVeiculos() {
        return db.select('*').from('carro');
    }

    static async buscaCarroPorPlaca(placa) {
        const resultado = await db.select('*').from('carro').where({ placa });
        return resultado[0];
    }

    async criarCarro() {
        const [id] = await db('carro').insert({
            marca: this.marca,
            modelo: this.modelo,
            ano: this.ano,
            placa: this.placa,
            cor: this.cor,
            preco: this.preco,
            created_at: this.created_at,
            updated_at: this.updated_at,
        });

        const [registroCriado] = await db('carro').where({ id });
        return new Veiculo(registroCriado);
    }

    async atualizarCarroPorPlaca(placa) {
        await db('carro')
            .where({ placa })
            .update({
                marca: this.marca,
                modelo: this.modelo,
                ano: this.ano,
                placa: this.placa,
                cor: this.cor,
                preco: this.preco,
                updated_at: new Date().toISOString(),
            });

        const [registroAtualizado] = await db.select('*').from('carro').where({ placa });
        return new Veiculo(registroAtualizado);
    }

    static async excluirCarro(placa) {
        await db('carro')
            .where({ placa })
            .del();
    }

    async salvarCarro() {
        const carroExistente = await Veiculo.buscaCarroPorPlaca(this.placa);
        if (carroExistente) {
            return this.atualizarCarroPorPlaca(this.placa);
        }
        return this.criarCarro();
    }
}

export default Veiculo;