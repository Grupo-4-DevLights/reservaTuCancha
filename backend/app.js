const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const app = express();

const sequelize = require('./database/connection');
const Usuario = require('./models/usuario');
const Empresa = require('./models/empresa');
const Cancha = require('./models/cancha');
const Reserva = require('./models/reserva');

// Define las relaciones entre los modelos

// // Define las relaciones entre los modelos
Empresa.hasMany(Cancha, { foreignKey: 'id_empresa' });
Cancha.belongsTo(Empresa, { foreignKey: 'id_empresa' });
Usuario.hasMany(Reserva, { foreignKey: 'id_usuario' });
Reserva.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Cancha.hasMany(Reserva, { foreignKey: 'id_cancha' });
Reserva.belongsTo(Cancha, { foreignKey: 'id_cancha' });
Empresa.belongsTo(Usuario, { foreignKey: 'id_empresa' });
Usuario.hasOne(Empresa, { foreignKey: 'id_usuario' });

// Cancha.belongsTo(Empresa, { 
//   foreignKey: {
//     name: 'id_cancha',
//     allowNull: false,
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
//   }
// });

// Cancha.hasMany(Reserva, { foreignKey: 'id_cancha' });

// Empresa.belongsTo(Usuario, { 
//   foreignKey: {
//   name: 'id_empresa',
//   allowNull: false
// } 
// });

// Empresa.belongsTo(Usuario, { foreignKey: 'id_empresa' });

// Empresa.hasMany(Cancha, { foreignKey: 'id_empresa' });

// Reserva.belongsTo(Usuario, {
//   foreignKey: {
//     name: 'id_reserva',
//     allowNull: false,
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
//   }
// });

// Reserva.belongsTo(Cancha, {
//   foreignKey: {
//     name: 'id_reserva',
//     allowNull: false,
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
//   }
// });

// Usuario.hasOne(Empresa, {
//   foreignKey: {    
//     name: 'id_usuario',
//     allowNull: false,
//     unique: true,
//     onDelete: 'CASCADE' // eliminar empresa asociada si se elimina el usuario
//   }
// });

// Usuario.hasMany(Reserva, { foreignKey: 'id_usuario' });

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// Establecer el motor de vistas
app.set('view engine', 'pug');

app.use(express.static('public'));


//para mostrar mensajes a las peticiones de las paginas
app.use(logger('dev'));

// para que puedan ingresar datos de entradas a traves de json 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//para gestionar las cookies con las autentificaciones
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', require('./routes/index'));



// Carga de datos
// const cargarDatosUsuarios = require('./public/seeders/usuario');
// new cargarDatosUsuarios(); // Ejecutar la función de carga de datos

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
