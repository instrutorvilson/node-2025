const express = require('express');
const app = express();
const port = 8080;
const rotasUsuario = require('./rotas/usuarios')
const rotasCliente = require('./rotas/clientes')

app.use(express.json())

app.use('/api/v1/usuario', rotasUsuario)
app.use('/api/v1/cliente', rotasCliente)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});