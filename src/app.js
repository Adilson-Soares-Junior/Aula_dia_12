const express = require("express");
const app = express();
const {} = require("./src/routes/produtoRoutes");
const {produtoRoutes} = require("./routes/produtoRoutes");
const PORT = 8003;

app.use(express.json());
app.use("./", produtoRoutes);

app.listen(PORT, ()=> (
    console.log(`Servidor rodando em https://localhost:${PORT}`)
));