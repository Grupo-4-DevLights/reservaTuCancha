const reserva = require("../models/reserva");
const cancha = require("../models/cancha");
const empresa = require("../models/empresa");
const usuario = require("../models/usuario");

//operador sequelize
const { Op } = require("sequelize");

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
  //comprobar existencia en la bases de datos

  const findUser = await usuario.findByPk(id_usuario);

  if (!findUser) {
    throw new Error("El usuario no existe");
  }

  try {
    const reservas = await reserva.findAll({
      where: {
        id_usuario,
      },
    });
    return reservas;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  reservaCancha,
  verReservas,
};
