class Sockets {
  constructor(io){
    this.io = io
    this.socketEvents();
  }
  socketEvents(){
    // On connection
    this.io.on('connection', (socket) => { 
      // Escuchar Evento
      socket.on('message-to-server', (data) => { 
        console.log(data);

        // socket sirve para emitir un mensaje al mismo usuario que lo disparo
        //socket.emit('message-from-server', data);
        
        // io sirve para emitir un mensaje a todos los clientes que estén conectados bajo el mismo dominio
        this.io.emit('message-from-server', data);
      });
    });
  }
}

module.exports = Sockets