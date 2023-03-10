//librerias de nuestro proyecto
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

//cargar las variable de entorno
const {SERVER_PORT}= require('./config/env')

const app = express();

//habilitar cors para usar en el front
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

// Rutas
app.use('/', require('./routes/index'));


//importar tarea programada
const tareaProgramada = require('./database/tareaProgramada');




app.listen(SERVER_PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`)
})
