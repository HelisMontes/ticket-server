const TicketList = require('./ticket-list');

class Sockets {
  constructor(io){
    this.io = io
    this.socketEvents();
    this.ticketList = new TicketList();
  }
  socketEvents(){
    // On connection
    this.io.on('connection', (socket) => { 
      // Escuchar Eventos
      socket.on('solicitar-ticket', ( _, callback ) => { 
        const newTicket = this.ticketList.createTicket();
        callback(newTicket);
      });
      socket.on('next-ticket', ({agente, escritorio }, callback)  => {
        const nextTicket = this.ticketList.asignarTicket(agente, escritorio);
        callback(nextTicket);
      });
    });
  }
}

module.exports = Sockets