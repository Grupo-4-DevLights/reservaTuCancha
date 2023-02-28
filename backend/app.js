var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var usuarioRoutes = require('./routes/usuarioRoutes');
var canchaRoutes = require('./routes/canchaRoutes');
var empresaRoutes = require('./routes/empresaRoutes');
var reservaRoutes = require('./routes/reservaRoutes');

var app = express();

var sequelize = require('./database/connection');
var Usuario = require('./models/usuario');
var Empresa = require('./models/empresa');
var Cancha = require('./models/cancha');
var Reserva = require('./models/reserva');

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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/', function(req, res) {
  res.render('index', { mensaje: 'Este es un mensaje desde mi controlador' });
});
app.use('/usuarios', usuarioRoutes);
app.use('/canchas', canchaRoutes);
app.use('/empresas', empresaRoutes);
app.use('/reservas', reservaRoutes);


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
