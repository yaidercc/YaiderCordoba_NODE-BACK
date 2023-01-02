const { validationResult }= require("express-validator");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next Funcion que se llama si el middleware funciona
 * @returns 
 */
const validarCampos = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    next()
}

module.exports = {
    validarCampos
}