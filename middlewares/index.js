const express = require('express');
const app = express();
const port = 8080;

const db = require('./conectaDB')

const { validaProduto } = require('./middlewares/middleware')

app.use(express.json())

app.post('/api/v1/produto', validaProduto, async (req, res) => {
   const { nome, preco } = req.body
   const [result] = await db.execute('insert into produto (nome, preco)values(?,?)',[nome, preco])
   res.status(201).send({ mensagem:'Produto salvo com sucesso', content: {id:result.insertId, nome, preco}});
});

app.put('/api/v1/produto/:id', validaProduto, async (req, res) => {
   const {id, nome, preco } = req.body
   const result = await db.execute('update produto set nome = ?, preco = ? where id = ?',[nome, preco, id])
   res.status(200).send({ mensagem:'Produto alterado com sucesso', content: {id:result.insertId, nome, preco}});
});

app.get('/api/v1/produto', async (req, res) => {
   const [rows] = await db.execute('select * from produto')
   res.status(200).json(rows);
});

app.get('/api/v1/produto/:id', async (req, res) => {
   const [result] = await db.execute('select * from produto where id = ?',[req.params.id])
   if(result.length === 0){
      res.status(404).send({mensagem:'Produto não encontrado'})
   }
   res.status(200).json(result[0]);
});

app.delete('/api/v1/produto/:id', async (req, res) => {
   const [result] = await db.execute('delete from produto where id = ?',[req.params.id])
   if(result.affectedRows === 0){
      res.status(404).send({mensagem:'Produto não encontrado'})
   }
   res.status(204).send();
});


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