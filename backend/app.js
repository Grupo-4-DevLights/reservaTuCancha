const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors())

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


//importar tarea programada
const tareaProgramada = require('./database/tareaProgramada');



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
