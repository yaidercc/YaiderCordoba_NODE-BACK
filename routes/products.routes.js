const {
    Router
} = require("express");
const {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
} = require("../controllers/product.controllers");
const {
    check
} = require("express-validator");

const {
    validarCampos
} = require("../middlewares/validar-campos");

const {
    existsProductById
} = require("../helpers/db-validator");

const router = Router();

// Express validator para validar campos antes de enviarlos (middlewares)
// router.get('/', getProducts);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existsProductById),
    validarCampos
], updateProduct);

router.post('/', [
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('imagen', 'La imagen es incorrecta').not().isEmpty(),
    check('precio', 'El precio no es valido').not().isEmpty(),
    check('calificacion','El precio no es valido').not().isEmpty(),
    validarCampos
], createProduct);

// router.delete('/:id', [
//     check('id', 'No es un ID valido').isMongoId(),
//     check('id').custom(existsUserById),
//     validarCampos
// ], deleteUsuarios);

// router.patch('/', patchUsuarios);

module.exports = router;