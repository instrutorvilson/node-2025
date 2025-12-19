const cron = require('node-cron');
const lerCsv = require('./lerCsv');
const gerarExcel = require('./gerarExcel');

function iniciarTarefa() {
  cron.schedule('* * * * *', async () => {
    console.log('Executando automação...');

    const dados = await lerCsv();
    gerarExcel(dados);
  });
}

module.exports = iniciarTarefa;
