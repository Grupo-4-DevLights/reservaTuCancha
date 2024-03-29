const reserva = require("../models/reserva");
const cancha = require("../models/cancha");
const empresa = require("../models/empresa");
const usuario = require("../models/usuario");
const mensaje = require('./mensajeRepository')

//operador sequelize
const Mensaje = require("../models/mensaje");


//PARA LAS FECHAS 
 // Crea una nueva instancia de la fecha actual
 let Fechas = new Date();

 // Obtiene la hora actual en UTC (hora local - desfase horario)
 const horaUTC = Fechas.getUTCHours();

 // Transforma la fecha a UTC-3
 Fechas.setUTCHours(horaUTC - 3);
 const fechaHoy = Fechas.toISOString().slice(0, 10); // Imprime la fecha en formato ISO 8601
 
 const fechaConFormato = Fechas.toISOString().slice(0, 19)

//reserva una cancha en un horario especifico





const reservaCancha = async (id_usuario,id_cancha,fecha,horario) => {
  if (!id_usuario || !id_cancha || !fecha || !horario) {
    throw new Error("Todos los campos son obligatorios");
  }

  console.log(fecha)
  //verificar si han hecho una reserva
  const reservaUsuario = await reserva.findOne({
    where: {
      estado: "reservado",
      id_usuario,
      fecha,
      horario,
    }
  })

  if(reservaUsuario){
    throw new Error('ya tiene una reserva en ese horario');
  }

 

  const findReserva = await reserva.update(
    { id_usuario, estado: "reservado" },
    {
      where: {
        id_cancha,
        fecha: fecha,
        estado: "disponible",
        horario,
      },
    }
  );

  //buscar la empresa del usuario que se le va a asignar la reserva
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

  //buscar el nombre de la cancha con el id
  const nombreCancha = await cancha.findByPk(id_cancha, {
      attributes: ["nombre"],
    }).then((data) => {
        return data.nombre;
    });
  



  

  try {
    //crear un mensaje PARA UN SOCIO la reserva agregada
    const mensajeSocio = `se ha hecho una reserva en la  cancha con nombre "${nombreCancha}" a las ${horario} para la fecha: ${fecha}`;
    const newMensajeSocio= await Mensaje.create(
      {
        id_usuario: id_usuario,
        fecha:fechaConFormato,
        tipo:'positivo',
        nombre:mensajeSocio,
      }
    )
    
    //Crear un mensaje para un PROPIETARIO de la reserva
    const mensajePropietario = `se ha hecho una reserva en la cancha con nombre "${nombreCancha}" a las ${horario} para la fecha: ${fecha}`;
    const newMensajePropietario= await Mensaje.create(
      {
        id_usuario: usuarioPropietario,
        fecha:fechaConFormato,
        tipo:'positivo',
        nombre:mensajePropietario,
      }
    )



    return { findReserva, correo };
  } catch (error) {
    console.log(error);
    return error;
  }
};

//visualizar reservas
const verReservas = async (id_usuario) => {

  
  try {
    const reservadas =await reserva.findAll({
      where: {
        id_usuario: id_usuario,
      },
      include: {
        model: cancha,
        attributes: ['nombre'],
      group: ['reserva.id_cancha'], //agregamos la cláusula "group"
      },
      raw:true
    })
    
    return reservadas;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//eliminar una reserva
const eliminarReserva = async (id_usuario,id_cancha,id_reserva) => {
  //comprobar existencia en la bases de datos
  console.log(id_usuario,id_cancha,id_reserva)
  const findUser = await usuario.findByPk(id_usuario);

  if (!findUser) {
    throw new Error("El usuario no existe");
  }

  try {
    //guardar el registro de reserva
    const laReserva= await reserva.findOne({
      where: {
        id_usuario,
        id_cancha,
        id_reserva,
      },
    })

    const reservas = await reserva.update(
      { estado: "disponible", id_usuario:null },
      {
        where: {
          id_usuario,
          id_cancha,
          id_reserva,
        },
      }
    );

    //buscar el nombre de la cancha con el id
    const nombreCancha = await cancha.findByPk(id_cancha, {
      attributes: ["nombre"],
    }).then((data) => {
      return data.nombre;
    });



    //Crear un mensaje para un PROPIETARIO de la reserva
    const mensajeSocio = `se ha eliminado una reserva en su cancha con nombre "${nombreCancha}" a las ${laReserva.horario} para la fecha: ${laReserva.fecha}`;
    const newMensaje= await Mensaje.create(
      {
        id_usuario: id_usuario,
        fecha:fechaConFormato,
        tipo:'negativo',
        nombre:mensajeSocio,
      }
    )

    //buscar el propietario de la cancha con su id_cancha
    const id_propietario = await cancha.findByPk(id_cancha, {
      include: {
        model: empresa,
        attributes: ["id_usuario"],
      },
    }).then((data) => {
      return data.Empresa.id_usuario;
    });


    //Crear un mensaje para un PROPIETARIO de la reserva
    const mensajePropietario = `se ha eliminado una reserva en su cancha con nombre "${nombreCancha}" a las ${laReserva.horario} para la fecha: ${laReserva.fecha}`;
    const newMensajePropietario= await Mensaje.create(
      {
        id_usuario: id_propietario,
        fecha:fechaConFormato,
        tipo:'negativo',
        nombre:mensajePropietario,
      }
    )


    return reservas;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//visualizar reserva por fecha
const verReservasFecha = async (id_cancha,fecha) => {


  try {
    const reservadas =await reserva.findAll({
      where: {
        id_cancha: id_cancha,
        fecha: fecha,
        estado: "disponible",
      },
      order: [["horario", "ASC"]],
    })
  
    return reservadas;
  } catch (error) {
    console.log(error);
    return error;
  }
};



module.exports = {
  reservaCancha,
  verReservas,
  eliminarReserva,
  verReservasFecha
};
