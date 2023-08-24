import express from 'express'
import cors from 'cors'
import { dbConnection } from '../database/config.js';

import { router } from '../routes/usuarios_routes.js';
import { routerAuth } from '../routes/auth_routes.js';

export class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //rutas de la app
        this.authPath     = '/api/auth';
        this.usuariosPath = '/api/usuarios';
        

        //Conectar a BBDD
        this.connectarDB();

        //middlewares
        this.middlewares();

        // lanzamos las rutas
        this.routes();
    }

    async connectarDB() {
        await dbConnection();
    }

    middlewares() {
        
        // cors: Protección inicial rutas
        this.app.use(cors());
        
        // lectura y parse del body, en formato Json
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'));

       
    }

    // rutas del server
    routes() {
        this.app.use(this.authPath, routerAuth);
        this.app.use(this.usuariosPath, router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server corriendo en el port: ${this.port}`)
        })
   } 
}