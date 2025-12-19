const XLSX = require('xlsx');
const enviarEmail = require('./enviarEmail')

function gerarExcel(dados) {
  const planilha = XLSX.utils.json_to_sheet(dados);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, planilha, 'Relatório');

  const nomeArquivo = `relatorios/relatorio_${Date.now()}.xlsx`;
  XLSX.writeFile(workbook, nomeArquivo);

  console.log('Relatório gerado:', nomeArquivo);
  enviarEmail(nomeArquivo)
}

module.exports = gerarExcel;
