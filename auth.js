const express = require('express')

const router = express.Router()
const db = require('./conexaoDB')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/login', (req, res)=>{
   const {email, senha} = req.body
   db.connect((err)=>{
        if(err){
            res.status(400).send(err.message)
            return
        }
        db.query('select * from usuarios where email = ?',[email], async(err, result, fields) => {
            if(err){
                res.status(400).send(err.message)
                return
            }
           const senhaCorreta = await bcrypt.compare(senha,result[0].senha)
           if(senhaCorreta){
              const token = jwt.sign(
                { id:result[0].id, 
                  name: result[0].name,
                  email:result[0].email,
                  perfil: 'ADM' 
                }, 
                process.env.SECRET_KEY)
              res.status(200).send({ token })
           }
           else{
             res.status(400).send({ message: "Usuário ou senha inválido"})
           } 
        })
   })
   
})

router.post('/create', async (req, res)=>{
    const hash = await bcrypt.hash(req.body.senha, 10)

    db.connect((err)=>{
        if(err){
            res.status(400).send(err.message)
            return
        }
        db.query('insert into usuarios(name,email,senha)values(?, ?,? )',
            [req.body.name,req.body.email, hash],
            (err, result, fields) => {
                if(err){
                    res.status(400).send(err.message)
                    return
                }
                res.status(201).send({ message: 'Usuário cadastro com sucesso'})
        })
    })   
 })

 router.post('/logout', (req, res)=>{
    res.status(200).send('logout')
 })

 module.exports = router