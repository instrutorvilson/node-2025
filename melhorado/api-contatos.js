const dados = require('./dados')

function inserir(req, res) {
    let body = ''

    // Recebe os dados em partes
    req.on('data', chunk => {
        body += chunk
    })

    // Final da leitura
    req.on('end', () => {
        const novoContato = JSON.parse(body)
        dados.contatos.push(novoContato)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            mensagem: 'Contato inserido com sucesso',
            contato: novoContato
        }))
    })
}

function consultar(res){
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(dados.contatos))
}

module.exports = {inserir, consultar}