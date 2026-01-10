const express = require('express')

const router = express.Router()


const  verificaToken = require('./middleware')

router.post('/', verificaToken, (req, res) => { //rota protegida
   
    //enviar para o banco de dados

    res.status(201).send({message:'Produto criado com sucesso'})
})

router.put('/:id', verificaToken, (req, res) => { //rota protegida
    res.status(200).send({message:'Produto alterado com sucesso'})
})

router.get('/', (req, res) => {
    res.status(201).send({message:'produtos'})
})

router.get('/:id', (req, res) => {
    res.status(201).send({message:`Produto: ${req.params}`})
})

router.delete('/:id', verificaToken, (req, res) => { //rota protegida
    res.status(201).send({message:`Deletado ID: ${req.params}`})
})
module.exports = router