function validaProduto(req, res, next) {
   const {nome, preco} = req.body
   if(nome == ''){
     res.status(400).send({ mensagem: 'Erro a inserir produto', 
        content: 'Informe nome'})
     return
   }

    if(preco == ''){
     res.status(400).send({ 
        mensagem: 'Erro a inserir produto', 
        content: 'Informe preço'})
     return
   }

   next()
}

module.exports = { validaProduto }