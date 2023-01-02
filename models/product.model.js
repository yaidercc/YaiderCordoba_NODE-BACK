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
        unique: true
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
    },

});

// Se modifica el metodo que devuelve los datos de la bd con el fin de que no devuelva datos innecesarios
ProductoSchema.methods.toJSON = function () {
    const {__v,...user} = this.toObject();
    return user;
}

// Se exporta el modelo de la tabla basado en el esquema anterior 
module.exports = model('Producto', ProductoSchema);