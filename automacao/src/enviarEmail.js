const nodemailer = require('nodemailer');
async function enviarEmail(arquivo) {
       const transporter = nodemailer.createTransport({
            service: 'gmail',
                auth: {
                    user: 'vilsonmoro.proway@gmail.com',
                    pass: process.env.SENHA
                }
       })

         await transporter.sendMail({
         from: 'Automação <vilsonmoro.proway@gmail.com>',
            to:'vilsonmoro@gmail.com',
            subject: 'Relatório automático',
            text: 'Segue em anexo o relatório gerado automaticamente.',
            attachments: [
                {
                    filename: 'relatorios.xlsx',
                    path: arquivo
                }
            ]        
    })

    console.log('Email enviado com sucesso!')    
}

module.exports = enviarEmail