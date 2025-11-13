const sql = require("mssql");

const config = {
    user: "sa", // Usuario
    password: "123456789", // Senha
    server: "localhost", //Servidor
    database: "LojaEspricio", //Nome do data base que esta no SQL Server
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
};
/**
 * Cria e retorna uma conexão com o banco de dados SQL Server
 * 
 * @async
 * @function getConnection
 * @returns {Promise<object>} Retorna um objeto de conexão (pool) com o banco de dados
 * @throws Mostra no console se ocorrer um erro na conexão
 */


async function getConnection() {  // Função que ira fazer a coleta do banco de dados (Assicrona)

    try { // Tratamento de erro

        const pool = await sql.connect(config);
        return pool;

    } catch (error) {
        console.error("Erro na conexão SQL Server", error);
    }
};

// (async () => {
//     const pool = await getConnection();

//     const result = await pool.request().query('SELECT * FROM Produtos');
//     console.log(result.recordset);
// })()


module.exports = {sql, getConnection}; // Para exportar
