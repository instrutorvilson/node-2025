/*const lerCsv = require('./src/lerCsv')

async function main(){
   const vendas = await lerCsv()
   console.log(vendas)
}
main()*/
require('dotenv').config();


const iniciarTarefa = require('./src/agendadorTarefa');

console.log('Sistema de automação iniciado...');
iniciarTarefa();



