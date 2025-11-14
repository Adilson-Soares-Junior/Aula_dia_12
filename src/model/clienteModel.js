const { sql, getConnection } = require("../../config/db");

const clienteModel = {
  
    buscarTodos: async () => {
        try {
            const pool = await getConnection();
        } catch (error) {

        }
    },

    buscarUm: async (idClientes) => {
    },

    criarCliente: async (novoCliente) => {
        try {
            
            const pool = await getConnection();
            
        } catch (error) {
            
        }
    }
}; 

module.exports = clienteModel;