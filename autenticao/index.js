const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

app.post('/api/v1/usuario/login', async (req, res) => {
  const { email, senha } = req.body
  const [rows] = await db.query('select * from usuarios where email = ?',[email])

  if(rows.length === 0){
    res.status(404).json({ error: 'Usuário não encontrado' });
    return 
  }
  const usuario = rows[0]
  const senhaValida = await bcrypt.compare(senha,usuario.senha)
  
  if(!senhaValida){
    res.status(400).json({ error: 'Senha inválida' });
    return 
  }
  const {id, nome} = rows[0] 
  const token = jwt.sign({id, nome, email, perfil: 'ADM'},'secret-123', {expiresIn: '1h'})

  res.status(200).json({token})
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});