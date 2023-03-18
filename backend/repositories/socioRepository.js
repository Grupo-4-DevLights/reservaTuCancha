const reserva = require("../models/reserva");
const cancha = require("../models/cancha");
const empresa = require("../models/empresa");
const usuario = require("../models/usuario");

//operador sequelize
const { Op,fn,col, literal } = require("sequelize");

//reserva una cancha en un horario especifico

const reservaCancha = async (
  id_usuario,
  id_cancha,
  fecha,
  hora_inicio,
  hora_fin
) => {
  if (!id_usuario || !id_cancha || !fecha || !hora_inicio || !hora_fin) {
    throw new Error("Todos los campos son obligatorios");
  }

  //validar que la hora de inicio sea menor a la hora de fin
  if (hora_inicio >= hora_fin) {
    throw new Error("La hora de inicio debe ser menor a la hora de fin");
  }

  //verificar si han hecho una reserva
  const reservaUsuario = await reserva.findOne({
    where: {
      estado: "reservado",
      hora_inicio: {
        [Op.between]: [hora_inicio, hora_fin],
    }},
  })

  if(reservaUsuario){
    throw new Error('ya tiene una reserva en ese horario');
  }



  // Crea una nueva instancia de la fecha actual
  let Fechas = new Date();

  // Obtiene la hora actual en UTC (hora local - desfase horario)
  const horaUTC = Fechas.getUTCHours();

  // Transforma la fecha a UTC-3
  Fechas.setUTCHours(horaUTC - 3);
  const fechaHoy = Fechas.toISOString().slice(0, 10); // Imprime la fecha en formato ISO 8601

  const findReserva = await reserva.update(
    { id_usuario, estado: "reservado" },
    {
      where: {
        id_cancha,
        fecha: fechaHoy,
        estado: "disponible",
        hora_inicio: {
          [Op.between]: [hora_inicio, hora_fin],
        },
      },
    }
  );

  //buscar la empresa del usuario que se le va a asignar la reseva
  const usuarioPropietario = await cancha
    .findByPk(id_cancha, {
      include: {
        model: empresa,
        attributes: ["id_usuario"],
      },
    })
    .then((data) => {
      return data.Empresa.id_usuario;
    });

  //buscar el correo del usuario propietario de la cancha
  const correo = await usuario.findByPk(usuarioPropietario, {}).then((data) => {
    return data.email;
  });

  try {
    return { findReserva, correo };
  } catch (error) {
    console.log(error);
    return error;
  }
};

//visualizar reservas
const verReservas = async (id_usuario) => {
  //comprobar si existe ese usuario


  //obtener solo el id de cancha reservada
  const idCancha = await reserva.findOne({
    where: {
      id_usuario: id_usuario,
      estado: "reservado",
    },
  }).then(
    (data) => {
      return data.id_cancha;
    }
  )

  //obtener el nombre de la cancha reservada
  const nombreCancha = await cancha.findOne({
    where: {
      id_cancha: idCancha,
    },
  }).then(
    (data) => {
      return data.nombre;
    }
  )
  



  try {

    //buscar solo la hora de inicio
    
    const horaInicio =await reserva.findAll({
      where: {
        id_usuario: id_usuario,
      },
      attributes: [
        'fecha','hora_inicio','hora_fin', // las columnas que deseas obtener del registro
        [fn('min',col('hora_inicio')), 'hora_inicio'],
        [fn('max',col('hora_fin')), 'hora_fin'],// la función max() de Sequelize para obtener la hora máxima
      ],
      include: {
        model: cancha,
        attributes: ['nombre'],
      },
      group: ['reserva.id_cancha'],
      raw:true
  
    })
    




    return horaInicio;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//eliminar una reserva
const eliminarReserva = async (id_usuario,id_reserva) => {
  //comprobar existencia en la bases de datos

  const findUser = await usuario.findByPk(id_usuario);

  if (!findUser) {
    throw new Error("El usuario no existe");
  }

  try {
    const reservas = await reserva.update(
      { estado: "disponible", id_usuario:null },
      {
        where: {
          id_reserva,
        },
      }
    );
    return reservas;
  } catch (error) {
    console.log(error);
    return error;
  }
};


module.exports = {
  reservaCancha,
  verReservas,
  eliminarReserva,
};
