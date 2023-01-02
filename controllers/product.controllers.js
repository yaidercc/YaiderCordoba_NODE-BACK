const {
    response,
    request
} = require('express');

const Producto = require("../models/product.model");

const getProducts = async (req = request, res = response) => {
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

const createProduct = async (req = request, res = response) => {

    const {
        nombre,
        imagen,
        precio,
        calificacion
    } = req.body;

    const producto = new Producto({
        nombre,
        imagen,
        precio,
        calificacion
    });

    // Guardar usuario
    await producto.save();
    res.status(403).json({
        ok: true,
        msg: "Producto agregado con exito.",
        producto
    });
}

const deleteProduct = async (req = request, res = response) => {
    const {
        id
    } = req.params;

    // Borrar registro fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {
        estado: false
    });



    res.status(403).json({
        usuario
    });
}

const updateProduct = async (req = request, res = response) => {
    const id = req.params.id;
    const {
        _id,
        ...resto
    } = req.body;

    const producto = await Producto.findByIdAndUpdate(id, resto);
    res.status(403).json({
        ok: true,
        msg: "Producto actualizado con exito.",
        producto
    });
}



module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
}