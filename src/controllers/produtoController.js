const { produtoModel } = require("../model/produtoModel");

const produtoController = {
    
    listarProdutos: async (req, res) => {
        try {
            
            const produtos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);
            
        } catch (error) {
            
            console.error("Erro ao listar os produtos", error);
            
            res.status(500).json({ erro: "Erro ao buscar produtos" });
        }
    },

    atualizarProduto: async (req, res) => {

        try {
            
            const {idProduto} = req.params;
            const {nomeProduto, precoProduto} = req.body;

            if (idProduto.length != 36) {
                return res.status(400).json({erro: "id do produto invalido"});
            }
            

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !== 1) {
                return res.status(404).json({erro: "Produto não encontrado"});
            }

            const produtoAtual = produto[0];

            const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;
            const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;

            await produtoModel.atualizarProduto(idProduto, nomeAtualizado, precoAtualizado);

            res.status(200).json({ mensagem: "Produto atualizado com sucesso" });

        } catch (error) {
            
            console.error("Erro ao atualizar o produto", error);
            
            res.status(500).json({ erro: "Erro ao atualizar o produto" });
        }
    }
}

module.exports = { produtoController };