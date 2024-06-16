import { openDb } from "../configDB.js";
import { Veiculo } from "../model/veiculoModel.js";


export async function createTabelaVeiculo() {
    try {
        const db = await openDb();
        await db.exec(`
            CREATE TABLE IF NOT EXISTS Veiculo (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                marca TEXT NOT NULL,
                modelo TEXT NOT NULL,
                ano INTEGER,
                cor TEXT,
                placa TEXT NOT NULL UNIQUE,
                status TEXT DEFAULT 'disponível' CHECK(status IN ('disponível', 'indisponível')),
                valor DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (placa) REFERENCES Venda(placa)
            )
        `);
    } catch (error) {
        console.error("Erro ao criar tabela Veiculo:", error);
    }
}

//Buscando a lista de todos VEICULOS no data base

export async function buscarVeiculos(req, res) {
    try {
        const db = await openDb();
        const veiculos = await db.all("SELECT * FROM Veiculo");
        res.json(veiculos);
    } catch (error) {
        console.error("Erro ao buscar veículos:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao buscar veículos."
        });
    }
}


//Buscando o VEICULO no data base pela PLACA

export async function buscarVeiculoID(req, res) {
    let placa = req.body.placa; // Correção: req.body.placa em vez de req.bory.placa

    try {
        const db = await openDb();
        const veiculo = await db.get("SELECT * FROM Veiculo WHERE placa = ?", [placa]);
        if (veiculo) {
            res.json(veiculo); // Retorna o veiculo encontrado
        } else {
            res.status(404).json({
                statusCode: 404,
                message: "Veículo não encontrado."
            });
        }
    } catch (error) {
        console.error("Erro ao buscar veículo:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao buscar veículo."
        });
    }
}

//Inserindo o VEICULO no data base

export async function insertVeiculo(req, res) {
    const veiculo = req.body;

    // Verificar se o veiculo é válido
    if (!Veiculo.insValida(veiculo)) {
        return res.status(400).json({
            statusCode: 400,
            message: "Veículo inválido. Todos os campos são obrigatórios."
        });
    }

    // Verificar se já existe um veiculo com a mesma placa
    const veiculoExistente = await buscaVeiculoPorPlaca(veiculo.placa);
    if (veiculoExistente) {
        return res.status(400).json({
            statusCode: 400,
            message: "Veículo com essa placa já existe."
        });
    }

    // Se passou pela validação, proceder com a inserção no banco de dados
    try {
        const db = await openDb();
        await db.run(`
            INSERT INTO Veiculo (marca, modelo, ano, cor, placa, status, valor)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [veiculo.marca, veiculo.modelo, veiculo.ano, veiculo.cor, veiculo.placa, 'disponível', veiculo.valor]
            // Adicionei 'disponível' como valor padrão para o campo 'status'    
        );
        res.status(201).json({
            statusCode: 201,
            message: "Veículo inserido com sucesso."
        });
    } catch (error) {
        console.error("Erro ao inserir veículo:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao inserir veículo."
        });
    }
}


// Busca o veiculo pela a PLACA

export async function buscaVeiculoPorPlaca(placa) {
    try {
        const db = await openDb();
        const veiculo = await db.get("SELECT * FROM Veiculo WHERE placa = ?", [placa]);
        return veiculo;
    } catch (error) {
        console.error("Erro ao buscar veículo:", error);
        return null;
    }
}



// Update Veiculo no data base 

export async function updateVeiculo(req, res) {
    const veiculo = req.body;

    // Verificar se a Placa está presente no corpo da requisição
    if (!veiculo.placa) {
        return res.status(400).json({
            statusCode: 400,
            message: "Placa é obrigatória."
        });
    }

    // Validar o formato da placa
    if (!Veiculo.validarPlaca(veiculo.placa)) {
        return res.status(400).json({
            statusCode: 400,
            message: "Formato de placa inválido."
        });
    }

    try {
        const db = await openDb();

        // Verificar se o VEICULO com a PLACA fornecida existe no banco de dados
        const veiculoExistente = await db.get("SELECT * FROM Veiculo WHERE placa = ?", [veiculo.placa]);

        if (!veiculoExistente) {
            return res.status(404).json({
                statusCode: 404,
                message: "Veículo não encontrado."
            });
        }

        // Atualiza apenas os campos marca, modelo, ano, cor, status, valor
        await db.run(`
            UPDATE Veiculo
            SET marca = ?, modelo = ?, ano = ?, cor = ?, status = ?, valor = ?
            WHERE placa = ?
        `, [veiculo.marca, veiculo.modelo, veiculo.ano, veiculo.cor, veiculo.status, veiculo.valor, veiculo.placa]);

        return res.status(200).json({
            statusCode: 200,
            message: "Veículo atualizado com sucesso."
        });
    } catch (error) {
        console.error("Erro ao atualizar veículo:", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Erro ao atualizar veículo."
        });
    }
}


//Deletar o VEICULO do data base por PLACA

export async function deleteVeiculo(req, res) {
    const { placa } = req.body;

    // Verificar se a placa está presente no corpo da requisição
    if (!placa) {
        return res.status(400).json({
            statusCode: 400,
            message: "Placa é obrigatória."
        });
    }

    try {
        const db = await openDb();

        // Verificar se o VEICULO com a PLACA fornecida existe no banco de dados
        const veiculoExistente = await db.get("SELECT * FROM Veiculo WHERE placa = ?", [placa]);

        // Se não encontrar o veiculo, retorna um erro 404
        if (!veiculoExistente) {
            return res.status(404).json({
                statusCode: 404,
                message: "Veículo não encontrado."
            });
        }

        // Se encontrar o veiculo, procede com a exclusão
        await db.run("DELETE FROM Veiculo WHERE placa = ?", [placa]);

        res.json({
            statusCode: 200,
            message: "Veículo excluído com sucesso."
        });
    } catch (error) {
        console.error("Erro ao deletar veículo:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao deletar veículo."
        });
    }
}
