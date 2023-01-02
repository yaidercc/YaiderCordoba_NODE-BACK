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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },

});

// Se exporta el modelo de la tabla basado en el esquema anterior 
module.exports = model('Producto', UsuarioSchema);