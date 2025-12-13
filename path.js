const fs = require('fs')
const path = require('path')

function lerArquivo() {
  const caminho = path.join(__dirname, 'frutas.txt')

  fs.readFile(caminho, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err)
      return
    }
    console.log('Conteúdo do arquivo:')
    console.log(data)
  })
}

function escreverArquivo() {
  const caminho = path.join(__dirname, 'frutas.txt')

  fs.writeFile(caminho, 'limão, garapa', 'utf8', (err) => {
    if (err) {
      console.error('Erro ao escrever no arquivo:', err)
      return
    }
    console.log('Arquivo escrito com sucesso!')
  })
}

function addArquivo(content) {
 const caminho = path.join(__dirname, 'frutas.txt')

  fs.appendFile(caminho, ` ${content}`, 'utf8', (err) => {
    if (err) {
      console.error('Erro ao adicionar no arquivo:', err)
      return
    }
    console.log('Conteúdo adicionado com sucesso!')
  })
}

module.exports = { lerArquivo, escreverArquivo, addArquivo}
