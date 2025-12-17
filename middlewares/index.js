const express = require('express');
const app = express();
const port = 8080;

const { validaProduto } = require('./middlewares/middleware')

app.use(express.json())

app.post('/api/v1/produto', validaProduto, (req, res) => {
   //gravar no banco
   res.status(201).send(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});