const fs = require('fs')

const lerArquivo = () => fs.readFile('frutas.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

module.exports = lerArquivo

