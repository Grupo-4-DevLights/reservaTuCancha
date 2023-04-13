const usuario= require('../models/usuario');
const reserva= require('../models/reserva');
const cancha= require('../models/cancha');
const empresa= require('../models/empresa');
const Mensaje= require('../models/mensaje');


//PARA LAS FECHAS 
 // Crea una nueva instancia de la fecha actual
 let Fechas = new Date();

 // Obtiene la hora actual en UTC (hora local - desfase horario)
 const horaUTC = Fechas.getUTCHours();

 // Transforma la fecha a UTC-3
 Fechas.setUTCHours(horaUTC - 3);
 
 const fechaConFormato = Fechas.toISOString().slice(0, 19)

//reserva una cancha en un horario especifico




// visualizar solo las reservas en estado pendiente que hicieron en su cancha
const listarReservasPendientes = async (id_propietario) => {

    //encontrar la empresa con el id_propietario
    const idEmpresa = await empresa.findOne({
        where: {
            id_usuario: id_propietario
        }
    }).then(
        data => {
            console.log(data.id_empresa)
            return data.id_empresa;
        }
    )


    const reservas = await cancha.findAll({
        where: {
            id_empresa: idEmpresa,
        },
        include:[{
            model: reserva,
            where: {
                estado: 'reservado'
            }
        }]
    });

    return reservas;
}

//cambiar la reserva a confirmado
const confirmarReserva = async (id_reserva) => {
    
    //buscar el id_usuario de la reserva
    const id_usuario = await reserva.findByPk(id_reserva, {
        attributes: ["id_usuario"],
        }).then((data) => {
        return data.id_usuario;
    });

    //buscar el id_cancha de la reserva
    const id_cancha = await reserva.findByPk(id_reserva, {
        attributes: ["id_cancha"],
        }).then((data) => {
        return data.id_cancha;
    });

    //buscar el nombre de la cancha
    const nombreCancha = await cancha.findByPk(id_cancha, {
        attributes: ["nombre"],
        }).then((data) => {
        return data.nombre;
    });
    

    const mensajeSocio = `se ha confirmado la reserva en la cancha con nombre "${nombreCancha}" `;
    const newMensajeSocio= await Mensaje.create(
      {
        id_usuario: id_usuario,
        fecha:fechaConFormato,
        tipo:'informativo',
        nombre:mensajeSocio,
      }
    )

    try {
        const reservaConfirmada = await reserva.update(
            {
            estado: 'confirmado',
            },{
                where: {
                    id_reserva: id_reserva
            }   }

        );
        return reservaConfirmada;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//cambiar la reserva a cancelado
const cancelarReserva = async (id_reserva) => {

 
    try {
        const reservaCancelada = await reserva.update({
            estado: 'disponible'
        },{
            where: {
                id_reserva: id_reserva
        }   }
        );
        return reservaCancelada;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//visualizar las reservas confirmadas
const listarReservasConfirmadas = async (id) => {
    const buscarCancha = await cancha.findByPk(id);


    const reservas = await reserva.findAll({
        where: {
            id_cancha: id,
            estado: 'confirmado'
        }
    });
    return reservas;
}

//visualizar empresa del usuario
const listarEmpresaPropietario = async (id_usuario) => {
    const mostrarEmpresa = await empresa.findOne({
        where: {
            id_usuario: id_usuario
        }
    });
    return mostrarEmpresa;
}


//visualizar reservas pendientes

//visualizar reservas pendientes por fecha
const verReservasPendienteFecha = async (id_cancha,fecha) => {

    try {
      const reservadas =await reserva.findAll({
        where: {
          id_cancha: id_cancha,
          fecha: fecha,
          estado: "reservado",
        },
        order: [["horario", "ASC"]],
      })
    
      return reservadas;
    } catch (error) {
      console.log(error);
      return error;
    }
  };


module.exports={
    listarReservasPendientes,
    confirmarReserva,
    cancelarReserva,
    listarReservasConfirmadas,
    listarEmpresaPropietario,
    verReservasPendienteFecha
}

