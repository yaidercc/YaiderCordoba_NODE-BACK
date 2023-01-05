const {
    Router
} = require("express");

const {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProduct,
    getProductsByUser
} = require("../controllers/product.controllers");
const {
    check
} = require("express-validator");

const {
    validarCampos
} = require("../middlewares/validar-campos");

const {
    existsProductById,
    validateImage
} = require("../helpers/db-validator");
const {
    validateJWT
} = require("../middlewares/validar-jwt");

const router = Router();

// Express validator para validar campos antes de enviarlos (middlewares)
router.get('/', getProducts);

router.get('/getProduct/:id', getProduct);

router.put('/updateProduct/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existsProductById),
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('imagen', 'La imagen es incorrecta').not().isEmpty(),
    check('imagen').custom(validateImage),
    check('precio', 'El precio no es valido').not().isEmpty(),
    validarCampos
], updateProduct);

router.post('/createProduct', [
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('imagen', 'La imagen es incorrecta').not().isEmpty(),
    check('imagen').custom(validateImage),
    check('precio', 'El precio no es valido').not().isEmpty(),
    check('propietario', 'El propietario es obligatorio').not().isEmpty(),
    check('propietario', 'El propietario es invalido').isMongoId(),
    validarCampos
], createProduct);

router.delete('/deleteProduct/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existsProductById),
    validarCampos
], deleteProduct);

router.get("/getProducts/:id",
    check('id', 'No es un ID valido').isMongoId(),getProductsByUser)
// router.patch('/', patchUsuarios);

module.exports = router;