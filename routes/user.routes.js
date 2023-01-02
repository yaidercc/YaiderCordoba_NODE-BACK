/* *** Modulos externos *** */

const {
    Router
} = require("express");

const {
    check
} = require("express-validator");

/* *** Modulos internos *** */

const {
    getUsuarios,
    createUsuario,
} = require("../controllers/user.controllers");

const {
    validarCampos
} = require("../middlewares/validar-campos");

const {
    emailExists
} = require("../helpers/db-validator");

const router = Router();

// Express validator para validar campos antes de enviarlos (middlewares)
router.get('/', getUsuarios);

router.post('/', [
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('password', 'El password debe de ser da mas de 6 caracteres').isLength({
        min: 6
    }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExists),
    validarCampos
], createUsuario);


module.exports = router;