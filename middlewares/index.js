const express = require('express');
const app = express();
const port = 8080;


const rotasProduto = require('./rotas/produtos')
const rotasCliente = require('./rotas/clientes')


app.use(express.json())

app.use('/api/v1/produto', rotasProduto)
app.use('/api/v1/cliente', rotasCliente)


/**app.post('/api/v1/produto', (req, res) => { 
    const novoProduto = {
        nome:req.body.nome,
        preco:req.body.preco,
        id:0
    }   
    con.connect(function(err) {
        if (err) {
            res.status(501).send({ mensagem: 'Erro ao salvar produto', content: err});
            return
        }
        let sql = `INSERT INTO produto (nome, preco) VALUES ('${req.body.nome}', '${req.body.preco}')`;
        con.query(sql, function (err, result) {
            if (err) {
               res.status(501).send({ mensagem: 'Erro ao salvar produto', content: err});
              return
            } 
            novoProduto.id = result.insertId   
            res.status(201).send({ mensagem: 'Produto salvo com sucesso', content: novoProduto});        
        });
    });     
});
 */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});