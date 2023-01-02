const express = require("express");
const cors = require('cors');
const {
    dbConnection
} = require("../database/config.db");
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Rutas de los usuarios
        this.usuariosPath = '/api/usuarios';
        // Rutas de los productos
        this.productosPath = '/api/productos';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middleWares();

        // Rutas de mi aplicacion
        this.routes();
    }
    async conectarDB() {
        await dbConnection();
    }

    middleWares() {
        //CORS
        this.app.use(cors());

        // Lectura y parseo del body a json
        this.app.use(express.json());
    }

    routes() {
        // Cuando se haga una peticion a la url /api/usuarios va a llamar a las rutas del usuario
        this.app.use(this.usuariosPath, require("../routes/user.routes.js"))
<<<<<<< HEAD
        // this.app.use(this.productosPath,require("../routes/user.routes.js"))
=======
        this.app.use(this.productosPath,require("../routes/products.routes.js"))
>>>>>>> wip_yaider
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;