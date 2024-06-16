import { Router } from "express";
import { createTableVenda, buscarVendas, buscarVendaID, inserirVenda, deletarVenda } from "../controllers/vendaController.js";

const routerVenda = Router();

routerVenda.get('/shell', (req, res) => {
    res.json({
        statusCode: 200,
        message: "API Vendas funcionando!"
    })
});

//Rota para buscar todas VENDAS
routerVenda.get('/BuscarVendas', buscarVendas);
//Rota para buscar VENDA por ID
routerVenda.get('/BuscarVendaID/:id', buscarVendaID);
//Rota para inserir VENDA no data base
routerVenda.post('/InserirVenda', inserirVenda);
//Rota para atualizar VENDA no data base
//Rota para deletar VENDA no data base
routerVenda.post('/DeletarVenda', deletarVenda)

export default routerVenda;