const { soma } = require('./calculadora')
const { lerArquivo, escreverArquivo, addArquivo } = require('./path')

console.log('ola mundo')
let resultado = soma(10,20)
console.log(resultado)

lerArquivo()

escreverArquivo()

lerArquivo()

addArquivo('melancia')

lerArquivo()
