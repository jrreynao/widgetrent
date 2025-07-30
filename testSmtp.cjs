// Prueba rápida de conexión SMTP con nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.isracarent.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: 'info@isracarent.com',
    pass: 'Israwordpress1.'
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.error('Error de conexión SMTP:', error);
  } else {
    console.log('¡Conexión SMTP exitosa! Puedes enviar correos.');
  }
});
