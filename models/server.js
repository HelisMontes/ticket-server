// Configuracion de Express
const express = require('express');
// Servidor de Sockets
const http  = require('http');
// Configuracion del socket server
const socketio  = require('socket.io');
const path  = require('path');
const cors = require('cors')

const Sockets = require('./sockets');

class Server {
  constructor (){
    this.app = express();
    this.port = process.env.PORT;
    
    // Http server
    this.server = http.createServer(this.app);

    // Configuracion de socket
    this.io = socketio(this.server,{/* Configuraciones */});
    
    // Inicializar Sockets
    this.sockets = new Sockets(this.io); 
  }
  middlewares(){
    //Desplegar el directorio publico
    this.app.use( express.static (path.resolve(__dirname, '../public') ) );

    //Habilitar CORS
    this.app.use( cors() );

    // Crear la instancia de nuestro ticketlist
    this.app.get('/ultimos', (request, response) => { 
      response.json({
        ok: true,
        ultimos: this.sockets.ticketList.ultimos13
      })
    });
  }
  execute(){
    //Inicializar Middleware
    this.middlewares();

    this.server.listen(this.port,() => {
      console.log(`Servidor corriendo en http://localhost:${this.port}/`);
    }); 
  }
}

module.exports = Server