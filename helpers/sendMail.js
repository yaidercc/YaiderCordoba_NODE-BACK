const nodemailer = require("nodemailer");

const sedMails = (asunto, contenido, html, email) => {
  return new Promise((resolve, reject) => {
    // Crea una instancia de un transportador de correo
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ycordobacc@gmail.com",
        pass: "wyrvrutjucetzhse",
      },
    });

    // Define la información del correo electrónico
    let mailOptions = {
      from: "ycordobacc@gmail.com",
      to: email,
      subject: asunto,
      text: contenido,
    //   html: `<h1>Contraseña: ${clave}</h1>`,
      html
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject({
          ok: false,
          msg: "Hubo un error al enviar el mensaje",
        });
      } else {
        resolve({
          ok: true,
          msg: "Mensaje enviado con exito",
        });
      }
    });
  });
};

module.exports = sedMails;
