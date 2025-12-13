const http = require('http')

const contatos = [{nome:'ana',email:'ana@gmail.com'}]
const clientes = [{nome:'Joana',email:'joana@gmail.com', fone:'(47)9090-2345'}]

const server = http.createServer((req, res) => {
  
   const { url, method } = req;
  
   if(url === '/clientes'){
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify(clientes))
   }else if (url === '/contatos'){
      if(method === 'GET'){
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(JSON.stringify(contatos))
      }        
      else {
         let body = ''

         // Recebe os dados em partes
         req.on('data', chunk => {
           body += chunk
         })

         // Final da leitura
         req.on('end', () => {
            const novoContato = JSON.parse(body)
            contatos.push(novoContato)

            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
            mensagem: 'Contato inserido com sucesso',
            contato: novoContato
          }))})
      }        
   }
  else{
    res.end('Recurso não encontrado')
  }
});

const PORT = 8080
server.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

/**
 * aplicação
 * transporte (8080)
 * rede
 * Fisica
 */