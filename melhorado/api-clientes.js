const { clientes } = require('./dados')

function consultar(res){
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(clientes))
}

module.exports = { consultar }