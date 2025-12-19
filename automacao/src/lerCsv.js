const fs = require('fs');
const csv = require('csv-parser');

function lerCsv() {
  return new Promise((resolve) => {
    const vendas = [];

    fs.createReadStream('dados/vendas.csv')
      .pipe(csv())
      .on('data', (row) => {
        row.valor = Number(row.valor);
        vendas.push(row);
      })
      .on('end', () => {
        resolve(vendas);
      });
  });
}

module.exports = lerCsv;
