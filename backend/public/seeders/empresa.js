// const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');
const Empresa = require('../../models/empresa');

const empresas = [
  { nombre: 'Empresa 1', direccion: 'Calle 123', telefono: '555-1234', id_usuario: 1},
  { nombre: 'Empresa 2', direccion: 'Avenida 456', telefono: '555-5678', id_usuario: 2},
  { nombre: 'Empresa 3', direccion: 'Plaza 789', telefono: '555-9012', id_usuario: 3}
];

sequelize.sync({ force: false })
  .then(() => {
    return Empresa.bulkCreate(empresas);
  })
  .then(() => {
    console.log('Empresas creadas correctamente');
    process.exit(0);
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

module.exports = Empresa;