const {
    response,
    request
} = require('express');
const bycryptjs = require("bcryptjs");

const Usuario = require("../models/user.model");
const generateJWT = require("../helpers/jwt");
const sedMails = require('../helpers/sendMail');
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
    } = req.body;

    // Se crea una instancia del registro que se va a agregar
    const usuario = new Usuario({
        nombre,
        correo,
        password,
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

    const token = await generateJWT(correo, usuario._id, usuario.nombre,"24h");

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

/**
 * Funcion encargada de enviar correo al usuario para cambiar la clave
 * @param {*} id_user
 * @returns
 */
const sendEmailToUpdatePass = async (req, res) => {
    const {
        correo
    } = req.body;
    const user = Usuario.findOne({
        email: correo
    })
    if (user) {
        const token = await generateJWT(correo, user.id,"", "1h");
        sedMails(
            "Contraseña Crud tienda",
            "Este correo es para cambiar tu contraseña",
            `<a href="http://localhost:3500/resetPassword/${token}">Reestablecer contraseña</a>`,
            correo
        ).catch((err) => {
            return res.status(400).json({
                ok: false,
                msg: "Hubo un error al enviar el correo: " + err,
            });
        });

        return res.json({
            ok: true,
            msg: "Correo enviado con exito."
        });
    }
    return res.status(400).json({
        ok: false,
        msg: "El correo especificado no existe.",
    });

};

/**
 * Funcion encargada de resetear la clave de un usuario
 * @param {*} id_user
 * @returns
 */
const resetPassword = async (req, res) => {
    const {
        id_user
    } = req.params;
    const {
        clave
    } = req.body;

    try {
        const salt = bcryptjs.genSaltSync(); // Conjunto de datos aleatorios para encryptar la clave
        encClave = bcryptjs.hashSync(clave, salt); // Codificacion o encriptacion de clave

        const response = await mysqlRequest(
            `UPDATE USUARIOS SET CLAVE = ? WHERE ID_USUARIO=?`,
            [encClave, id_user]
        );

        return res.json({
            ok: true,
            msg: "Clave actualizada con exito con exito",
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hubo un error al realizar la operacion: " + error,
        });
    }
};
/**
 * Valida la vigencia y los datos de un token jwt
 * @param {*} req
 * @param {*} res
 */
const validateDataJwt = async (req, res) => {
    const {
        id_user,
        correo
    } = req;

    if (!id_user || !correo) {
        return res.status(400).json({
            ok: false,
            msg: "Token expirado.",
        });
    }
    return res.json({
        ok: true,
        id_user,
        correo,
    });
};


module.exports = {
    getUsers,
    createUser,
    loginUser,
    validateToken,
    sendEmailToUpdatePass,
    resetPassword,
    validateDataJwt
}