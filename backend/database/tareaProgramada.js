const cron = require('node-cron');

//modelo de reservas
const reserva = require('../models/reserva');
const cancha = require('../models/cancha');


const CargarHorarios = async () => {
  console.log("\n**********************************************")
  console.log("Ejecutando tarea programada");

  const horasDisponibles = ["14:00-15:00", '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00'];
  
  // Crea una nueva instancia de la fecha actual
  let fechaActual = new Date();
  
  for (let i = 0; i < 7; i++) {
    // Obtiene la fecha para el día correspondiente
    let fecha = new Date(fechaActual);
    fecha.setDate(fechaActual.getDate() + i);
    
    // Obtiene la fecha en formato ISO 8601
    const fechaHoy = fecha.toISOString().slice(0, 10);
    
    // Busca si ya hay reservas para la fecha actual
    const reservas = await reserva.findAll({
      where: {
        fecha: fechaHoy
      }
    })
    
    // Si no hay reservas, crea las reservas correspondientes para cada cancha y hora disponible
    if (reservas.length === 0) {
      try {
        const canchas = await cancha.findAll();
        canchas.forEach(element => {
          horasDisponibles.forEach(async (hora) => {
            await reserva.create({
              fecha: fechaHoy,
              horario: hora,
              estado: 'disponible',
              id_cancha: element.id_cancha,
            });
          });
        });
      } catch (error) {
        console.log(error);
      }
      console.log(`\nSe crearon las reservas para el día ${fechaHoy}`);
    } else {
      console.log(`\nYa hay reservas para el día ${fechaHoy}`);
    }
  }
  console.log("\n**********************************************")
}

module.exports = {
  CargarHorarios
}