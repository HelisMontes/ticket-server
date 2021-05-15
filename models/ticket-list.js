const Ticket = require('./ticket');

class TicketList {
  
  constructor (){
    this.ultimoNumero = 1;
    this.ticketsPendientes = [];
    this.ticketsAsignados = [];
  }

  get nextNumber(){
    return this.ultimoNumero++; 
  }
  // 3 que se veran es las tarjetas y 10 en el historial
  get ultimos13(){
    return this.ticketsAsignados.slice(0,13);
  }
  
  createTicket(){
    const newTicket = new Ticket(this.nextNumber);
    this.ticketsPendientes.push(newTicket);
    return newTicket;
  }

  asignarTicket(agente, escritorio){
    //Cuando no hayan tickets pendientes retornamos null para que no reviente el código
    if(this.ticketsPendientes.length === 0) return null
    
    /**
     * @shift
     * Elimina el primer elemento de un array y lo devuelve.
     * Si el array está vacío, se devuelve undefined y el array no se modifica.
     */
    const nextTicket = this.ticketsPendientes.shift();
      nextTicket.agente = agente;
      nextTicket.escritorio = escritorio;
   
    /**
     * @unshift
     * Inserta nuevos elementos al comienzo de 
     * un array y devuelve la nueva longitud del array.
     */
    this.ticketsAsignados.unshift(nextTicket);

    return nextTicket;
  }
}

module.exports = TicketList;