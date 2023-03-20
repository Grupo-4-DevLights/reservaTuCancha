const cron = require('node-cron');

//modelo de reservas
const reserva = require('../models/reserva');
const cancha = require('../models/cancha');



//buscar todas las canchas que tenemos
const CargarHorarios = async () => {
  console.log("\n**********************************************")
  console.log("Ejecutando tarea programada");
  const horasDisponibles = ["14:00-15:00", '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00'];
  // Crea una nueva instancia de la fecha actual
  let Fechas = new Date();
  // Obtiene la hora actual en UTC (hora local - desfase horario)
  const horaUTC = Fechas.getUTCHours();
  // Transforma la fecha a UTC-3
  Fechas.setUTCHours(horaUTC - 3);
  const fechaHoy = (Fechas.toISOString().slice(0, 10)) // Imprime la fecha en formato ISO 8601

  //buscar por la fecha de hoy
  const reservas = await reserva.findAll({
    where: {
      fecha: fechaHoy
    }
  })
  
  const canchas = await cancha.findAll()
      .then(data => { return data })
      .catch(error => { return error })

  
  if (reservas.length === 0) {
    try {
      canchas.forEach(element => {
        horasDisponibles.forEach(
          async (hora) => {
            await reserva.create({
              fecha: fechaHoy,
              horario: hora,
              estado: 'disponible',
              id_cancha: element.id_cancha,
            });
          }
        )
      });
    } catch (error) {
      console.log(error);
    }
    console.log("\n**********************************************")

  } else {
    console.log("\nYa hay reservas para la fecha de hoy")
    console.log("\n**********************************************")

  }
}

module.exports={
  CargarHorarios
}