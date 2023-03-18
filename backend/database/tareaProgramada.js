const cron = require('node-cron');

//modelo de reservas
const reserva = require('../models/reserva');
const cancha = require('../models/cancha');

// Ejecutar la tarea programada diariamente a las 00:00
cron.schedule("43 20 * * *", async () => {
  console.log("Ejecutando tarea programada");


  const horasDisponibles = ['14:00:00', '14:30:00', '15:00:00', '15:30:00','16:00:00', '16:30:00', '17:00:00', '17:30:00','18:00:00', '18:30:00', '19:00:00', '19:30:00','20:00:00'];

   // Crea una nueva instancia de la fecha actual
   let Fechas = new Date();

   // Obtiene la hora actual en UTC (hora local - desfase horario)
   const horaUTC = Fechas.getUTCHours();
   
   // Transforma la fecha a UTC-3
   Fechas.setUTCHours(horaUTC - 3);
   const fechaHoy = (Fechas.toISOString().slice(0, 10)) // Imprime la fecha en formato ISO 8601
 

  //buscar todas las canchas que tenemos

  const canchas = await cancha.findAll()
  .then(data => { return data })
  .catch(error => { return error })

  //que me devuelva solo el id de las canchas 
  try {
    canchas.forEach(element => {
    horasDisponibles.forEach( 
      async (hora) => {
        await reserva.create({
          fecha: fechaHoy,
          hora_inicio: hora,
          hora_fin: hora,
          estado: 'disponible',
          id_cancha: element.id_cancha,
        });
      }
    )});
  } catch (error) {
    console.log(error);
  }
});