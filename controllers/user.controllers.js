const {
    response,
    request
} = require('express');
const bycryptjs = require("bcryptjs");

const Usuario = require("../models/user.model");
const generateJWT = require("../helpers/jwt");
/**
 * Funcion para obtener los usuarios de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getUsers = async (req = request, res = response) => {
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

    res.json({
        usuarios,
        total
    });
}

/**
 * Funcion para crear un usuario
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async (req = request, res = response) => {
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
    res.json({
        ok: true,
        msg: "Usuario agregado con exito.",
        usuario
    });
}

const loginUser = async (req = request, res = response) => {
    // Se recolectan los datos enviados desde el cliente
    const {
        correo,
        password
    } = req.body;

    // Valida si existe el correo ingresado
    const usuario = await Usuario.findOne({
        correo
    });

    if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: "correo y/o clave incorrectos.",
        });
    }

    // Valida la clave 
    const validatePassword = bycryptjs.compareSync(
        password,
        usuario.password
    );

    if (!validatePassword) {
        return res.status(400).json({
            ok: false,
            msg: "correo y/o clave incorrectos.",
        });
    }

    const token = await generateJWT(correo, usuario._id,usuario.nombre);

    res.json({
        ok: true,
        msg: "Usuario logueado con exito.",
        token,
        usuario: {
            correo,
            id: usuario._id,
            nombre: usuario.nombre
        }
    });
}

/**
 * Valida la vigencia del token generado
 * @param {*} req
 * @param {*} res
 */
const validateToken = async (req, res) => {
    const {
        correo,
        id_user,
        nombre
    } = req;

    // Generara nuevo token
    const token = await generateJWT(correo, id_user);

    return res.json({
        ok: true,
        token,
        usuario: {
            correo,
            id: id_user,
            nombre
        }
    });
};


module.exports = {
    getUsers,
    createUser,
    loginUser,
    validateToken
}