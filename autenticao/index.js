const express = require('express');
const bcrypt = require('bcrypt')
const app = express();
const port = 8080;
const db = require('./conexaoDB')

app.use(express.json())

app.post('/api/v1/usuario/create', async (req, res) => {
  const {nome, email, senha} = req.body  
  try{
    const senhaHash = await bcrypt.hash(senha,10)
    await db.query('insert into usuarios (nome, email, senha)values(?, ?,?)',[nome, email, senhaHash])
    res.status(201).send({mensagem: 'usuário cadastrdo com sucesso'})
  }catch(err){
     res.status(400).send({mensagem: 'Erro ao salvar usuário', content: err.message})
  }
});

app.post('/api/v1/usuario/login', (req, res) => {
  res.send('login');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});