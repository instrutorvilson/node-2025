const express = require('express');
const router = express.Router()

router.get('/',(req, res) => {
    res.status(200).send('Lista de clientes')
})

router.post('/',(req, res) => {
    res.status(201).send('novo cliente')
})

module.exports = router