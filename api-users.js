const express = require('express')
const router = express.Router()

const { users } = require('./dados')
const validaDados = require('./middleware')

const db = require('./conexaoDB')

router.get('/', (req, res) => {
    db.connect(function(err) {
        if (err){
            res.status(400).send({mensagem: 'não foi possivel conectar', content:err})
            return
        } 
        db.query("SELECT * FROM usuarios", function (err, result, fields) {
            if (err){
                res.status(400).send({mensagem: 'Erro ao consultar dados', content: err.sqlMessage})
                return
            } 
            res.status(200).send(result);
          });        
      });    
});

router.get('/:id', (req, res) => {
   /* const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json(user);*/
    db.connect(function(err) {
        if (err){
            res.status(400).send({mensagem: 'não foi possivel conectar', content:err})
            return
        } 
        db.query("SELECT * FROM usuarios where id = ?",[req.params.id], function (err, result, fields) {
            if (err){
                res.status(400).send({mensagem: 'Erro ao consultar dados', content: err.sqlMessage})
                return
            } 
            if(result.length > 0){
                res.status(200).send(result[0])
                return
            }
            res.status(404).send({mensagem:'Usuário não encontrado'})
          });        
      });  
});

router.post('/', validaDados, (req, res) => {
    const { name, email } = req.body

    /*const newUser = {
        id: users.length + 1,
        name: name,
        email: email
    };
    users.push(newUser)
    res.status(201).send(newUser)*/
    db.connect(function(err) {
        if (err){
            res.status(400).send({mensagem: 'não foi possivel conectar', content:err})
            return
        } 
        db.query("insert into usuarios(name, email)values(?,?)",[name, email], function (err, result, fields) {
            if (err){
                res.status(400).send({mensagem: 'Erro ao inserir usuário', content: err.sqlMessage})
                return
            } 
            res.status(201).send({mensagem:'Usuário inserido com sucesso', content:{id:result.insertId, name, email}})
          });        
      }); 
});

router.delete('/:id', (req, res) => {
   /* const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

    users.splice(userIndex, 1);
    res.status(204).send();*/
    db.connect(function(err) {
        if (err){
            res.status(400).send({mensagem: 'não foi possivel conectar', content:err})
            return
        } 
        db.query("delete FROM usuarios where id = ?",[req.params.id], function (err, result, fields) {
            if (err){
                res.status(400).send({mensagem: 'Erro ao consultar dados', content: err.sqlMessage})
                return
            } 
             res.status(204).send()
          });        
      });  
});

router.put('/:id', (req, res) => {
   /* const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'Usuario não encontrado' });

    user.name = req.body.name;
    user.email = req.body.email;

    res.status(200).json({ mensagem: 'Usuário alterado com sucesso', content: user });*/
    const {id, name, email} = req.body
    db.connect(function(err) {
        if (err){
            res.status(400).send({mensagem: 'não foi possivel conectar', content:err})
            return
        } 
        db.query("update usuarios set name = ?, email = ? where id = ?",[name, email, id], function (err, result, fields) {
            if (err){
                res.status(400).send({mensagem: 'Erro ao inserir usuário', content: err.sqlMessage})
                return
            } 
            res.status(201).send({mensagem:'Usuário alterado com sucesso', content:{id, name, email}})
          });        
      }); 
});

module.exports = router