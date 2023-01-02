const {
    response,
    request
} = require('express');

const Producto = require("../models/product.model");

/**
 * Funcion para obtener todos los productos
 * @param {*} req 
 * @param {*} res 
 */
const getProducts = async (req = request, res = response) => {
    const {
        limite = 5, desde = 0
    } = req.query;
    // Paginacion de registros y total de registros
    const [productos, total] = await Promise.all([
        Producto.find({
            estado: true
        })
        .skip(+desde)
        .limit(+limite),
        Producto.countDocuments()
    ]);

    res.status(403).json({
        productos,
        total
    });
}

/**
 * Funcion para obtener un solo producto
 * @param {*} req 
 * @param {*} res 
 */
const getProduct = async (req = request, res = response) => {
    const {
        id
    } = req.params;

    // Borrar registro fisicamente
    const producto=await Producto.findById(id);

    res.json({
        producto
    });
}


/**
 * Funcion para crear un producto
 * @param {*} req 
 * @param {*} res 
 */
const createProduct = async (req = request, res = response) => {

    const {
        nombre,
        imagen,
        precio,
        calificacion,propietario
    } = req.body;

    const producto = new Producto({
        nombre,
        imagen,
        precio,
        calificacion,
        propietario

    });

    // Guardar usuario
    await producto.save();
    res.json({
        ok: true,
        msg: "Producto agregado con exito.",
        producto
    });
}

/**
 * Funcion para borrar un producto
 * @param {*} req 
 * @param {*} res 
 */
const deleteProduct = async (req = request, res = response) => {
    const {
        id
    } = req.params;

    // Borrar registro fisicamente
    await Producto.findByIdAndDelete(id);

    res.json({
        msg:"Producto eliminado"
    });
}

/**
 * Funcion para actualizar un producto
 * @param {*} req 
 * @param {*} res 
 */
const updateProduct = async (req = request, res = response) => {
    const id = req.params.id;

    // Se saca el _id de los datos a actualizar para prevenir que este se actualice
    const {
        _id,
        propietario,
        ...resto
    } = req.body;

    // Se actualiza el producto
    const producto = await Producto.findByIdAndUpdate(id, resto);
    res.json({
        ok: true,
        msg: "Producto actualizado con exito.",
        producto
    });
}



module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProduct
}