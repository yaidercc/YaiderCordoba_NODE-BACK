const {
    Schema,
    model
} = require("mongoose");


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
<<<<<<< HEAD
    }
=======
    },
    role: {
        type: String,
        required: true
    },
>>>>>>> wip_yaider

});

// Se modifica el metodo que devuelve los datos de la bd con el fin de que no devuelva datos innecesarios
UsuarioSchema.methods.toJSON = function () {
    const {__v,password,...user} = this.toObject();
    return user;
}

// Se exporta el modelo de la tabla basado en el esquema anterior 
module.exports = model('Usuario', UsuarioSchema);