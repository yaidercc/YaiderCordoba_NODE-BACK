/* *** Modulos externos *** */

const {
    Router
} = require("express");

const {
    check
} = require("express-validator");

/* *** Modulos internos *** */

const {
    getUsers,
    createUser,
    loginUser,
    validateToken,
    sendEmailToUpdatePass,
    resetPassword,
    validateDataJwt
} = require("../controllers/user.controllers");

const {
    validarCampos
} = require("../middlewares/validar-campos");

const {
    emailExists,
} = require("../helpers/db-validator");

const {
    validateJWT
} = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', getUsers);

router.post('/createUser', [
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('password', 'El password debe de ser da mas de 6 caracteres').isLength({
        min: 6
    }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExists),
    validarCampos
], createUser);

router.post('/login', [
    check('correo', 'El correo no es valido').not().isEmpty(),
    check('password', 'El password debe de ser da mas de 6 caracteres').not().isEmpty(),
    validarCampos
], loginUser);

router.post(
    "/sendEmailToUpdatePass",
    [check("correo", "El correo es oligatorio").not().isEmpty(), validarCampos],
    sendEmailToUpdatePass
);

router.put(
    "/resetPassword/:id",
    [
        check("id", "El id es obligatorio").not().isEmpty(),
        check("clave", "La clave es oligatoria").not().isEmpty(),
        validarCampos,
    ],
    resetPassword
);

router.get("/validateToken", validateJWT, validateDataJwt);

router.get("/renew", validateJWT, validateToken)

module.exports = router;