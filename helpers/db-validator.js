const Usuario = require("../models/user.model");

/**
 * Funcion para validar si el email ingresado existe
 * @param {*} correo 
 */
const emailExists = async (correo = '') => {
    const existeEmail = await Usuario.findOne({
        correo
    });
    if (existeEmail) throw new Error(`El correo ${correo} ya se encuentra registrado`);
}


module.exports = {
    emailExists
}