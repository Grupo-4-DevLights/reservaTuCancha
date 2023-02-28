const sequelize = require('../../database/connection');
const Usuario = require('../../models/usuario');

const usuarios = [
  { nombre: 'Juan', email: 'juanperez@gmail.com', password: '123456' , rol: 'administrador'},
  { nombre: 'María', email: 'mariagarcia@gmail.com', password: 'qwerty', rol: 'administrador' },
  { nombre: 'Pedro', email: 'pedroramirez@gmail.com', password: 'abcdef', rol: 'administrador'  }
];

sequelize.sync({ force: false }) // Esta línea eliminará y volverá a crear todas las tablas de la base de datos
  .then(() => {
    return Usuario.bulkCreate(usuarios);
  })
  .then(() => {
    console.log('Usuarios creados correctamente');
    process.exit(0); // Esta línea finaliza la ejecución del script
  })
  .catch(error => {
    console.log(error);
    process.exit(1); // Esta línea finaliza la ejecución del script con un error
  });

module.exports = Usuario;