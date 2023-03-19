
const Sequelize = require('sequelize');

//importar las variables de entorno
const {DB_NAME,DB_USER,DB_PASSWORD,DB_HOST,DB_DIALECT,DB_PORT}= require('../config/env')


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT
});

// Prueba la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });


module.exports = sequelize;
