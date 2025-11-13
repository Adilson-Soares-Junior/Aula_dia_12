const {sql, getConnection} = require("../config/db"); // Para acessar a mesma pasta na mesma pasta sera usado ../

const produtoModel = {
    buscarTodos: async () => {
        try {
            const pool = await getConnection();

            const querySQL = 'SELECT * FROM Produtos'; 

            const result =  await pool.request()
                .query(querySQL);
            
            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar produtos", error);
            throw error; //Reverberar o erro para a função que o chamar
        }
    }
}

module.exports = {produtoModel};