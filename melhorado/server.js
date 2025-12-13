const http = require('http')
const dados = require('./dados')
const { inserir, consultar } = require('./api-contatos')
const cliente = require('./api-clientes')


const server = http.createServer((req, res) => {
  
   const { url, method } = req;
  
   if(url === '/clientes'){
     cliente.consultar(res)
   }else if (url === '/contatos'){
      if(method === 'GET'){
          consultar(res)
      }        
      else {
         inserir(req, res) 
      }        
   }
  else{
    res.end('Recurso não encontrado')
  }
});

module.exports = server