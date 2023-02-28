const Sequelize = require('sequelize');

const sequelize = new Sequelize('canchas', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

// Prueba la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });

// Sincroniza la base de datos con los modelos
sequelize.sync()
.then(() => {
  console.log('Base de datos sincronizada.');
})
.catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});

module.exports = sequelize;
