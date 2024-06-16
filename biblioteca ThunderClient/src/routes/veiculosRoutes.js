import { Router } from "express";
import { createTabelaVeiculo, buscarVeiculos, buscarVeiculoID, insertVeiculo, updateVeiculo, deleteVeiculo } from "../controllers/veiculoController.js";

const routerVeiculo = Router();

// Rota principal para verificar se a API de veículos está funcionando
routerVeiculo.get('/vehicle', (req, res) => {
    res.json({
        statusCode: 200,
        message: "API Veículos funcionando!"
    });
});


// Rota para buscar todos os veiculo
routerVeiculo.get('/BuscarVeiculos', buscarVeiculos);
// Rota para buscar um veiculo por ID
routerVeiculo.get('/BuscarVeiculo', buscarVeiculoID);
// Rota para inserir um novo veiculo
routerVeiculo.post('/InserirVeiculo', insertVeiculo);
// Rota para atualizar um veiculo
routerVeiculo.put('/AtualizarVeiculo', updateVeiculo);
// Rota para deletar um veiculo
routerVeiculo.delete('/DeletarVeiculo', deleteVeiculo);

export default routerVeiculo;
