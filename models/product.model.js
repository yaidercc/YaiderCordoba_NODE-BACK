const {
    Schema,
    model
} = require("mongoose");

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es obligatoria'],
    },
    precio: {
        type: String,
        required: [true, 'El precio es obligatorio']
    },
    calificacion: {
        type: String
    },
    propietario: {
        type:Schema.ObjectId,
        ref: "Usuario",
        required: [true, 'El propietario es obligatorio']
    },

});

// Se modifica el metodo que devuelve los datos de la bd con el fin de que no devuelva datos innecesarios
ProductoSchema.methods.toJSON = function () {
    const {__v,...producto} = this.toObject();
    return producto;
}

// Se exporta el modelo de la tabla basado en el esquema anterior 
module.exports = model('Producto', ProductoSchema);
