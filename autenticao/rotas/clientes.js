const express = require('express');
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/middleAuth')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('consulta cliente')
})

router.post('/',auth,(req,res)=>{
    res.send('novo cliente')
})

module.exports = router