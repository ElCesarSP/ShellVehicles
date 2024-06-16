import { openDb } from "../configDB.js";
import { Cliente } from "../model/clienteModel.js";

export async function createTableCliente() {
    try {
        const db = await openDb();
        await db.exec(`
        CREATE TABLE IF NOT EXISTS Cliente (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            sobrenome TEXT NOT NULL,
            idade INTEGER NOT NULL,
            cpf TEXT UNIQUE NOT NULL,
            telefone TEXT NOT NULL,
            email TEXT NOT NULL,
            FOREIGN KEY (cpf) REFERENCES Venda (cliente_cpf))
    `);
    } catch (error) {
        console.error("Erro ao criar tabela Cliente:", error);
    }
}


//Buscando a lista de todos os CLIENTES no data base


export async function buscarClientes(req, res) {
    try {
        const db = await openDb();
        const clientes = await db.all('SELECT * FROM Cliente');
        res.json(clientes);
    } catch (error) {
        console.error("Erro ao buscar todos os clientes:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao buscar todos os clientes."
        });
    }
}


//Buscando CLIENTE no data base por CPF

export async function buscarClienteCPF(req, res) {
    let cpf = req.body.cpf;

    try {
        const db = await openDb();
        const cliente = await db.get('SELECT * FROM Cliente WHERE cpf=?', [cpf]);

        if (cliente) {
            res.json(cliente); // Retorna o cliente encontrado
        } else {
            res.status(404).json({
                statusCode: 404,
                message: "Cliente não encontrado."
            });
        }
    } catch (error) {
        console.error("Erro ao buscar cliente por CPF:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao buscar cliente por CPF."
        });
    }
}


//Inserindo o CLIENTE no data base

export async function insertCliente(req, res) {
    const cliente = req.body;

    // Verificar se o cliente é válido
    if (!Cliente.isValid(cliente)) {
        return res.status(400).json({
            statusCode: 400,
            message: "Dados do cliente inválidos."
        });
    }

    // Verificar se já existe um cliente com o mesmo CPF
    const clienteExistente = await buscarClientePorCPF(cliente.cpf);
    if (clienteExistente) {
        return res.status(400).json({
            statusCode: 400,
            message: "Já existe um cliente com este CPF."
        });
    }

    // Se passou pelas validações, proceder com a inserção no banco de dados
    try {
        const db = await openDb();
        await db.run(
            `INSERT INTO Cliente (nome, sobrenome, idade, cpf, telefone, email)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [cliente.nome, cliente.sobrenome, cliente.idade, cliente.cpf, cliente.telefone, cliente.email]
        );
        res.json({
            statusCode: 200,
            message: "Cliente criado com sucesso!"
        });
    } catch (error) {
        console.error("Error inserting cliente: ", error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao criar o cliente."
        });
    }
}

async function buscarClientePorCPF(cpf) {
    try {
        const db = await openDb();
        const cliente = await db.get('SELECT * FROM Cliente WHERE cpf=?', [cpf]);
        return cliente;
    } catch (error) {
        console.error("Error searching cliente by CPF: ", error);
        return null;
    }
}


//Update CLIENTE no data base 

export async function updateCliente(req, res) {
    const cliente = req.body;

    // Verifica se o CPF está presente no corpo da requisição
    if (!cliente.cpf) {
        return res.status(400).json({
            statusCode: 400,
            message: "CPF do cliente não fornecido."
        });
    }

    try {
        const db = await openDb();

        // Verifica se o cliente com o CPF fornecido existe no banco de dados
        const checkCliente = await db.get(`
            SELECT * FROM Cliente 
            WHERE cpf = ?`,
            [cliente.cpf]
        );

        // Se não encontrar o cliente, retorna um erro 404
        if (!checkCliente) {
            return res.status(404).json({
                statusCode: 404,
                message: "Cliente não encontrado."
            });
        }

        // Atualiza apenas os campos nome, sobrenome, idade, telefone e email
        await db.run(
            `UPDATE Cliente 
            SET nome = ?, 
                sobrenome = ?, 
                idade = ?,  
                telefone = ?, 
                email = ? 
            WHERE cpf = ?`,
            [cliente.nome, cliente.sobrenome, cliente.idade, cliente.telefone, cliente.email, cliente.cpf]
        );

        res.json({
            statusCode: 200,
            message: "Cliente atualizado com sucesso!"
        });
    } catch (error) {
        console.error("Error updating cliente: ", error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao atualizar o cliente."
        });
    }
}



//Delete CLIENTE no data base por CPF

export async function deleteCliente(req, res) {
    const { cpf } = req.body;

    // Verifica se o CPF está presente no corpo da requisição
    if (!cpf) {
        return res.status(400).json({
            statusCode: 400,
            message: "CPF do cliente não fornecido."
        });
    }

    try {
        const db = await openDb();

        // Verifica se o cliente com o CPF fornecido existe no banco de dados
        const checkCliente = await db.get(`
            SELECT * FROM Cliente 
            WHERE cpf = ?`,
            [cpf]
        );

        // Se não encontrar o cliente, retorna um erro 404
        if (!checkCliente) {
            return res.status(404).json({
                statusCode: 404,
                message: "Cliente não encontrado."
            });
        }

        // Se encontrou o cliente, prossegue com a exclusão
        await db.run(`
            DELETE FROM Cliente 
            WHERE cpf = ?`,
            [cpf]
        );

        res.json({
            statusCode: 200,
            message: "Cliente deletado com sucesso!"
        });
    } catch (error) {
        console.error("Error deleting client: ", error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao deletar o cliente."
        });
    }
}

