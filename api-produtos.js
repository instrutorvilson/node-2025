const express = require('express')

const router = express.Router()
const pool = require('./conexaoPOOL')

const  verificaToken = require('./middleware')

router.post('/', verificaToken, async(req, res) => { //rota protegida
    const {descricao, preco} = req.body
    try{
        await pool.query('insert into produtos(descricao, preco)values(?,?)',[descricao, preco])
        res.status(201).send({message:'Produto criado com sucesso'})
    }
    catch(err){
        res.status(400).send({message:err.message})
    }
})

router.put('/:id', verificaToken, async(req, res) => { //rota protegida
    const {id, descricao, preco} = req.body
    try{
        await pool.query('update produtos set descricao = ?, preco = ? where id = ?',[descricao, preco, id])
        res.status(201).send({message:'Produto alterado com sucesso'})
    }
    catch(err){
        res.status(400).send({message:err.message})
    }
})

router.get('/', async(req, res) => {
    try{
       const result = await pool.query('select * from produtos')
        res.status(200).send(result[0])
    }
    catch(err){
        res.status(400).send({message:err.message})
    }
})

router.get('/:id', async(req, res) => {
    try{
        const result = await pool.query('select * from produtos where id = ?',[req.params.id])
         res.status(200).send(result[0][0])
     }
     catch(err){
         res.status(400).send({message:err.message})
     }
})

router.delete('/:id', verificaToken, async(req, res) => { //rota protegida
    try{
        await pool.query('delete from produtos where id = ?',[req.params.id])
        res.status(204).send()
     }
     catch(err){
         res.status(400).send({message:err.message})
     }
})
module.exports = router