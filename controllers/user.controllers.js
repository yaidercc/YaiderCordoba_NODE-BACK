const {
    response,
    request
} = require('express');
const bycryptjs = require("bcryptjs");

const Usuario = require("../models/user.model");

/**
 * Funcion para obtener los usuarios de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getUsuarios = async (req = request, res = response) => {
    const {
        limite = 5, desde = 0
    } = req.query;
    // Paginacion de registros y total de registros
    const [usuarios, total] = await Promise.all([
        Usuario.find({
            estado: true
        })
        .skip(+desde)
        .limit(+limite),
        Usuario.countDocuments({
            estado: true
        })
    ]);

    res.status(403).json({
        usuarios,
        total
    });
}

/**
 * Funcion para crear un usuario
 * @param {*} req 
 * @param {*} res 
 */
const createUsuario = async (req = request, res = response) => {
    // Se recolectan los datos enviados desde el cliente
    const {
        nombre,
        correo,
        password,
        role
    } = req.body;

    // Se crea una instancia del registro que se va a agregar
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        role
    });

    // Encriptar la contraseña 
    const salt = bycryptjs.genSaltSync();
    usuario.password = bycryptjs.hashSync(password, salt);

    // Se guarda ese usuario en la base de datos
    await usuario.save();
    res.status(403).json({
        ok: true,
        msg: "Usuario agregado con exito.",
        usuario
    });
}

module.exports = {
    getUsuarios,
    createUsuario
}