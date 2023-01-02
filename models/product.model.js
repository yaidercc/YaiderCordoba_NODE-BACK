const {
    Schema,
    model
} = require("mongoose");
<<<<<<< HEAD

=======
var Usuario = model('Usuario');
>>>>>>> wip_yaider

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es obligatoria'],
<<<<<<< HEAD
        unique: true
=======
>>>>>>> wip_yaider
    },
    precio: {
        type: String,
        required: [true, 'El precio es obligatorio']
    },
    calificacion: {
        type: String
    },
    propietario: {
<<<<<<< HEAD
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
=======
        type:Schema.ObjectId,
        ref: "Usuario",
        required: [true, 'El propietario es obligatorio']
>>>>>>> wip_yaider
    },

});

<<<<<<< HEAD
// Se exporta el modelo de la tabla basado en el esquema anterior 
module.exports = model('Producto', UsuarioSchema);
=======
// Se modifica el metodo que devuelve los datos de la bd con el fin de que no devuelva datos innecesarios
ProductoSchema.methods.toJSON = function () {
    const {__v,...producto} = this.toObject();
    return producto;
}

// Se exporta el modelo de la tabla basado en el esquema anterior 
module.exports = model('Producto', ProductoSchema);
>>>>>>> wip_yaider
