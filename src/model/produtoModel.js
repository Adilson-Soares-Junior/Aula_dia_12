const sql = require('mssql'); 
const { getConnection } = require('../database/connection'); 

const { produtoModel } = require("../models/produtoModel");
const clienteModel = require("../models/clienteModel");


const produtoController = {
    listarProdutos: async (req, res) => {
        try {
            const { idProduto } = req.query;

            if (idProduto) {
                if (idProduto.length != 36) {
                    return res.status(400).json({ erro: "id do produto invalido!" });
                }

                const produto = await produtoModel.buscarUm(idProduto);

                return res.status(200).json(produto);
            }

            const produtos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);

        } catch (error) {
            console.error('Erro ao listar produtos', error);
            res.status(500).json({ erro: 'Erro ao buscar produtos.' });
        }
    },

    criarProduto: async (req, res) => {
        try {
            const { nomeProduto, precoProduto } = req.body;

            if (nomeProduto == undefined || nomeProduto.trim() == "" || precoProduto == undefined || isNaN(precoProduto)) {
                return res.status(400).json({ erro: "Campos obrigatorios não preenchidos" });
            }

            await produtoModel.inserirProduto(nomeProduto, precoProduto);

            res.status(201).json({ message: "Produto cadastrado com sucesso" });

        } catch (error) {
            console.error('Erro ao cadastrar produto', error);
            res.status(500).json({ erro: 'Erro ao cadastrar produtos.' });
        }
    },

    
    atualizarProduto: async (req, res) => { 
        
        try {
            const { idProduto } = req.params; 
            const { nomeProduto, precoProduto } = req.body;

            if (!nomeProduto || precoProduto === undefined) {
                return res.status(400).json({ erro: "Campos obrigatórios não preenchidos." });
            }

            const pool = await getConnection();

            const querySql = `
                UPDATE Produtos
                SET nomeProduto = @nomeProduto, 
                    precoProduto = @precoProduto
                WHERE idProduto = @idProduto 
                `;

            await pool.request()
                .input("idProduto", sql.UniqueIdentifier, idProduto)
                .input("nomeProduto", sql.Varchar(100), nomeProduto)
                .input("precoProduto", sql.Decimal(10, 2), precoProduto)
                .query(querySql);

            res.status(200).json({ message: "Produto atualizado com sucesso" });

        } catch (error) {
            console.error("Erro ao atualizar o produto", error);
            res.status(500).json({ erro: "Erro ao atualizar o produto." });
        }
    }
}

const clienteController = {

    listarClientes: async (req, res) => {
        try {
            
            const { idClientes } = req.query;

            // 1. SE UM ID FOI FORNECIDO (buscaUm)
            if (idClientes) {
                if (idClientes.length !== 36) {
                    return res.status(400).json({ erro: "ID do cliente inválido!" });
                }

                const cliente = await clienteModel.buscarUm(idClientes);
                return res.status(200).json(cliente);
            }

            // 2. SE NENHUM ID FOI FORNECIDO (buscarTodos)
            const clientes = await clienteModel.buscarTodos();
            res.status(200).json(clientes);

        } catch (error) {
            console.error('Erro ao listar clientes', error);
            res.status(500).json({ erro: 'Erro ao buscar clientes.' });
        }
    },

    criarCliente: async (req, res) => {
        try {
            // 1. Pega os dados do corpo (body) da requisição
            const { nomeCliente, cpfCliente } = req.body;

            // 2. Validação simples
            if (!nomeCliente || !cpfCliente) {
                return res.status(400).json({
                    erro: "Nome e CPF são obrigatórios."
                });
            }

            const novoCliente = { nomeCliente, cpfCliente };
            const clienteCriado = await clienteModel.criarCliente(novoCliente);

            res.status(201).json(clienteCriado);

        } catch (error) {

            if (error.message === "Este CPF já está cadastrado.") {

                return res.status(409).json({
                    erro: error.message
                });
            }

            console.error("Erro ao criar cliente:", error);
            res.status(500).json({
                erro: "Erro interno no servidor ao tentar criar o cliente."
            });
        }
    }
};

module.exports = {
    produtoController,
    clienteController // Adicionamos o controller de cliente à exportação
};