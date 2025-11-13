const { produtoModel } = require("../model/produtoModel");


const produtoController = {
    
    /**
     * Controlador que lista os produtos do banco de dados
     * 
     * @async
     * @function listarProdutos
     * @param {object} req Objeto da requisão (recebido do cliente HTTP)
     * @param {object} res Obejto da resposta (enviado ao cliente HTTP)
     * @returns {Promisse<void>} Retorna uma resposta JSON com a lista de produtos
     * @throws Mostra no console e retorna erro 500 se ocorrer falha ao buscar produtos
     */

    listarProdutos: async (req, res) => {
        try {
            
            const protudos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);
            
        } catch (error) {
            
            console.error("Erro ao listar os produtos", error);
            res.status(500).json(erro, "Erro ao busca produtos");
        }
    }

}

// const produtoModel = {

//     /**
//      * Busca todos os produtos no banco de dados
//      * 
//      * @async
//      * @function buscarTodos
//      * @returns {Promise<Array>} Retorna uma lista com todos os produtos
//      * @throws Mostra no console e propaga o erro caso a busca falhe
//      * 
//      */

// }