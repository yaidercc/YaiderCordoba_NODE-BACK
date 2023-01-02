const Usuario = require("../models/user.model");
const Producto = require("../models/product.model");

/**
 * Funcion para validar si el email ingresado existe
 * @param {*} correo 
 */
const emailExists = async (correo = '') => {
    const existsEmail = await Usuario.findOne({
        correo
    });
    if (existsEmail) throw new Error(`El correo ${correo} ya se encuentra registrado`);
}

/**
 * Funcion para validar si el email ingresado existe
 * @param {*} correo 
 */
const existsProductById = async (id) => {
    const existsProduct = await Producto.findById(id);
    if (!existsProduct) throw new Error(`El producto con el id ${id}, No existe.`);
}

/**
 * Valida la extencion de una imagen
 * @param {*} name 
 */
const validateImage = async (name='') => {
    if (!/^[a-z0-9]+\.(jpeg|png|webp|jpg)$/.test(name)) throw new Error(`La extension de la imagen no esta permitido.`);
}


module.exports = {
    emailExists,
    existsProductById,
    validateImage
}