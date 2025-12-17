const express = require('express');
const router = express.Router()

const { validaProduto } = require('../middlewares/middleware')
const db = require('../conectaDB')

router.post('/', validaProduto, async (req, res) => {
   const { nome, preco } = req.body
   const [result] = await db.execute('insert into produto (nome, preco)values(?,?)',[nome, preco])
   res.status(201).send({ mensagem:'Produto salvo com sucesso', content: {id:result.insertId, nome, preco}});
});

router.put('/:id', validaProduto, async (req, res) => {
   const {id, nome, preco } = req.body
   const result = await db.execute('update produto set nome = ?, preco = ? where id = ?',[nome, preco, id])
   res.status(200).send({ mensagem:'Produto alterado com sucesso', content: {id:result.insertId, nome, preco}});
});

router.get('/', async (req, res) => {
   const [rows] = await db.execute('select * from produto')
   res.status(200).json(rows);
});

router.get('/:id', async (req, res) => {
   const [result] = await db.execute('select * from produto where id = ?',[req.params.id])
   if(result.length === 0){
      res.status(404).send({mensagem:'Produto não encontrado'})
   }
   res.status(200).json(result[0]);
});

router.delete('/:id', async (req, res) => {
   const [result] = await db.execute('delete from produto where id = ?',[req.params.id])
   if(result.affectedRows === 0){
      res.status(404).send({mensagem:'Produto não encontrado'})
   }
   res.status(204).send();
});

module.exports = router