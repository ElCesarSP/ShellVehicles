import db from '../db/dbconfig.js';

class Cliente {
    constructor({
        id,
        nome,
        sobrenome,
        idade,
        cpf,
        telefone,
        email,
        created_at,
        updated_at
    }) {
        this.id = id || null;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.idade = idade;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.created_at = created_at || new Date().toISOString();
        this.updated_at = updated_at || new Date().toISOString();
    }

    static async pegaClientes() {
        return db.select('*').from('cliente');
    }

    static async pegarClientesPeloCpf(cpf) {
        const resultado = await db.select('*').from('cliente').where({ cpf });
        return resultado[0];
    }

    async criarCliente() {
        const [id] = await db('cliente').insert({
            nome: this.nome,
            sobrenome: this.sobrenome,
            idade: this.idade,
            cpf: this.cpf,
            telefone: this.telefone,
            email: this.email,
            created_at: this.created_at,
            updated_at: this.updated_at
        });

        const [registroCriado] = await db('cliente').where({ id });
        return new Cliente(registroCriado);
    }

    async atualizarCliente(cpf) {
        await db('cliente')
            .where({ cpf })
            .update({
                nome: this.nome,
                sobrenome: this.sobrenome,
                idade: this.idade,
                telefone: this.telefone,
                email: this.email,
                updated_at: new Date().toISOString()
            });

        const [registroAtualizado] = await db.select('*').from('cliente').where({ cpf });
        return new Cliente(registroAtualizado);
    }

    static async excluirCliente(cpf) {
        await db('cliente')
            .where({ cpf })
            .del();
    }

    async salvar() {
        const clienteExistente = await Cliente.pegarClientesPeloCpf(this.cpf);
        if (clienteExistente) {
            return this.atualizarCliente(this.cpf);
        }
        return this.criarCliente();
    }

    static async compraCarroPelaPlaca(carroPlaca) {
        return db('carro')
            .where({ placa: carroPlaca });
    }
}

export default Cliente;