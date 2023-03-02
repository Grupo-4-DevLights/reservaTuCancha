const nodemailer = require('nodemailer');
const {CORREO, MAILPASS} = require('../config/env')

//modelos



//capa de transporte y permisos en la cuenta definida que pueda enviar mensajes a otros remitentes
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:'reservarcanchacr@gmail.com',
    pass:'azs13579'
  },
  debug: true
});

function enviarCorreo(destinatario, asunto, contenido) {
  const correo = {
    from:'reservarcanchacr@gmail.com',
    to: destinatario,
    subject: asunto,
    text: contenido
  };

  transporter.sendMail(correo, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Correo enviado: ' + info.response);
    }
  });
}

module.exports = enviarCorreo;