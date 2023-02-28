const sequelize = require('../../database/connection');
const Reserva = require('../../models/reserva');

const reservas = [
  { fecha: '2022-03-01', hora_inicio: '09:00:00', hora_fin: '10:00:00', id_cancha: 1, id_usuario: 1 },
  { fecha: '2022-03-02', hora_inicio: '11:00:00', hora_fin: '12:00:00', id_cancha: 2, id_usuario: 2 },
  { fecha: '2022-03-03', hora_inicio: '13:00:00', hora_fin: '14:00:00', id_cancha: 3, id_usuario: 3 }
];

sequelize.sync({ force: false })
  .then(() => {
    return Reserva.bulkCreate(reservas);
  })
  .then(() => {
    console.log('Reservas creadas correctamente');
    process.exit(0);
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

module.exports = Reserva;