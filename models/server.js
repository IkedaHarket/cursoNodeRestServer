const express = require('express');
const cors = require('cors');
class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Middlewares: Funciones que añaden otra funcionalidad a un webServer
        //(una funcion que siempre se ejecutara cuando levantemos el servidor)
        this.middlewares();
        //Rutas de la app
        this.routes();
    }
    middlewares(){
        
        this.app.use(cors());//CORS
        this.app.use(express.json())//Lectura y parseo del body
        this.app.use(express.static('public'));//Directorio publico
    }
    routes(){
        this.app.use(this.usuariosPath,require('../routes/usuarios'));
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto: '+this.port);
        })
    }

}
module.exports = Server;