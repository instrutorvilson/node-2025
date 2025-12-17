const express = require('express');
const mysql = require('mysql2');

const con = require('./conexaoDB')

const app = express();
const port = 8080;

app.use(express.json())

app.get('/api/v1/produto', (req, res) => {
  con.connect(function(err) {
        if (err) {
            res.status(501).send({ mensagem: 'Erro consultar produto', content: err});
            return
        }
        let sql = 'select * from produto';
        con.query(sql, function (err, result) {
            if (err) {
               res.status(501).send({ mensagem: 'Erro consultar', content: err});
              return
            } 
           res.status(200).send(result);        
        });
    });    
});

app.post('/api/v1/produto', (req, res) => { 
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

app.put('/api/v1/produto/:id', (req, res) => { 
    //fazer chamada para ver se produto com esse id existe

    const {id, nome, preco} = req.body  
    console.log(req.params.id)
    con.connect(function(err) {
        if (err) {
            res.status(501).send({ mensagem: 'Erro de conexão', content: err});
            return
        }
        let sql = 'update produto set nome = ?, preco = ? where id = ?' //evita sqlinjection
        con.query(sql,[nome, preco, id], function (err, result) {
            if (err) {
               res.status(501).send({ mensagem: 'Erro ao alterar produto', content: err});
              return
            } 
            res.status(201).send({ mensagem: 'Produto alterado com sucesso', content: req.body});        
        });
    });     
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});