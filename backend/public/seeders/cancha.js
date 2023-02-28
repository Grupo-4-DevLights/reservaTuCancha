const sequelize = require('../../database/connection');
const Cancha = require('../../models/cancha');

const canchas = [
  { nombre: 'Cancha 1', tipo: 'futbol', precio: 100, id_empresa: 1 },
  { nombre: 'Cancha 2', tipo: 'tennis', precio: 80, id_empresa: 2 },
  { nombre: 'Cancha 3', tipo: 'basquetbol', precio: 120, id_empresa: 3 }
];

sequelize.sync({ force: false })
  .then(() => {
    return Cancha.bulkCreate(canchas);
  })
  .then(() => {
    console.log('Canchas creadas correctamente');
    process.exit(0);
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

  module.exports = Cancha;
